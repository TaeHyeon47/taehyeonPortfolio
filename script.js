// 마우스 포인터
const mouseCircle = document.querySelector('.mouse-circle');
const mouseDot = document.querySelector('.mouse-dot');

const mouseCircleFn = (x, y) => {
  mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
  mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
};
// 마우스 포인터 종료

// 서클 애니매이션
const circles = document.querySelectorAll('.circle');
const mainImg = document.querySelector('.main-circle img');

// those variables will store the last position of the mouse.
let mX = 0;
let mY = 0;
const z = 50;

const animateCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => {
      circle.style.left = `${z}px`;
    });
    mainImg.style.left = `${z}px`;
  } else if (x > mX) {
    circles.forEach((circle) => {
      circle.style.left = `-${z}px`;
    });
    mainImg.style.left = `-${z}px`;
  }

  if (y < mY) {
    circles.forEach((circle) => {
      circle.style.top = `${z}px`;
    });
    mainImg.style.top = `${z}px`;
  } else if (y > mY) {
    circles.forEach((circle) => {
      circle.style.top = `-${z}px`;
    });
    mainImg.style.top = `-${z}px`;
  }

  mX = e.clientX;
  mY = e.clientY;
};
// 서클 애니매이션 종료

document.body.addEventListener('mousemove', (e) => {
  let x = e.clientX;
  let y = e.clientY;
  mouseCircleFn(x, y);
  animateCircles(e, x, y);
});

document.body.addEventListener('mouseleave', () => {
  mouseCircle.style.opacity = '0';
  mouseDot.style.opacity = '0';
});

// Main Button
const mainBtn = document.querySelector('.main-btn');

let ripple;

mainBtn.addEventListener('mouseenter', (e) => {
  //  We have the positions, I mean, bottom left to right and top.
  // Also, we have here the weight and height of the element.
  // Besides that, you can see here X and Y properties.
  // console.log(e.target.getBoundingClientRect());

  const left = e.clientX - e.target.getBoundingClientRect().left;
  const top = e.clientX - e.target.getBoundingClientRect().top + 270;

  ripple = document.createElement('div');
  ripple.classList.add('ripple');
  ripple.style.left = `${left}px`;
  ripple.style.top = `${top}px`;
  mainBtn.prepend(ripple);
});

mainBtn.addEventListener('mouseleave', () => {
  mainBtn.removeChild(ripple);
});

// End of Main Button
