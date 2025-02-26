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
    let totalSlides = 3;
    let currentIndex = (index % totalSlides) + 1;

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
  const text = document.querySelector('.our-story-text, .mobile-btn');
  const cursor = document.querySelectorAll('.sec-cursor'); // 커서 요소
  const section = document.querySelector('.our-story');

  function showCursor() {
    gsap.to(cursor, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: 'power1.out',
    });
  }
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
    onEnterBack: showCursor,
    onLeave: hideCursor,
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
  section.addEventListener('mouseenter', showCursor);
  section.addEventListener('mouseleave', hideCursor);

  // 마우스 커서
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
  // const productSwiper = new Swiper('.product-slide', {
  //   slidesPerView: 'auto',
  //   spaceBetween: 0,
  //   freeMode: true,
  //   grabCursor: true,
  //   simulateTouch: true,
  //   touchRatio: 1,
  //   resistanceRatio: 0,
  //   on: {
  //     progress: function (swiper) {
  //       const bar = document.querySelector('.progress-bar-fill');
  //       const progressValue = Math.max(swiper.progress * 100, 10);
  //       bar.style.width = `${progressValue}%`;
  //     },
  //   },
  // });

  let productSwiper;

  function initSwiper() {
    const windowInner = window.innerWidth; // 현재 화면 너비 가져오기

    if (windowInner > 601 && productSwiper == undefined) {
      productSwiper = new Swiper('.product-slide', {
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

      // 프로그레스 바 보이게
      document.querySelector('.progress-bar').style.opacity = '1';
      document.querySelector('.progress-bar').style.visibility = 'visible';
    } else if (windowInner <= 601 && productSwiper != undefined) {
      productSwiper.destroy();
      productSwiper = undefined;
      applyGSAP(); // GSAP 애니메이션 실행
    }
  }
  let gsapAnimationActive = false;

  function applyGSAP() {
    if (!gsapAnimationActive) {
      gsapAnimationActive = true;

      gsap.to('.product-title', {
        opacity: 1,
        y: -10,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.product',
          start: 'top top',
          end: 'bottom 20%',
          scrub: true,
        },
      });
    }
  }

  // 반응형 변경 감지
  window.addEventListener('resize', initSwiper);

  // 초기 프로그레스 바
  const bar = document.querySelector('.progress-bar-fill');
  bar.style.width = '12%';

  const products = [
    { img: './img/subimg02.jpg', name: 'Beosound A9', price: 'From ₩5,000,000' },
    { img: './img/subimg03.jpg', name: 'Beosound A9', price: 'From ₩5,000,000' },
    { img: './img/subimg04.jpg', name: 'Beosound A5', price: 'From ₩2,090,000' },
    { img: './img/subimg05.jpg', name: 'Beosound A1 2nd Gen', price: 'From ₩700,000' },
    { img: './img/subimg06.jpg', name: 'Beosound A5', price: 'From ₩700,000' },
    { img: './img/subimg07.jpg', name: 'Beosound 2 Ferrari Edition', price: 'From ₩7,199,000  ' },
    { img: './img/subimg08.jpg', name: 'Beosound 2', price: 'From ₩2,090,000' },
    { img: './img/subimg09.jpg', name: 'Beosound 2', price: 'From ₩2,090,000' },
  ];

  const swiperWrapper = document.querySelector('.product-swiper-wrapper');

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
  initSwiper();
  requestAnimationFrame(() => {
    if (productSwiper) {
      productSwiper.update();
    } else {
      console.warn('productSwiper가 아직 초기화되지 않음!');
    }
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

  ScrollTrigger.refresh();
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
    end: '+=300%',
    pin: true,
    scrub: 1,
    onUpdate: (self) => {
      let progress = self.progress * (slides.length - 1);
      let index = Math.round(progress);

      if (imgEl.dataset.currentIndex != index) {
        imgEl.dataset.currentIndex = index;

        // 기존 이미지 위로 사라지게
        gsap.to(imgEl, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            imgEl.src = slides[index].img;
            if (slides[index].img.includes('main-world02.jpg')) {
              imgEl.style.objectPosition = 'top'; // 상단
            } else {
              imgEl.style.objectPosition = 'center';
            }
            gsap.set(imgEl, { y: 20, opacity: 0 });
            gsap.to(imgEl, { y: 0, opacity: 1, duration: 0.5, ease: 'power1.in' });
          },
        });

        // 텍스트 변경 페이드
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
  const storeText = storeSection.querySelectorAll('.inner h2, .inner p, .store .mobile-btn'); // 텍스트 요소

  ScrollTrigger.create({
    trigger: storeSection,
    start: 'top top',
    end: '+=150%',
    pin: true,
    scrub: 1,
    onEnter: showCursor,
    onEnterBack: showCursor,
    onLeave: hideCursor,
  });
  gsap.fromTo(
    storeText,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: storeSection,
        start: 'top top',
        end: 'top 20%',
        scrub: 3,
      },
    }
  );
  storeSection.addEventListener('mouseenter', showCursor);
  storeSection.addEventListener('mouseleave', hideCursor);
});
