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
        flexGrow: 3,
        flexDirection: 'column',
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
        columnGap: 15,
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
  return <div>{children}</div>;
}

Draft.Top = Top;
Draft.Main = Main;
Draft.Bans = Bans;
Draft.Picks = Picks;
Draft.Pool = Pool;

export { Draft };
