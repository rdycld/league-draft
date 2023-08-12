import { useCallback, useState } from 'react';

import { Slot, SlotType } from '../components/Slot';

export type ID = Brand<number, 'id'>;

type DraftChamp = {
  name: string;
  id: ID;
  assigned: boolean;
};

type Ban = Brand<number, 'id'> | undefined;
type Pick = Brand<number, 'id'> | undefined;

type Picks = [Pick, Pick, Pick, Pick, Pick];
type Bans = [Ban, Ban, Ban, Ban, Ban];

export function Draft() {
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

  const handleReleaseChampFromSlot = (type: SlotType, id: ID) => {
    switch (type) {
      case 'redBan':
        setRedBans((p) => p.map((slot) => (slot === id ? undefined : slot)) as Bans);
        break;
      case 'blueBan':
        setBlueBans((p) => p.map((slot) => (slot === id ? undefined : slot)) as Bans);
        break;
      case 'redPick':
        setRedPicks((p) => p.map((slot) => (slot === id ? undefined : slot)) as Picks);
        break;
      case 'bluePick':
        setBluePicks((p) => p.map((slot) => (slot === id ? undefined : slot)) as Picks);
        break;
      case 'pool':
        break;
      default:
        throw new Error('shouldnt get there');
    }
    setPool((p) => p.map((champ) => (champ.id === id ? { ...champ, selected: false } : champ)));
  };

  const cleanSelectedChamp = useCallback(() => {
    setSelectedChamp(undefined);
  }, []);

  const handleAssignChampToSlot = useCallback(
    (type: SlotType, index: number, id?: ID) => {
      //tbf feels hacky xD
      if (!id) {
        //todo add assert helper
        throw new Error('yikes');
      }

      switch (type) {
        case 'redBan':
          setRedBans((p) => p.map((slot, idx) => (idx === index ? id : slot)) as Bans);
          break;
        case 'blueBan':
          setBlueBans((p) => p.map((slot, idx) => (idx === index ? id : slot)) as Bans);
          break;
        case 'redPick':
          setRedPicks((p) => p.map((slot, idx) => (idx === index ? id : slot)) as Picks);
          break;
        case 'bluePick':
          setBluePicks((p) => p.map((slot, idx) => (idx === index ? id : slot)) as Picks);
          break;
        case 'pool':
          break;
        default:
          throw new Error('shouldnt get there');
      }

      setPool((p) => p.map((champ) => (champ.id === id ? { ...champ, assigned: true } : champ)));
      cleanSelectedChamp();
    },
    [cleanSelectedChamp],
  );

  const handleSelectChampion = useCallback((id: ID) => {
    setSelectedChamp((p) => (p === id ? undefined : id));
  }, []);

  return (
    <div style={{ display: 'flex', columnGap: 20, backgroundColor: 'red' }}>
      <div
        style={{
          display: 'flex',
          flexGrow: 2,
          backgroundColor: 'blue',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              columnGap: 15,
            }}
          >
            {blueBans.map((slot, index) => (
              <Slot
                key={index}
                id={slot}
                index={index}
                onAssign={(type, index) => handleAssignChampToSlot(type, index, selectedChamp)}
                onRelease={handleReleaseChampFromSlot}
                type="blueBan"
              />
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              columnGap: 15,
            }}
          >
            {redBans.map((slot, index) => (
              <Slot
                key={index}
                id={slot}
                index={index}
                onAssign={(type, index) => handleAssignChampToSlot(type, index, selectedChamp)}
                onRelease={handleReleaseChampFromSlot}
                type="redBan"
              />
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            columnGap: 15,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '15px',
            }}
          >
            blue picks
          </div>
          <div>
            {pool.map((champ) => (
              <Slot
                key={champ.id}
                type="pool"
                onClick={handleSelectChampion}
                selected={selectedChamp === champ.id}
                {...champ}
              />
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              rowGap: '15px',
              flexDirection: 'column',
            }}
          >
            red picks
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        summoners rift
      </div>
    </div>
  );
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
