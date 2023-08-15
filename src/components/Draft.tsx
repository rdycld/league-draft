import { ReactNode } from 'react';

type CommonProps = {
  children: ReactNode;
};

type Props = CommonProps;

function Draft({ children }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        width: 1200,
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 30,
      }}
    >
      {children}
    </div>
  );
}

function Top({ children }: CommonProps) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </div>
  );
}

function Main({ children }: CommonProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        columnGap: 35,
      }}
    >
      {children}
    </div>
  );
}

function Bans({ children }: CommonProps) {
  return (
    <div
      style={{
        display: 'flex',
        columnGap: 15,
      }}
    >
      {children}
    </div>
  );
}

function Picks({ children }: CommonProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '15px',
      }}
    >
      {children}
    </div>
  );
}

function Pool({ children }: CommonProps) {
  return (
    <div
      style={{
        display: 'grid',
        minWidth: 560,
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gridAutoRows: 'min-content',
        gap: 10,
        maxHeight: 800,
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
}

Draft.Top = Top;
Draft.Main = Main;
Draft.Bans = Bans;
Draft.Picks = Picks;
Draft.Pool = Pool;

export { Draft };
