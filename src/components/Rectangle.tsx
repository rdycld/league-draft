import {  memo } from "react";
import { Shape } from "../App";
import { ResizeDot, placements } from "./ResizeDot";

export type Props = Shape & {
  index: number;
  onDrag: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
};

export const Rectangle = memo(function Rectangle({
  x,
  y,
  z,
  width,
  height,
  index,
  onDrag,
}: Props) {
  return (
    <div
      onMouseDown={(e) => onDrag(e, index)}
      style={{
        userSelect: 'none',
        width,
        height,
        top: y,
        left: x,
        zIndex: z,
        position: 'absolute',
        border: '1px solid black',
      }}
    >
      <p>top: {y}</p>
      <p>left: {x}</p>
      {Object.keys(placements).map(key => <ResizeDot key={key} placement={key} />)}
    </div>
  );
});
