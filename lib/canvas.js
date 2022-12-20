// This needs reorganizing as API
// Dumping ground for useful canvas helpers

function handleTouchStart(ev) {
  ev.preventDefault();
  // ev.touchList.item(0);
  // ev.touchList.item(1);
  // TODO: add loop here to support multiple touches
  const [pageX, pageY] = [ev.touches[0].pageX, ev.touches[0].pageY];
  drawCircle(pageX, pageY);
}

function drawCircle(touchPageX, touchPageY) {
  const [canvasX, canvasY] = getCanvasCoordinates(touchPageX, touchPageY);
  ctx.beginPath();
  ctx.arc(canvasX, canvasY, 2, 0, 2 * Math.PI);
  ctx.fill();
}

function getCanvasCoordinates(touchPageX, touchPageY) {
  const canvasRect = canvas.getBoundingClientRect();
  const canvasX = touchPageX - canvasRect.left - window.scrollX;
  const canvasY = touchPageY - canvasRect.top - window.scrollY;
  return [canvasX, canvasY];
}
