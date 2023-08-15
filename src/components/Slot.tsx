import { ID } from '../routes/Draft';
import React, { Children, memo } from 'react';

export type SlotType = 'redBan' | 'blueBan' | 'redPick' | 'bluePick' | 'pool';

type Props =
  | {
      id?: ID;
      onRelease: (type: SlotType, id: ID) => void;
      onAssign: (type: SlotType, index: number) => void;
      type: Exclude<SlotType, 'pool'>;
      index: number;
      children?: string;
    }
  | {
      id: ID;
      assigned: boolean;
      onClick: (id: ID) => void;
      type: Extract<SlotType, 'pool'>;
      selected: boolean;
      name: string;
      children?: string;
    };

export const Slot = memo(function Slot(props: Props) {
  const { type, id, children } = props;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (type === 'pool') {
      if (props.assigned) {
        return;
      }

      props.onClick(id);
      return;
    }

    const { onAssign, onRelease, index } = props;

    if (id && event.button === 2) {
      onRelease(type, id);
    }
    if (!id) {
      onAssign(type, index);
    }
  };

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleClick}
      style={{
        width: 80,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          height: 80,
          width: 80,
          border: '2px solid black',
          backgroundColor: '#222',
          borderColor:
            (type === 'pool' && (props.assigned ? 'red' : props.selected ? 'green' : 'black')) ||
            'black',
          filter:
            (type === 'pool' && props.assigned) || type === 'redBan' || type === 'blueBan'
              ? 'grayscale(1)'
              : 'none',
          backgroundImage: props.id && 'url(https://picsum.photos/80)',
        }}
      >
        {id}
      </div>
      <div
        style={{
          height: 20,
          justifySelf: 'center',
          textAlign: 'center',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </div>
    </div>
  );
});
