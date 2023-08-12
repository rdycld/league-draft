import { useState } from 'react';

type DraftChamp = {
  name: string;
  id: number;
  selected: boolean;
};

export function Draft() {
  const [draftPool, setDraftPool] = useState<DraftChamp[]>(champs);
  const [blueTeam, setBlueTeam] = useState<DraftChamp[]>([]);
  const [redTeam, setRedTeam] = useState<DraftChamp[]>([]);
  const [turn, setTurn] = useState(true);

  const pickChamp = (champion: DraftChamp, team: boolean) => {
    if (team) {
      setBlueTeam((p) => [...p, { ...champion, selected: true }]);
    } else {
      setRedTeam((p) => [...p, { ...champion, selected: true }]);
    }
    setTurn((p) => !p);
    setDraftPool((p) =>
      p.map((champ) => (champion.id === champ.id ? { ...champ, selected: true } : champ)),
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex' }}>
        blue:
        {blueTeam.map((champ) => (
          <div key={champ.id} onClick={() => pickChamp(champ, turn)}>
            {champ.name}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        red:
        {redTeam.map((champ) => (
          <div key={champ.id} onClick={() => pickChamp(champ, turn)}>
            {champ.name}
          </div>
        ))}
      </div>
      <div>
        pool:
        {draftPool.map((champ) => (
          <div key={champ.id} onClick={() => pickChamp(champ, turn)}>
            {champ.name} - {String(champ.selected)}
          </div>
        ))}
      </div>
    </div>
  );
}

const champs: DraftChamp[] = [
  {
    name: 'aatrox',
    id: 1,
    selected: false,
  },
  {
    name: 'ahri',
    id: 2,
    selected: false,
  },
  {
    name: 'lucian',
    id: 3,
    selected: false,
  },
  {
    name: 'braum',
    id: 4,
    selected: false,
  },
  {
    name: 'kogmaw',
    id: 5,
    selected: false,
  },
  {
    name: 'anivia',
    id: 13,
    selected: false,
  },
  {
    name: 'blitzcrank',
    id: 10,
    selected: false,
  },
  {
    name: 'evelynn',
    id: 123,
    selected: false,
  },
  {
    name: 'kogmaw',
    id: 199,
    selected: false,
  },
  {
    name: 'zeri',
    id: 210,
    selected: false,
  },
];
