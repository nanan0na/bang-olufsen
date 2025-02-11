document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.visual-slide', {
    loop: true, // 무한 루프
    autoplay: {
      delay: 5000, // 5초마다 슬라이드 변경
      disableOnInteraction: false, // 유저가 터치해도 자동 슬라이드 유지
    },
    effect: 'slide', // 기본 슬라이드 효과
    speed: 800, // 부드러운 전환 (0.8초)
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
  // 초기 페이지네이션 업데이트
  updatePagination(swiper.realIndex);

  // gsap our story
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline();
  const video = document.querySelector('.our-story video');
  const text = document.querySelector('.our-story-text');
  const cursor = document.querySelector('.sec-cursor'); // 커서 요소
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
    onEnterBack: showCursor, // 다시 돌아올 때 커서 표시
    onLeave: hideCursor, // 스크롤이 지나가면 커서 숨김
    onEnter: () => {
      showCursor(),
        gsap.to(video, {
          width: '100vw', // 화면 가득 채우기
          height: '100vh',
          left: '0',
          top: '0',
          position: 'fixed', // 화면에 고정
          ease: 'power2.out',
          duration: 0.7, // 0.5초 동안 확대
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
        duration: 0.5, // 0.5초 동안 확대
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
      markers: true,
      start: 'top top',
      end: '1000% bottom',
      pin: '.our-story',
      scrub: true,
    },
  });

  // ✅ Swiper for Product Section (드래그 전용)
  const productSwiper = new Swiper('.product-slide', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: true,
    grabCursor: true,
    on: {
      progress: function (swiper) {
        const bar = document.querySelector('.progress-bar-fill');
        const progressValue = Math.max(swiper.progress * 100, 10); // 최소 20% 유지
        bar.style.width = `${progressValue}%`; // 진행률 반영
      },
    },
  });
  // ✅ 초기 프로그레스 바 20% 설정
  const bar = document.querySelector('.progress-bar-fill');
  bar.style.width = '10%';

  // `.product` 영역 안에서만 커서 크기 조절
  const productSection = document.querySelector('.product-slide');
  productSection.on('mouseenter', function () {
    cursor.css({
      transform: 'scale(1)', // 원래 크기
      opacity: '1', // 완전히 보이게
    });
    $('body').css('cursor', 'none');
  });
});
