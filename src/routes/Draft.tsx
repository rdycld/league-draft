import { useCallback, useMemo, useState } from 'react';

import { Slot, SlotType } from '../components/Slot';
import { SummonersRift } from '../components/SummonnersRift';
import { Draft } from '../components/Draft';
import { CHAMPIONS } from '../generated';

export type ID = Brand<number, 'id'>;

type DraftChamp = {
  name: string;
  id: ID;
  assigned: boolean;
};

type Ban = Brand<number, 'id'> | undefined;
type Pick = Brand<number, 'id'> | undefined;

export type Picks = [Pick, Pick, Pick, Pick, Pick];
type Bans = [Ban, Ban, Ban, Ban, Ban];

export function DraftPage() {
  const [pool, setPool] = useState<DraftChamp[]>(championsPool);
  const [selectedChamp, setSelectedChamp] = useState<ID>();
  const [search, setSearch] = useState('');

  const searchPool = useMemo(
    () =>
      pool.map((champion) => ({
        visible: isChampionVisible(champion, search),
        champion,
      })),

    [search, pool],
  );

  const [bluePicks, setBluePicks] = useState<Picks>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  const [blueBans, setBlueBans] = useState<Bans>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  const [redPicks, setRedPicks] = useState<Picks>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  const [redBans, setRedBans] = useState<Bans>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  const handleReleaseChampFromSlot = useCallback((type: SlotType, id: ID) => {
    switch (type) {
      case 'redBan':
        setRedBans((p) => releaseSlot(p, id));
        break;
      case 'blueBan':
        setBlueBans((p) => releaseSlot(p, id));
        break;
      case 'redPick':
        setRedPicks((p) => releaseSlot(p, id));
        break;
      case 'bluePick':
        setBluePicks((p) => releaseSlot(p, id));
        break;
      case 'pool':
        break;
      default:
        throw new Error('shouldnt get there');
    }

    setPool((p) => p.map((champ) => (champ.id === id ? { ...champ, assigned: false } : champ)));
  }, []);

  const handleAssignChampToSlot = useCallback(
    (type: SlotType, index: number) => {
      if (!selectedChamp) {
        return;
      }

      switch (type) {
        case 'redBan':
          setRedBans((p) => assignToSlot(p, index, selectedChamp));
          break;
        case 'blueBan':
          setBlueBans((p) => assignToSlot(p, index, selectedChamp));
          break;
        case 'redPick':
          setRedPicks((p) => assignToSlot(p, index, selectedChamp));
          break;
        case 'bluePick':
          setBluePicks((p) => assignToSlot(p, index, selectedChamp));
          break;
        case 'pool':
          break;
        default:
          throw new Error('shouldnt get there');
      }

      setPool((p) =>
        p.map((champ) => (champ.id === selectedChamp ? { ...champ, assigned: true } : champ)),
      );

      setSelectedChamp(undefined);
    },
    [selectedChamp],
  );

  const handleSelectChampion = useCallback((id: ID) => {
    setSelectedChamp((p) => (p === id ? undefined : id));
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        columnGap: 20,
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <Draft>
        <Draft.Top>
          <Draft.Bans>
            {blueBans.map((slot, index) => (
              <Slot
                key={index}
                id={slot}
                index={index}
                onAssign={handleAssignChampToSlot}
                onRelease={handleReleaseChampFromSlot}
                type="blueBan"
              >
                {`B${index + 1}`}
              </Slot>
            ))}
          </Draft.Bans>
          <Draft.Bans>
            {redBans.map((slot, index) => (
              <Slot
                key={index}
                id={slot}
                index={index}
                onAssign={handleAssignChampToSlot}
                onRelease={handleReleaseChampFromSlot}
                type="redBan"
              >
                {`B${index + 1}`}
              </Slot>
            ))}
          </Draft.Bans>
        </Draft.Top>
        <div
          style={{
            width: 600,
            height: 30,
          }}
        >
          <input
            style={{
              width: '100%',
              height: '100%',
              fontSize: 18,
            }}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Draft.Main>
          <Draft.Picks>
            {bluePicks.map((slot, index) => (
              <Slot
                key={index}
                id={slot}
                index={index}
                onAssign={handleAssignChampToSlot}
                onRelease={handleReleaseChampFromSlot}
                type="bluePick"
              >
                {`B${index + 1}`}
              </Slot>
            ))}
          </Draft.Picks>
          <Draft.Pool>
            {searchPool.map(({ champion, visible }) => (
              <div
                style={{
                  display: visible ? 'block' : 'none',
                }}
                key={champion.id}
              >
                <Slot
                  type="pool"
                  onClick={handleSelectChampion}
                  selected={selectedChamp === champion.id}
                  {...champion}
                >
                  {champion.name}
                </Slot>
              </div>
            ))}
          </Draft.Pool>
          <Draft.Picks>
            {redPicks.map((slot, index) => (
              <Slot
                key={index}
                id={slot}
                index={index}
                onAssign={handleAssignChampToSlot}
                onRelease={handleReleaseChampFromSlot}
                type="redPick"
              >
                {`R${index + 1}`}
              </Slot>
            ))}
          </Draft.Picks>
        </Draft.Main>
      </Draft>
      <SummonersRift redPicks={redPicks} bluePicks={bluePicks} />
    </div>
  );
}

function releaseSlot<T extends Picks | Bans>(slots: T, id: ID) {
  return slots.map((slot) => (slot === id ? undefined : slot)) as T;
}

function assignToSlot<T extends Picks | Bans>(slots: T, index: number, id: ID) {
  return slots.map((slot, idx) => (idx === index ? id : slot)) as T;
}

function isChampionVisible(champion: DraftChamp, query: string) {
  return champion.name.toLowerCase().includes(query.trim().toLowerCase());
}

const championsPool = CHAMPIONS.map(({ id, name }) => ({ id: id as ID, name, assigned: false }));
