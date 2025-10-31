const canvas = document.getElementById("paint-canvas");
const ctx = canvas.getContext("2d", { alpha: false });
const colorButtons = document.querySelectorAll(".control--color");
const grownUpButton = document.getElementById("grown-up");
const grownUpMenu = document.getElementById("grown-up-menu");
const clearButton = document.getElementById("clear-button");
const fadeToggle = document.getElementById("fade-toggle");
const soundToggle = document.getElementById("sound-toggle");
const sound = document.getElementById("paint-sound");

let drawing = false;
let currentColor = "#ff5c5c";
let fadeEnabled = false;
let lastPoint = null;
let touchCount = 0;

const POINTER_ID = "primary";

const resizeCanvas = () => {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const playSound = () => {
  if (!soundToggle.checked) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
};

const startDrawing = (point) => {
  drawing = true;
  lastPoint = { ...point };
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = Math.max(canvas.width, canvas.height) * 0.02;
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  playSound();
};

const continueDrawing = (point) => {
  if (!drawing) return;
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
  lastPoint = { ...point };
};

const stopDrawing = () => {
  drawing = false;
  lastPoint = null;
};

const getPoint = (event) => {
  const { left, top } = canvas.getBoundingClientRect();
  if (event.touches && event.touches.length > 0) {
    const touch = event.touches[0];
    return { x: touch.clientX - left, y: touch.clientY - top };
  }
  return { x: event.clientX - left, y: event.clientY - top };
};

const clearCanvas = () => {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const fadeOut = () => {
  if (!fadeEnabled || drawing) return;
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const toggleFade = () => {
  fadeEnabled = fadeToggle.checked;
};

const handlePointerDown = (event) => {
  event.preventDefault();
  startDrawing(getPoint(event));
};

const handlePointerMove = (event) => {
  if (!drawing) return;
  event.preventDefault();
  continueDrawing(getPoint(event));
};

const handlePointerUp = (event) => {
  event.preventDefault();
  stopDrawing();
};

const handleTouchStart = (event) => {
  touchCount = event.touches.length;
  if (touchCount > 1) {
    stopDrawing();
    return;
  }
  handlePointerDown(event);
};

const handleTouchMove = (event) => {
  if (touchCount > 1) return;
  handlePointerMove(event);
};

const handleTouchEnd = (event) => {
  touchCount = event.touches.length;
  if (touchCount === 0) stopDrawing();
};

const bindEvents = () => {
  window.addEventListener("resize", resizeCanvas);

  canvas.addEventListener("mousedown", handlePointerDown);
  canvas.addEventListener("mousemove", handlePointerMove);
  canvas.addEventListener("mouseup", handlePointerUp);
  canvas.addEventListener("mouseleave", stopDrawing);

  canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
  canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
  canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
  canvas.addEventListener("touchcancel", handleTouchEnd, { passive: false });

  colorButtons.forEach((button) => {
    const color = button.dataset.color;
    button.style.color = color;
    button.addEventListener("click", () => {
      currentColor = color;
      playSound();
    });
  });

  clearButton.addEventListener("click", () => {
    clearCanvas();
  });

  fadeToggle.addEventListener("change", toggleFade);

  grownUpButton.addEventListener("pointerdown", () => {
    grownUpButton.dataset.downTime = Date.now().toString();
  });

  grownUpButton.addEventListener("pointerup", () => {
    const downTime = Number(grownUpButton.dataset.downTime);
    if (Number.isNaN(downTime)) return;
    const held = Date.now() - downTime;
    if (held >= 1800) {
      const hidden = grownUpMenu.hasAttribute("hidden");
      if (hidden) {
        grownUpMenu.removeAttribute("hidden");
      } else {
        grownUpMenu.setAttribute("hidden", "");
      }
    }
    grownUpButton.dataset.downTime = "";
  });

  soundToggle.addEventListener("change", () => {
    if (!soundToggle.checked) {
      sound.pause();
    }
  });
};

const init = () => {
  resizeCanvas();
  bindEvents();
  setInterval(fadeOut, 80);
};

document.addEventListener("DOMContentLoaded", init);
