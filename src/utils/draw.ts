import { pick } from './pick.ts';
export function draw(
  event: React.PointerEvent<HTMLCanvasElement>,
  context: CanvasRenderingContext2D,
  drawOptions: {},
) {
  let isDrawing = false;
  let cleaned = false;

  const drawStart = pick(event, ['clientY', 'clientX']);
  const containerOffset = event.currentTarget.getBoundingClientRect();

  //todo - move to drawOptions
  context.strokeStyle = 'red';
  context.lineWidth = 1;
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
