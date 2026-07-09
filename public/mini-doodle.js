const miniCanvas = document.getElementById("miniDoodleCanvas");
const miniCtx = miniCanvas.getContext("2d");
const miniColorPicker = document.getElementById("miniColorPicker");
const miniClearBtn = document.getElementById("miniClearBtn");

function resizeMiniCanvas() {
  const rect = miniCanvas.getBoundingClientRect();
  miniCanvas.width = rect.width;
  miniCanvas.height = 220;
}

window.addEventListener("resize", resizeMiniCanvas);
resizeMiniCanvas();

let isDrawingMini = false;

function getMiniPos(e) {
  const rect = miniCanvas.getBoundingClientRect();
  if (e.touches) {
    return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
  }
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function startMiniDrawing(e) {
  isDrawingMini = true;
  const pos = getMiniPos(e);
  miniCtx.beginPath();
  miniCtx.moveTo(pos.x, pos.y);
}

function miniDraw(e) {
  if (!isDrawingMini) return;
  e.preventDefault();
  const pos = getMiniPos(e);
  miniCtx.lineTo(pos.x, pos.y);
  miniCtx.strokeStyle = miniColorPicker.value;
  miniCtx.lineWidth = 3;
  miniCtx.lineCap = "round";
  miniCtx.stroke();
}

function stopMiniDrawing() {
  isDrawingMini = false;
}

miniCanvas.addEventListener("mousedown", startMiniDrawing);
miniCanvas.addEventListener("mousemove", miniDraw);
miniCanvas.addEventListener("mouseup", stopMiniDrawing);
miniCanvas.addEventListener("mouseleave", stopMiniDrawing);
miniCanvas.addEventListener("touchstart", startMiniDrawing);
miniCanvas.addEventListener("touchmove", miniDraw);
miniCanvas.addEventListener("touchend", stopMiniDrawing);

miniClearBtn.addEventListener("click", () => {
  miniCtx.clearRect(0, 0, miniCanvas.width, miniCanvas.height);
});

const doodleSidebar = document.getElementById("doodleSidebar");
const closeDoodleBtn = document.getElementById("closeDoodleBtn");
const reopenDoodleBtn = document.getElementById("reopenDoodleBtn");

closeDoodleBtn.addEventListener("click", () => {
  doodleSidebar.classList.add("hidden");
  reopenDoodleBtn.classList.remove("hidden");
});

reopenDoodleBtn.addEventListener("click", () => {
  doodleSidebar.classList.remove("hidden");
  reopenDoodleBtn.classList.add("hidden");
  resizeMiniCanvas();
});