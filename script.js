// 마우스 포인터
const mouseCircle = document.querySelector('.mouse-circle');
const mouseDot = document.querySelector('.mouse-dot');

let mouseCircleBool = true;

const mouseCircleFn = (x, y) => {
  mouseCircleBool &&
    (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`);

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

let hoveredElPosition = [];

const stickyElement = (x, y, hoveredEl) => {
  // Sticky Element
  if (hoveredEl.classList.contains('sticky')) {
    //  if (hoveredElPosition.length < 1) {
    //    hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft];
    //  }
    //? 상기의 if문을 아래와 같이 && 연산자로 변경할 수 있음.
    hoveredElPosition.length < 1 &&
      (hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft]);

    //? cssText는 한번에 여러개의 css 요소를 변경해준다. '-'을 케멀케이스로 변경해주지 않아도 된다.
    //? 해당 코드로 메뉴 아이콘에 마우스를 올렸을 시, 메뉴 아이콘이 마우스를 따라다닌다.
    hoveredEl.style.cssText = `top: ${y}px; left: ${x}px`;

    if (
      hoveredEl.offsetTop <= hoveredElPosition[0] - 100 ||
      hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
      hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
      hoveredEl.offsetLeft >= hoveredElPosition[1] + 100
    ) {
      hoveredEl.style.cssText = '';
      hoveredElPosition = [];
    }

    // 마우스를 위로 또는 아래로 움직여 브라우저 즐겨찾기와 주소 영역으로 이동했을때 발생하는 버그 방지
    hoveredEl.onmouseleave = () => {
      hoveredEl.style.cssText = '';
      hoveredElPosition = [];
    };
  }
  // End of Sticky Element
};

// Mouse Circle Transform
const mouseCircleTransform = (hoveredEl) => {
  if (hoveredEl.classList.contains('pointer-enter')) {
    hoveredEl.onmousemove = () => {
      mouseCircleBool = false;
      mouseCircle.style.cssText = `
      width: ${hoveredEl.getBoundingClientRect().width}px; 
      height: ${hoveredEl.getBoundingClientRect().height}px;
      top: ${hoveredEl.getBoundingClientRect().top}px;
      left: ${hoveredEl.getBoundingClientRect().left}px;
      opacity: 1; 
      transform: translate(0, 0);
      animation: none;
      border-radius: ${getComputedStyle(hoveredEl).borderBottomLeftRadius};
      transition: width 0.5s, height 0.5s, top 0.5s, left 0.5s, transform 0.5s, border-radius 0.5s; 
      `;
      // .mouse-circle에 transform: translate(-50%, -50%);가 있어 위치가 이상해짐. 0, 0으로 초기화
      //? borderRadius는 모질라와 Firefox에서 작동되지 않음. 따라서 borderBottomLeftRadius으로 변경해서 사용
      // console.log(getComputedStyle(hoveredEl).borderRadius);
      // console.log(getComputedStyle(hoveredEl).borderBottomLeftRadius);
    };

    hoveredEl.onmouseleave = () => {
      mouseCircleBool = true;
    };

    // mouseCircle이 박스에 적용되어 있을 때, 스크롤 업을 했을때 어긋남을 방지함.
    document.onscroll = () => {
      if (!mouseCircleBool) {
        mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`;
      }
    };
  }
};

// End of Mouse Circle Transform

