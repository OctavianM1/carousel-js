const container = document.getElementById('container');

let isPointerDown = false;
let initMouseX = null;
let initContainerLeft = -400;

container.addEventListener('mousedown', (e) => {
  initMouseX = e.clientX;
  isPointerDown = true;
})

window.addEventListener('mouseup', () => {
  initMouseX = null;
  isPointerDown = false;
  initContainerLeft = getPxValue(container.style.left);
})

window.addEventListener('mousemove', (e) => {
  if (isPointerDown) {
    console.log(container.style.left, e.clientX, initMouseX, initContainerLeft);
    container.style.left = `${e.clientX - initMouseX + initContainerLeft}px`;
    if (getPxValue(container.style.left) <= -1600) {
      container.style.left = '-400px';
      initContainerLeft = initMouseX - e.clientX - 400;
    } 
    // else if (getPxValue(container.style.left) >= 0) {
    //   container.style.left = '0px';
    //   initContainerLeft = initMouseX - e.clientX;
    // }
  }
})

function getPxValue(val) {
  return parseInt(val.split('px')[0]);
}