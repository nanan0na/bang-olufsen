document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.visual-slide', {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    effect: 'slide',
    speed: 800,
    on: {
      slideChangeTransitionEnd: function () {
        updatePagination(swiper.realIndex);
      },
    },
  });

  function updatePagination(index) {
    let totalSlides = 3; // 총 슬라이드 개수
    let currentIndex = (index % totalSlides) + 1; // 1부터 시작하도록 설정
    // 첫 번째 span의 숫자를 현재 슬라이드 번호로 변경
    let firstSpan = document.querySelector('.visual-pagination span:first-child');
    if (firstSpan) {
      firstSpan.textContent = `0${currentIndex}`;
    }
  }
  updatePagination(swiper.realIndex);

  // gsap our story
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline();
  const video = document.querySelector('.our-story video');
  const text = document.querySelector('.our-story-text');
  const cursor = document.querySelectorAll('.sec-cursor'); // 커서 요소
  const section = document.querySelector('.our-story');

  // 커서 보이기 (공통 함수)
  function showCursor() {
    gsap.to(cursor, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: 'power1.out',
    });
  }

  // 커서 숨기기 (공통 함수)
  function hideCursor() {
    gsap.to(cursor, {
      opacity: 0,
      scale: 0.5,
      duration: 0.2,
      ease: 'power1.out',
    });
  }

  ScrollTrigger.create({
    trigger: video,
    start: '250% center',
    end: '300% bottom',
    onEnterBack: showCursor, // 다시 돌아올 때 커서
    onLeave: hideCursor, // 스크롤이 지나가면 숨김
    onEnter: () => {
      showCursor(),
        gsap.to(video, {
          width: '100vw',
          height: '100vh',
          left: '0',
          top: '0',
          position: 'fixed',
          ease: 'power2.out',
          duration: 0.7,
        });
      tl.to(text, {
        color: '#fff',
      });
    },
  });
  ScrollTrigger.create({
    trigger: text,
    start: '250% center',
    end: '300% bottom',
    onEnter: () => {
      gsap.to(text, {
        ease: 'power2.out',
        color: '#fff',
        duration: 0.5,
      });
    },
  });

  // 마우스가 our-story 영역에 들어오면 커서 활성화
  section.addEventListener('mouseenter', showCursor);
  section.addEventListener('mouseleave', hideCursor);

  // 마우스 이동 시 커서 따라다니게 설정
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power1.out',
    });
  });
  tl.to(text, {
    scrollTrigger: {
      trigger: '.our-story',
      start: 'top top',
      end: '1000% bottom',
      pin: '.our-story',
      scrub: true,
    },
  });

  // Swiper for Product Section (드래그 전용)
  const productSwiper = new Swiper('.product-slide', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    freeMode: true,
    grabCursor: true,
    simulateTouch: true,
    touchRatio: 1,
    resistanceRatio: 0,
    on: {
      progress: function (swiper) {
        const bar = document.querySelector('.progress-bar-fill');
        const progressValue = Math.max(swiper.progress * 100, 10);
        bar.style.width = `${progressValue}%`;
      },
    },
  });
  // 초기 프로그레스 바
  const bar = document.querySelector('.progress-bar-fill');
  bar.style.width = '10%';
  //

  // 추가할 제품 목록 (02번부터 추가)
  const products = [
    { img: './img/main-product02.jpg', name: 'Beosound A5', price: 'From ₩2,090,000' },
    { img: './img/main-product03.jpg', name: 'Beosound A5', price: 'From ₩2,090,000' },
    { img: './img/main-product04.jpg', name: 'Beosound A5', price: 'From ₩2,090,000' },
    { img: './img/main-product05.jpg', name: 'Beosound A5', price: 'From ₩2,090,000' },
    { img: './img/main-product06.jpg', name: 'Beosound A5', price: 'From ₩2,090,000' },
    { img: './img/main-product07.jpg', name: 'Beosound A5', price: 'From ₩2,090,000' },
    { img: './img/main-product08.jpg', name: 'Beosound A5', price: 'From ₩2,090,000' },
  ];

  // Swiper-wrapper 요소 가져오기
  const swiperWrapper = document.querySelector('.product-swiper-wrapper');

  // 새 슬라이드 생성 & 추가
  products.forEach((product) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'product-title');
    slide.innerHTML = `
  <img src="${product.img}" alt="" />
  <div class="products-text">
    <strong>${product.name}</strong>
    <p>${product.price}</p>
  </div>
`;
    swiperWrapper.appendChild(slide);
  });

  // Swiper 다시 업데이트 (새 슬라이드 적용)
  requestAnimationFrame(() => {
    productSwiper.update();
  });

  // professional
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });
  gsap.fromTo(
    '.pro-title h2',
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.pro-title',
        start: '+=180 center',
        end: '800% bottom',
        scrub: false,
        pin: '.professional',
      },
    }
  );

  ScrollTrigger.refresh(); // 스크롤 감지 다시 초기화
  gsap.to('.professional .inner > img, .professional .pro-wrap li', {
    opacity: 1,
    y: 30,
    scale: 1,
    duration: 0.5,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.professional .inner > img',
      start: '+=800 center',
      end: 'bottom center',
      scrub: false,
    },
  });

  // 🟢 미세한 떠다니는 효과 추가
  gsap.to('.professional .inner > img', {
    y: 15,
    duration: 1.5,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true,
  });
  ScrollTrigger.refresh();

  // world
  const slides = [
    {
      img: './img/main-world01.jpg',
      title: 'My day in music',
      subtitle: 'The Medea sisters <b>and Beoplay H100</b>',
      desc: 'Since 1925 Bang & Olufsen has created iconic audio and home entertainment products as a talented musician with a passion for playing the piano, composing and recording his own music, while expressing his thoughts on how music plays a vital role in his life.',
    },
    {
      img: './img/main-world02.jpg',
      title: 'Introducing',
      subtitle: 'Charles Leclerc x <b>Bang & Olufsen</b>',
      desc: 'Charles Leclerc is best known as one of the most talented F1 drivers of the current generation. But outside of his brilliant racing career, which has brought him worldwide acclaim, the Monegasque driver has built a reputation.',
    },
    {
      img: './img/main-world03.jpg',
      title: 'Atelier Edition',
      subtitle: 'Beosound A5 <b>Cranberry Red</b>',
      desc: 'The deep hues of autumn leaves. The rich crimson berries ripe for the picking. That red colour comes naturally, marking a season of change – not least for the songs in your playlist.',
    },
    {
      img: './img/main-world04.jpg',
      title: 'The Ferrari Collection',
      subtitle: 'Bang & Olufsen <b>for Ferrari</b>',
      desc: 'The deep hues of autumn leaves. Adrenaline meets eardrums. Beauty and performance collide. Italian motorsport meets Danish design.',
    },
  ];

  const imgEl = document.querySelector('.world-img');
  const titleEl = document.querySelector('.world-heading');
  const subtitleEl = document.querySelector('.world-subtitle');
  const descEl = document.querySelector('.world-desc');
  const pageCurrent = document.querySelector('.page-current');

  // ScrollTrigger 생성
  ScrollTrigger.create({
    trigger: '.world',
    start: 'top top',
    end: '+=300%', // 스크롤 길이
    pin: true, // 화면 고정
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress * (slides.length - 1);
      let index = Math.round(progress);

      if (imgEl.dataset.currentIndex != index) {
        imgEl.dataset.currentIndex = index;

        // 기존 이미지 위로 사라지게 (y축 이동 + 투명도 감소)
        gsap.to(imgEl, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            imgEl.src = slides[index].img; // 이미지 변경
            gsap.set(imgEl, { y: 30, opacity: 0 }); // 새로운 이미지를 아래에서 대기 상태로 설정

            // 새 이미지 아래에서 위로 올라오면서 나타나게
            gsap.to(imgEl, { y: 0, opacity: 1, duration: 0.5, ease: 'power1.in' });
          },
        });

        // 텍스트 변경 (자연스럽게 페이드 효과 추가)
        gsap.to([titleEl, subtitleEl, descEl], {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            titleEl.textContent = slides[index].title;
            subtitleEl.innerHTML = slides[index].subtitle;
            descEl.textContent = slides[index].desc;
            pageCurrent.textContent = `0${index + 1}`;

            gsap.set([titleEl, subtitleEl, descEl], { y: 20, opacity: 0 }); // 새로운 텍스트를 아래에서 대기 상태로 설정
            gsap.to([titleEl, subtitleEl, descEl], { opacity: 1, y: 0, duration: 0.5, ease: 'power1.in' });
          },
        });
      }
    },
  });

  // store
  const storeSection = document.querySelector('.store');
  const storeText = storeSection.querySelectorAll('.inner h2, .inner p'); // 텍스트 요소

  // 🟢 **1. store 섹션 일정 구간 스크롤 고정**
  ScrollTrigger.create({
    trigger: storeSection,
    start: 'top top',
    end: '+=150%', // 스크롤 길이 조정
    pin: true,
    scrub: 1,
    onEnter: showCursor, // store 섹션 진입 시 커서 활성화
    onEnterBack: showCursor, // 다시 돌아올 때 커서 활성화
    onLeave: hideCursor, // store 섹션을 지나가면 커서 숨김
  });

  // 🟢 **2. 텍스트 stragger 애니메이션 (위에서 아래로 나타남)**
  gsap.fromTo(
    storeText,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: storeSection,
        start: 'top top',
        end: 'top 20%',
        scrub: 3,
      },
    }
  );

  // 🟢 **마우스가 store 영역에 들어오면 커서 활성화**
  storeSection.addEventListener('mouseenter', showCursor);
  storeSection.addEventListener('mouseleave', hideCursor);
});