document.body.addEventListener('mousemove', (e) => {
  let x = e.clientX;
  let y = e.clientY;
  mouseCircleFn(x, y);
  animateCircles(e, x, y);

  //? document.elementFromPoint는 마우스 포인터에 있는 DOM 요소를 실시간으로 가져온다.
  const hoveredEl = document.elementFromPoint(x, y);
  stickyElement(x, y, hoveredEl);

  mouseCircleTransform(hoveredEl);
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

// Progress Bar
const sections = document.querySelectorAll('section');
const progressBar = document.querySelector('.progress-bar');
const halfCircles = document.querySelectorAll('.half-circle');
const halfCirclesTop = document.querySelector('.half-circle-top');
const progressBarCircle = document.querySelector('.progress-bar-circle');

let scrolledPortion = 0;
let scrollBool = false;
let imageWrapper = false;

const progressBarFn = (bigImgWrapper) => {
  imageWrapper = bigImgWrapper;
  let pageHeight = 0;
  // window.innerHeight : 현재 웹브라우저의 화면의 세로 크기 (화면을 확대, 축소하면 크기가 달라지는 것을 확인할 수 있음)
  const pageViewportHeight = window.innerHeight;

  if (!imageWrapper) {
    // document.documentElement : html 전체 요소
    // Element.scrollHeight : Element의 높이를 반환
    // document.documentElement.scrollHeight : html 전체 요소의 높이를 반환
    pageHeight = document.documentElement.scrollHeight;
    // window.pageYOffset : 세로 axix에 따른 document의 픽셀의 숫자를 반환
    scrolledPortion = window.pageYOffset;
  } else {
    pageHeight = imageWrapper.firstElementChild.scrollHeight;
    // scrollTop은 요소의 콘텐츠의 세로 스크롤의 픽셀수를 반환한다.
    scrolledPortion = imageWrapper.scrollTop;
  }

  const scrolledPortionDegree =
    (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;

  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortionDegree}deg)`;
  });

  if (scrolledPortionDegree >= 180) {
    halfCircles[0].style.transform = 'rotate(180deg)';
    halfCirclesTop.style.opacity = '0';
  } else {
    halfCirclesTop.style.opacity = '1';
  }

  // 마지막 화면에서 최상단으로 이동하는 로직. (스크롤 Y 픽셀 + 화면 픽셀 === 페이지 전체 높이)
  scrollBool = scrolledPortion + pageViewportHeight === pageHeight;

  //Arrow Rotation
  if (scrollBool) {
    progressBarCircle.style.transform = 'rotate(180deg)';
  } else {
    progressBarCircle.style.transform = 'rotate(0)';
  }
  //End of Arrow Rotation
};
// End of Progress Bar

// Progress Bar Click
progressBar.addEventListener('click', (e) => {
  e.preventDefault();
  if (!imageWrapper) {
    //? in order to transform the nodelist into an array, we need to use a right that from method and we
    const sectionPositions = Array.from(sections).map((section) => {
      //? getBoundingClientRect()는 화면상(viewport)에 따른 위치 값을 픽셀로 반환한다.
      // getBoundingClientRect가 상대적 위치 값을 반환하지만 scrolledPortion도 상대적 위치를 반환한다.
      // 따라서, sectionPositions는 항상 고정 값으로 나오게 된다.
      return scrolledPortion + section.getBoundingClientRect().top;
    });
    const position = sectionPositions.find((sectionPosition) => {
      // sectionPositions은 항상 고정이기에 scrolledPortion Y 위치 값을 기준으로 로직이 돌아간다.
      return sectionPosition > scrolledPortion;
    });
    scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
  } else {
    scrollBool
      ? imageWrapper.scrollTo(0, 0)
      : imageWrapper.scrollTo(0, imageWrapper.scrollHeight);
  }
});
// End of Progress Bar Click

progressBarFn();

// Navigation
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

const scrollFn = () => {
  menuIcon.classList.add('show-menu-icon');
  navbar.classList.add('hide-navbar');
  if (window.scrollY <= 50) {
    menuIcon.classList.remove('show-menu-icon');
    navbar.classList.remove('hide-navbar');
  }
  progressBarFn();
};

document.addEventListener('scroll', scrollFn);

menuIcon.addEventListener('click', () => {
  menuIcon.classList.remove('show-menu-icon');
  navbar.classList.remove('hide-navbar');
});
// End of Navigation

// About Me Text
const aboutMeText = document.querySelector('.about-me-text');
const aboutMeTextContent =
  '사용자의 관점에서 최적의 UI/UX를 설계할 수 있는 프론트엔드 개발자입니다. 개발 체계의 핵심인 Flow-Chart를 만들 수 있으며, 명확한 커뮤니케이션을 지향하여 협업 능력이 뛰어납니다. 상세한 내용은 메일로 요청 부탁드립니다.';

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

    document.removeEventListener('scroll', scrollFn);

    // mouseCircle이 프로젝트 박스에 들어가 있는데, 프로젝트를 클릭하여 팝업이 뜨는 경우
    // 프로젝트 박스 테두리를 없애기 위함.
    mouseCircle.style.opacity = 0;

    progressBarFn(bigImgWrapper);
    bigImgWrapper.onscroll = () => {
      progressBarFn(bigImgWrapper);
    };

    projectHideBtn.classList.add('change');

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove('change');
      bigImgWrapper.remove();
      document.body.style.overflowY = 'scroll';

      document.addEventListener('scroll', scrollFn);

      // 프로젝트 이미지 팝업 화면에서 close 클릭 시, 오른쪽 하단의 버튼의 상태를 업데이트하기 위해 함수를 실행
      progressBarFn();
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

// Section 5

// Form
const formHeading = document.querySelector('.form-heading');
const formInputs = document.querySelectorAll('.contact-form-input');

formInputs.forEach((input) => {
  input.addEventListener('focus', () => {
    formHeading.style.opacity = '0';
    setTimeout(() => {
      formHeading.textContent = `${input.placeholder}을 입력해주세요!`;
      formHeading.style.opacity = '1';
    }, 300);
  });

  input.addEventListener('blur', () => {
    formHeading.style.opacity = '0';
    setTimeout(() => {
      formHeading.textContent = `Let's Talk`;
      formHeading.style.opacity = '1';
    }, 300);
  });
});

