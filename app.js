const container = document.getElementById("container");
const imgCount = container.children.length - 2;
const IMG_WIDTH = 400;
setPxValue(-IMG_WIDTH);

let prevImgLeftPx, curImgLeftPx, nextImgLeftPx;
setFirstImgLeftPx();

let isPointerDown = false;
let initMouseX = null;
let initContainerLeft = -IMG_WIDTH;
let isActiveTransition = false;

container.addEventListener("mousedown", onMoveStart);
container.addEventListener("touchstart", onMoveStart);

window.addEventListener("mouseup", onMoveEnd);
window.addEventListener("touchend", onMoveEnd);

window.addEventListener("mousemove", onMove);
window.addEventListener("touchmove", onMove);

function onMoveStart(e) {
  if (!isActiveTransition) {
    initMouseX = getClientX(e);
    isPointerDown = true;
  }
}

function onMoveEnd() {
  initMouseX = null;
  initContainerLeft = getPxValue();

  if (isPointerDown) {
    isPointerDown = false;
    if (getPxValue() !== curImgLeftPx) {
      container.style.transition = "200ms";
      container.addEventListener("transitionend", removeTransition);
      isActiveTransition = true;
    }
    if (shouldMoveNext()) {
      moveTo(nextImgLeftPx);
      calculateNextImgPx();
    } else if (shouldMovePrev()) {
      moveTo(prevImgLeftPx)
      calculatePrevImgPx();
    } else {
      moveTo(curImgLeftPx);
    }
  }

  function removeTransition() {
    container.removeEventListener("transitionend", removeTransition);
    container.style.transition = "none";
    isActiveTransition = false;
    if (getPxValue() === -IMG_WIDTH * (imgCount + 1)) {
      setPxValue(-IMG_WIDTH);
      initContainerLeft = -IMG_WIDTH;
    } else if (getPxValue() === 0) {
      setPxValue(-IMG_WIDTH * imgCount);
      initContainerLeft = -IMG_WIDTH * imgCount;
    }
  }

  function calculatePrevImgPx() {
    if (curImgLeftPx === -IMG_WIDTH) {
      setLastImgLeftPx();
    } else {
      nextImgLeftPx = curImgLeftPx;
      curImgLeftPx = prevImgLeftPx;
      prevImgLeftPx += IMG_WIDTH;
    }
  }

  function calculateNextImgPx() {
    if (nextImgLeftPx === -IMG_WIDTH * (imgCount + 1)) {
      setFirstImgLeftPx();
    } else {
      prevImgLeftPx = curImgLeftPx;
      curImgLeftPx = nextImgLeftPx;
      nextImgLeftPx -= IMG_WIDTH;
    }
  }
}

function onMove(e) {
  if (isPointerDown) {
    setPxValue(getDx(e) + initContainerLeft);
    if (getPxValue() <= -1 * IMG_WIDTH * (imgCount + 1)) {
      initContainerLeft = -IMG_WIDTH - getDx(e);
    } else if (getPxValue() >= 0) {
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

function getPxValue() {
  return parseInt(container.style.transform.split("(")[1].split("px")[0]);
}

function setPxValue(val) {
  container.style.transform = `translateX(${val}px)`;
}

function setFirstImgLeftPx() {
  prevImgLeftPx = 0;
  curImgLeftPx = -IMG_WIDTH;
  nextImgLeftPx = -IMG_WIDTH * 2;
}

function setLastImgLeftPx() {
  prevImgLeftPx = -IMG_WIDTH * (imgCount - 1);
  curImgLeftPx = -IMG_WIDTH * imgCount;
  nextImgLeftPx = -IMG_WIDTH * (imgCount + 1);
}

function shouldMoveNext() {
  return getPxValue() < curImgLeftPx - IMG_WIDTH * 0.1;
}

function shouldMovePrev() {
  return getPxValue() > curImgLeftPx + IMG_WIDTH * 0.1;
}

function moveTo(val) {
  setPxValue(val);
  initContainerLeft = val;
}
