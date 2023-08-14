import { pick } from './pick.ts';
type DrawOptions = {
  color?: string;
  lineWidth?: number;
};
export function draw(
  event: React.PointerEvent<HTMLCanvasElement>,
  context: CanvasRenderingContext2D,
  { color = '#000', lineWidth = 2 }: DrawOptions,
) {
  let isDrawing = false;
  let cleaned = false;

  const drawStart = pick(event, ['clientY', 'clientX']);
  const containerOffset = event.currentTarget.getBoundingClientRect();

  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.lineJoin = 'round';

  context.beginPath();
  context.moveTo(drawStart.clientX - containerOffset.x, drawStart.clientY - containerOffset.y);

  document.documentElement.addEventListener('pointermove', onPointerMove);
  document.documentElement.addEventListener('pointerup', onPointerUp);
  document.documentElement.addEventListener('visibilitychange', clean);

  function onPointerMove(event: PointerEvent) {
    if (!isDrawing) {
      isDrawing = true;
    }

    if (isDrawing) {
      context.lineTo(event.clientX - containerOffset.x, event.clientY - containerOffset.y);
      context.stroke();
    }
  }

  function onPointerUp() {
    clean();
  }
  function clean() {
    if (cleaned) {
      return;
    }
    cleaned = true;
    if (isDrawing) {
      isDrawing = false;

      document.documentElement.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerup', onPointerUp);
      document.documentElement.removeEventListener('visibilitychange', clean);
    }
  }
}
