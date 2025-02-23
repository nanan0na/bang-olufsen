$(document).ready(function () {
  $('.filter-list li').on('click', function () {
    // 모든 li에서 active 클래스 제거 후 클릭한 li에 추가
    $('.filter-list li').removeClass('active');
    $(this).addClass('active');
  });

  $('.filter-list li').on('click', function () {
    $('.filter-list li').removeClass('active'); // 기존 active 제거
    $(this).addClass('active'); // 클릭한 요소에 active 추가
  });
  gsap.registerPlugin(ScrollTrigger);

  $('.product-list:nth-child(n + 4)').hide();

  $(document).ready(function () {
    const contentData = {
      'All Products': {
        title: 'All Products',
        text: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
      Speakers: {
        title: 'Speakers',
        text: ' Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      },
      Headphones: {
        title: 'Headphones',
        text: ' Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      },
      Soundbars: {
        title: 'Soundbars',
        text: ' At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam',
      },
      Televisions: {
        title: 'Televisions',
        text: ' ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ',
      },
      Accessories: {
        title: 'Accessories',
        text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      },
      'Gift guide': {
        title: 'Gift Guide',
        text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    };

    $('.filter-list li').on('click', function () {
      // 모든 li에서 active 클래스 제거 후 클릭한 li에 추가
      $('.filter-list li').removeClass('active');
      $(this).addClass('active');

      // 클릭한 항목의 텍스트 가져오기
      let category = $(this).text().trim();

      // 부드러운 애니메이션 적용 (GSAP)
      gsap.to('.product-title', {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: function () {
          $('.product-title h3').text(contentData[category].title);
          $('.product-title p').text(contentData[category].text);

          gsap.to('.product-title', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        },
      });
    });
  });

  // GSAP 애니메이션 함수
  function animateProducts() {
    gsap.utils.toArray('.product-list').forEach((list, index) => {
      gsap.fromTo(
        list,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
        }
      );
    });

    // **ScrollTrigger 다시 계산 (새로운 요소 포함)**
    ScrollTrigger.update();
  }

  $('.more-product').on('click', function () {
    $('.product-list:nth-child(n + 4)').slideDown(300, function () {
      // **새롭게 나타난 요소들에 애니메이션 다시 적용**
      animateProducts();
    });

    $('.more-product').css('opacity', 0);
  });

  // 페이지 로드 시 애니메이션 실행
  animateProducts();

  // Hover 효과 (이미지 변경)
  $('.product-list li img').each(function (index) {
    let $img = $(this);
    let originalSrc = $img.attr('src');
    let hoverSrc = originalSrc.replace(/(subimg\d+)(\.\w+)$/, '$1-hover$2');

    // 특정 요소 제외 (12번째 이미지와 4번째 리스트의 첫 번째 compare)
    if (index === 12 || ($img.closest('.product-list').index() === 3 && $img.parent().hasClass('compare'))) {
      return;
    }

    $img.hover(
      function () {
        $(this).fadeOut(100, function () {
          $(this).attr('src', hoverSrc).fadeIn(150);
        });
      },
      function () {
        $(this).fadeOut(100, function () {
          $(this).attr('src', originalSrc).fadeIn(150);
        });
      }
    );
  });
});
