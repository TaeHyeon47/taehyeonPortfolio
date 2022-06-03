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

// Projects
const container = document.querySelector('.container');
const projects = document.querySelectorAll('.project');
const projectHideBtn = document.querySelector('.project-hide-btn');

projects.forEach((project, i) => {
  project.addEventListener('mouseenter', () => {
    // 이미지 픽셀 높이
    //  console.log(project.firstElementChild.offsetHeight);
    // 이미지 박스 높이
    //  console.log(project.offsetHeight);
    //  firstElementChild으로 이미지에 접근한다.
    // The value of the top position is going to be negative.
    // 이미지 높이 - project 박스 높이 = 움직여야할 거리
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });

  project.addEventListener('mouseleave', () => {
    project.firstElementChild.style.top = '2rem';
  });

  // Big Project Image
  project.addEventListener('click', () => {
    const bigImgWrapper = document.createElement('div');
    bigImgWrapper.className = 'project-img-wrapper';
    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement('img');
    bigImg.className = 'project-img';
    // split는 기준점을 기준으로 Array를 반환한다.
    const imgPath = project.firstElementChild.getAttribute('src').split('.')[0];

    console.log(imgPath);
    bigImg.setAttribute('src', `${imgPath}-big.jpg`);
    bigImgWrapper.appendChild(bigImg);
    //  2중 스크롤바를 없애 줌.
    document.body.style.overflowY = 'hidden';

    projectHideBtn.classList.add('change');

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove('change');
      bigImgWrapper.remove();
      document.body.style.overflowY = 'scroll';
    };
  });
  // End of Big Project Image

  //   if (i >= 6) {
  //     project.style.cssText = 'display: none; opacity: 0';
  //   }
  i >= 6 && (project.style.cssText = 'display: none; opacity: 0;');
});

// Projects Button
const section3 = document.querySelector('.section-3');
const projectsBtn = document.querySelector('.projects-btn');
const projectsBtnText = document.querySelector('.projects-btn span');
let showHideBool = true;

const showProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = 'flex';
    // 스크롤 이동
    section3.scrollIntoView({ block: 'end' });
  }, 600);

  setTimeout(() => {
    project.style.opacity = '1';
    //  인뎃스 값으로 순서대로 랜딩되도록 함.
  }, i * 200);
};

const hideProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = 'none';
    section3.scrollIntoView({ block: 'end' });
  }, 1200);

  setTimeout(() => {
    project.style.opacity = '0';
  }, i * 100);
};

projectsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  projectsBtn.firstElementChild.nextElementSibling.classList.toggle('change');
  showHideBool
    ? (projectsBtnText.textContent = 'Show Less')
    : (projectsBtnText.textContent = 'Show More');
  projects.forEach((project, i) => {
    // If Else문을 아래와 같이 &&와 3항 연산자로 표현할 수 있다.
    i >= 6 &&
      (showHideBool ? showProjects(project, i) : hideProjects(project, i));
  });
  showHideBool = !showHideBool;
});
// End of Projects Button

// End of Projects

// Section 4
document.querySelectorAll('.service-btn').forEach((service) => {
  service.addEventListener('click', (e) => {
    // preventDefault()가 href="#"으로 상위로 이동하는 것도 예방
    e.preventDefault();

    const serviceText = service.nextElementSibling;
    serviceText.classList.toggle('change');
    // getComputedStyle method returns an object with the values of All Css as properties that the element has
    // Inside the parentheses
    const rightPosition = serviceText.classList.contains('change')
      ? `calc(100% - ${getComputedStyle(service.firstElementChild).width}`
      : 0;

    service.firstElementChild.style.right = rightPosition;
  });
});

// End of Section 4
