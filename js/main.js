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

  ScrollTrigger.create({
    trigger: video,
    start: '250% center',
    end: '1000% bottom',
    onEnter: () => {
      gsap.to(video, {
        width: '100vw', // 화면 가득 채우기
        height: '100vh',
        left: '0',
        top: '0',
        position: 'fixed', // 화면에 고정
        ease: 'power2.out',
        duration: 0.5, // 0.5초 동안 확대
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
});
