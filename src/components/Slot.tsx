import { ID } from '../routes/Draft';
import { memo } from 'react';

export type SlotType = 'redBan' | 'blueBan' | 'redPick' | 'bluePick' | 'pool';

type Props =
  | {
      id?: ID;
      onRelease: (type: SlotType, id: ID) => void;
      onAssign: (type: SlotType, index: number) => void;
      type: Exclude<SlotType, 'pool'>;
      index: number;
    }
  | {
      id: ID;
      assigned: boolean;
      onClick: (id: ID) => void;
      type: Extract<SlotType, 'pool'>;
      selected: boolean;
    };

export const Slot = memo(function Slot(props: Props) {
  const { type, id } = props;

  const handleClick = () => {
    if (type === 'pool') {
      props.onClick(id);
      return;
    }
    const { onAssign, onRelease, index } = props;

    //checks for illegal actions {}
    if (props.id) {
      //todo fix Prop types
      onRelease(type, id!);
    } else {
      onAssign(type, index);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 60,
        height: 60,
        border: '2px solid black',
        borderColor:
          (type === 'pool' && (props.assigned ? 'red' : props.selected ? 'green' : 'black')) ||
          'black',
      }}
    >
      {id}
    </div>
  );
});
