function drawCoordinateGrid(
  container: HTMLElement,
  ctx: CanvasRenderingContext2D,
  dragDelta: { x: number; y: number }
) {
  const SIZE = 50;
  if (!ctx || !container) return;
  ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;

  const centerX = container.clientWidth / 2;
  const centerY = container.clientHeight / 2;

  const startX = (centerX + dragDelta.x) % SIZE;
  const startY = (centerY + dragDelta.y) % SIZE;

  for (let i = startX; i < container.clientWidth; i += SIZE) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, container.clientHeight);
    // draw text coordinates
    ctx.font = "10px Arial";
    ctx.fillStyle = "white";
    ctx.fillText((i - centerX - dragDelta.x).toString(), i, 10);
  }
  for (let i = startY; i < container.clientHeight; i += SIZE) {
    ctx.moveTo(0, i);
    ctx.lineTo(container.clientWidth, i);
    // draw text coordinates
    ctx.font = "10px Arial";
    ctx.fillStyle = "white";
    ctx.fillText((i - centerY - dragDelta.y).toString(), 0, i);
  }
  ctx.stroke();
  ctx.closePath();
}

export { drawCoordinateGrid };
