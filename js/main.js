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
    end: '1000% bottom',
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
    end: '1000% bottom',
    onEnter: () => {
      gsap.to(text, {
        marginTop: '12rem',
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
    spaceBetween: 10,
    freeMode: true,
    grabCursor: true,
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

  // `.product` 영역 안에서만 커서 크기 조절
  // const productSection = document.querySelector('.product-slide');
  // productSection.addEventListener('mouseenter', function () {
  //   cursor.css({
  //     transform: 'scale(1)', // 원래 크기
  //     opacity: '1', // 완전히 보이게
  //   });
  //   $('body').css('cursor', 'none');
  // });

  // professional
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });
  gsap.fromTo(
    '.pro-title h2',
    {
      y: 100, // 아래에서 시작
      opacity: 0,
    },
    {
      y: 0, // 제자리로
      opacity: 1, // 완전히 보이게
      duration: 1,
      stagger: 0.2, // 0.2초 간격으로 하나씩 등장
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.pro-title',
        start: '+=180 center', // 화면의 80% 위치에서 시작
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
          y: -30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            imgEl.src = slides[index].img; // 이미지 변경
            gsap.set(imgEl, { y: 30, opacity: 0 }); // 새로운 이미지를 아래에서 대기 상태로 설정

            // 새 이미지 아래에서 위로 올라오면서 나타나게
            gsap.to(imgEl, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
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
            gsap.to([titleEl, subtitleEl, descEl], { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
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
    end: '+=200%', // 스크롤 길이 조정
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
        scrub: 1,
      },
    }
  );

  // 🟢 **마우스가 store 영역에 들어오면 커서 활성화**
  storeSection.addEventListener('mouseenter', showCursor);
  storeSection.addEventListener('mouseleave', hideCursor);
});
