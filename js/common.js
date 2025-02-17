$(document).on('mousemove', function (e) {
  const $dim = $('.dim');
  const menuIcon = $('.menu-icon_cheeckbox');
  const menuOpen = $('.menu-open');
  const $menuText = $('.menu p');
  const $menuSpan = $('.menu span');
  const $header = $('#header');

  menuIcon.on('change', function () {
    if (this.checked) {
      openMenu();
    } else {
      closeMenu();
    }
  });
  // 메뉴 열기 함수
  function openMenu() {
    menuOpen.addClass('active');
    $header.css('mix-blend-mode', 'unset');
    $menuText.text('Close').css('color', '#000');
    $menuSpan.css('background-color', '#000');
    $('body, html').addClass('prevent'); // 스크롤 막기
    $dim.css({ opacity: 1, visibility: 'visible' });
  }
  // 메뉴 닫기 함수
  function closeMenu() {
    menuIcon.prop('checked', false);
    menuOpen.removeClass('active');

    setTimeout(() => {
      $header.css('mix-blend-mode', 'difference');
      $menuText.text('Menu').css('color', '#fff');
      $menuSpan.css('background-color', 'var(--bar-bg, #fff)');
      $('body, html').removeClass('prevent'); // 스크롤 복구
      $dim.css({ opacity: 0, visibility: 'hidden' });
    }, 300);
  }
  // 딤 클릭 시 메뉴 닫기
  $dim.on('click', closeMenu);

  // cursor
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
