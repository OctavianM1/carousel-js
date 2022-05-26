const container = document.getElementById("container");
const imgCount = container.children.length - 2;
const IMG_WIDTH = 400;
container.style.left = `${-IMG_WIDTH}px`;

let isPointerDown = false;
let initMouseX = null;
let initContainerLeft = -IMG_WIDTH;

container.addEventListener("mousedown", onMoveStart);
container.addEventListener("touchstart", onMoveStart);

window.addEventListener("mouseup", onMoveEnd);
window.addEventListener("touchend", onMoveEnd);

window.addEventListener("mousemove", onMove);
window.addEventListener("touchmove", onMove);

function onMoveStart(e) {
  initMouseX = getClientX(e);
  isPointerDown = true;
}

function onMoveEnd() {
  initMouseX = null;
  isPointerDown = false;
  initContainerLeft = getPxValue(container.style.left);
}

function onMove(e) {
  if (isPointerDown) {
    container.style.left = `${getDx(e) + initContainerLeft}px`;
    if (getPxValue(container.style.left) <= -1 * IMG_WIDTH * (imgCount + 1)) {
      container.style.left = `-${IMG_WIDTH}px`;
      initContainerLeft = -IMG_WIDTH - getDx(e);
    } else if (getPxValue(container.style.left) >= 0) {
      container.style.left = `-${imgCount * IMG_WIDTH}px`;
      initContainerLeft = -1 * imgCount * IMG_WIDTH - getDx(e);
    }
  }
}

function getDx(e) {
  return getClientX(e) - initMouseX;
}

function getClientX(e) {
  if (e.clientX) {
    return e.clientX;
  }
  return e.touches[0].clientX;
}

function getPxValue(val) {
  return parseInt(val.split("px")[0]);
}