// End of Form

// Slideshow
const slideshow = document.querySelector('.slideshow');

setInterval(() => {
  const firstIcon = slideshow.firstElementChild;
  firstIcon.classList.add('faded-out');

  const thirdIcon = slideshow.children[3];
  thirdIcon.classList.add('light');

  //   const secondIcon = slideshow.children[2];
  //   secondIcon.classList.remove('light');

  thirdIcon.previousElementSibling.classList.remove('light');

  setTimeout(() => {
    slideshow.removeChild(firstIcon);
    //appendChild는 마지막 요소에 추가를 시켜줌.
    slideshow.appendChild(firstIcon);

    setTimeout(() => {
      firstIcon.classList.remove('faded-out');
      firstIcon.classList.remove('light');
    }, 100);
  }, 500);
}, 3000);

// End of Slideshow

// Form Validation
const form = document.querySelector('.contact-form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const messages = document.querySelectorAll('.message');
let isSendEmail = false;

const error = (input, message) => {
  input.nextElementSibling.classList.add('error');
  input.nextElementSibling.textContent = message;
  setTimeout(() => {
    isSendEmail = false;
  }, 300);
};

const success = (input) => {
  input.nextElementSibling.classList.remove('error');
  isSendEmail = true;
};

const checkRequiredFields = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      error(input, `${input.id}를 입력해주세요.`);
    }
    //  아래 코드를 넣으니 최종 성공으로 되어 checkLength 함수가 작동하지 않는다.
    //  else {
    //    success(input);
    //  }
  });
};

const checkLength = (input, min) => {
  if (input.value.trim().length < min) {
    error(input, `${input.id}의 값은 ${min}자 이상 작성되어야 합니다.`);
  } else {
    success(input);
  }
};

const checkEmail = (input) => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regEx.test(input.value.trim())) {
    success(input);
  } else {
    error(input, '이메일이 유효하지 않습니다.');
  }
};

// Email JS
const emailSend = (username, email, subject, message) => {
  console.log('gg');
  emailjs.init('6KKCgI7PUt4VgBw8A');

  let templateParams = {
    name: username.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  emailjs.send('service_jj92e66', 'template_du1uk47', templateParams).then(
    function (response) {
      console.log('SUCCESS!', response.status, response.text);
      alert('이메일 전송이 완료되었습니다. 곧 회신 드리겠습니다. 감사합니다!');
    },
    function (error) {
      console.log('FAILED...', error);
      alert(
        '전송에 실패하였습니다. "hillskuti@naver.com"로 직접 메일을 발송해주세요!'
      );
    }
  );
};

// End of Email JS

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkLength(username, 2);
  checkLength(subject, 2);
  checkLength(message, 10);
  checkEmail(email);
  checkRequiredFields([username, email, subject, message]);
  setTimeout(() => {
    isSendEmail && emailSend(username, email, subject, message);
  }, 700);
});
// End of Form Validation

// End of Section 5
