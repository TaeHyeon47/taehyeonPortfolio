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
const mainBtns = document.querySelectorAll('.main-btn');

mainBtns.forEach((btn) => {
  let ripple;

  btn.addEventListener('mouseenter', (e) => {
    //  We have the positions, I mean, bottom left to right and top.
    // Also, we have here the weight and height of the element.
    // Besides that, you can see here X and Y properties.
    // console.log(e.target.getBoundingClientRect());

    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientX - e.target.getBoundingClientRect().top;

    ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener('mouseleave', () => {
    btn.removeChild(ripple);
  });
});

// End of Main Button

// About Me Text
const aboutMeText = document.querySelector('.about-me-text');
const aboutMeTextContent =
  '일은 다소 단순한 DB 검색 및 유지보수 등의 경영지원 사무업무 뿐이라 5년 후의 제 모습이 기대되지 않았습니다. 개인의 성장을 원하여 이직을 생각하였지만 요즘 이슈인 직고용 대상기업 중 하나였기에 회사내부 사정 REACT 하나하나 신경써서 배우고 있습니다. 더 상세한 이력서는 메일로 요청해주세요';

// Array.from은 String을 배열로 만들어준다. console.log로 확인 가능.
Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement('span');
  span.textContent = char;
  aboutMeText.appendChild(span);

  span.addEventListener('mouseenter', (e) => {
    e.target.style.animation = 'aboutMeTextAnim 10s infinite';
  });
});

// End of About Me Text
