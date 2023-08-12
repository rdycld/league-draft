import { type Direction } from '../components/ResizeDot';
import { snapToEdge } from './drag';

export function getResizeDimensions(
  element: DOMRect,
  container: DOMRect,
  travel: { x: number; y: number },
  direction: Direction,
) {
  const { snapTop, snapRight, snapBottom, snapLeft } = snapToEdge(element, container, travel);

  const y = snapTop ? 0 : element.y + travel.y - container.y;
  const x = snapLeft ? 0 : element.x + travel.x - container.x;
  const nResizeHeight = snapTop ? element.bottom - container.y : element.height - travel.y;
  const sResizeHeight = snapBottom ? container.bottom - element.y : element.height + travel.y;
  const wResizeWidth = snapRight ? container.right - element.x : element.width + travel.x;
  const eResizeWidth = snapLeft ? element.right - container.x : element.width - travel.x;

  switch (direction) {
    case 'n':
      return { y, height: nResizeHeight };
    case 'w':
      return { width: wResizeWidth };
    case 's':
      return { height: sResizeHeight };
    case 'e':
      return { height: sResizeHeight, width: eResizeWidth };
    case 'ne':
      return { y, x, height: nResizeHeight, width: eResizeWidth };
    case 'nw':
      return { y, height: nResizeHeight, width: wResizeWidth };
    case 'sw':
      return { height: sResizeHeight, width: wResizeWidth };
    case 'se':
      return { x, width: eResizeWidth, height: sResizeHeight };
    default:
      throw new Error('shouldnt get there');
  }
}
