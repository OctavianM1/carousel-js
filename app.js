const container = document.getElementById("container");
const imgCount = container.children.length - 2;
const IMG_WIDTH = 400;
container.style.left = `${-IMG_WIDTH}px`;
console.log(imgCount);
let isPointerDown = false;
let initMouseX = null;
let initContainerLeft = -IMG_WIDTH;

container.addEventListener("mousedown", (e) => {
  initMouseX = e.clientX;
  isPointerDown = true;
});

window.addEventListener("mouseup", () => {
  initMouseX = null;
  isPointerDown = false;
  initContainerLeft = getPxValue(container.style.left);
});

window.addEventListener("mousemove", (e) => {
  if (isPointerDown) {
    container.style.left = `${e.clientX - initMouseX + initContainerLeft}px`;
    if (getPxValue(container.style.left) <= -1 * IMG_WIDTH * (imgCount + 1)) {
      container.style.left = `-${IMG_WIDTH}px`;
      initContainerLeft = initMouseX - e.clientX - IMG_WIDTH;
    } else if (getPxValue(container.style.left) >= 0) {
      container.style.left = `-${imgCount * IMG_WIDTH}px`;
      initContainerLeft = -1 * imgCount * IMG_WIDTH + initMouseX - e.clientX;
    }
  }
});

function getPxValue(val) {
  return parseInt(val.split("px")[0]);
}
