$(document).on('mousemove', function (e) {
  gsap.registerPlugin(ScrollTrigger);

  const filter = document.querySelector('.world .professional .product'); // ✅ 올바른 선택자
  gsap.to('nav', {
    filter: 'invert(100%)',
    scrollTrigger: {
      trigger: filter, // ✅ .product 섹션이 트리거
      start: 'center center',
      end: 'center center',
      toggleActions: 'play reverse play reverse',
      markers: true, // 디버깅용 마커
    },
  });

  var xPos = e.pageX;
  var yPos = e.pageY;
  // console.log(xPos, yPos);
  $('.cursor').css({
    top: yPos,
    left: xPos,
  });

  // `.visual` 영역 안에서만 커서 크기 조절
  $('.visual').on('mouseenter', function () {
    $('.cursor').css({
      transform: 'scale(1)', // 원래 크기
      opacity: '1', // 완전히 보이게
    });
    $('body').css('cursor', 'none');
  });

  $('.visual').on('mouseleave', function () {
    $('.cursor').css({
      transform: 'scale(0.1)', // 작아지게
      opacity: '0', // 살짝 투명하게
    });
    $('body').css('cursor', 'auto');
  });
});
