(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Lenis smooth scroll ---------- */
  if (!reduceMotion && window.Lenis) {
    var lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id.length > 1) {
          var target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -80 });
          }
        }
      });
    });
  }

  /* ---------- GSAP ScrollTrigger: story image "bend" ---------- */
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.story-img').forEach(function (img) {
      gsap.fromTo(
        img,
        { borderRadius: '140px 20px 140px 20px' },
        {
          borderRadius: '12px 12px 12px 12px',
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            end: 'center 45%',
            scrub: 0.6
          }
        }
      );
    });

    gsap.utils.toArray('.pricing-card').forEach(function (card, i) {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: (i % 4) * 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' }
        }
      );
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Testimonial carousel ---------- */
  var track = document.getElementById('carousel-track');
  if (track) {
    var slides = Array.prototype.slice.call(track.querySelectorAll('.carousel-slide'));
    var dotsWrap = document.getElementById('carousel-dots');
    var prevBtn = document.getElementById('carousel-prev');
    var nextBtn = document.getElementById('carousel-next');
    var current = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', 'Avis ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('.carousel-dot'));

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) { slide.classList.toggle('is-active', i === current); });
      dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === current); });
    }
    prevBtn.addEventListener('click', function () { goTo(current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); });

    goTo(0);

    if (!reduceMotion) {
      var autoplay = setInterval(function () { goTo(current + 1); }, 6000);
      track.closest('.carousel').addEventListener('mouseenter', function () { clearInterval(autoplay); });
    }
  }
})();
