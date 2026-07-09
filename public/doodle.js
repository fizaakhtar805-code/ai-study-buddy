const canvas = document.getElementById("doodleCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearBtn = document.getElementById("clearBtn");

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const savedDrawing = canvas.width > 0 ? canvas.toDataURL() : null;

  canvas.width = rect.width;
  canvas.height = 400;

  if (savedDrawing) {
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = savedDrawing;
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let isDrawing = false;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function startDrawing(e) {
  isDrawing = true;
  const pos = getPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

let currentTool = "pencil";

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const pos = getPos(e);
  ctx.lineTo(pos.x, pos.y);

  if (currentTool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = brushSize.value * 3;
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSize.value;
  }

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);

// clearBtn.addEventListener("click", () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// });

const pencilBtn = document.getElementById("pencilBtn");
const eraserBtn = document.getElementById("eraserBtn");

pencilBtn.addEventListener("click", () => {
  currentTool = "pencil";
  pencilBtn.classList.add("active");
  eraserBtn.classList.remove("active");
});

eraserBtn.addEventListener("click", () => {
  currentTool = "eraser";
  eraserBtn.classList.add("active");
  pencilBtn.classList.remove("active");
});