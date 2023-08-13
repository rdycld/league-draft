import { useCallback, useState } from 'react';

import { Slot, SlotType } from '../components/Slot';
import { SummonersRift } from '../components/SummonnersRift';
import { Draft } from '../components/Draft';

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
  const [pool, setPool] = useState<DraftChamp[]>(dummyPool);
  const [selectedChamp, setSelectedChamp] = useState<ID>();

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
    <div style={{ display: 'flex', columnGap: 20 }}>
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
              />
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
              />
            ))}
          </Draft.Bans>
        </Draft.Top>
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
              />
            ))}
          </Draft.Picks>
          <Draft.Pool>
            {pool.map((champ) => (
              <Slot
                key={champ.id}
                type="pool"
                onClick={handleSelectChampion}
                selected={selectedChamp === champ.id}
                {...champ}
              />
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
              />
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

const dummyPool = [
  {
    name: 'aatrox',
    id: 1,
    assigned: false,
  },
  {
    name: 'ahri',
    id: 2,
    assigned: false,
  },
  {
    name: 'lucian',
    id: 3,
    assigned: false,
  },
  {
    name: 'braum',
    id: 4,
    assigned: false,
  },
  {
    name: 'kogmaw',
    id: 5,
    assigned: false,
  },
  {
    name: 'anivia',
    id: 13,
    assigned: false,
  },
  {
    name: 'blitzcrank',
    id: 10,
    assigned: false,
  },
  {
    name: 'evelynn',
    id: 123,
    assigned: false,
  },
  {
    name: 'kogmaw',
    id: 199,
    assigned: false,
  },
  {
    name: 'zeri',
    id: 210,
    assigned: false,
  },
] as DraftChamp[];
