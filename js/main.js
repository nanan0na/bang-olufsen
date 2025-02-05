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
});
