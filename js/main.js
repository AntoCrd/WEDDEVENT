(function () {
  var heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    var nodes = Array.prototype.slice.call(heroTitle.childNodes);
    heroTitle.textContent = '';
    var wordIndex = 0;
    function appendWord(content, isNode) {
      var span = document.createElement('span');
      span.className = 'word';
      span.style.animationDelay = (0.15 + wordIndex * 0.09) + 's';
      if (isNode) span.appendChild(content); else span.textContent = content;
      heroTitle.appendChild(span);
      heroTitle.appendChild(document.createTextNode(' '));
      wordIndex++;
    }
    nodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/\s+/).forEach(function (word) {
          if (word === '') return;
          appendWord(word, false);
        });
      } else {
        appendWord(node, true);
      }
    });
  }

  var header = document.getElementById('site-header');
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-active', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  var revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) { animateCount(el); });
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1100;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  var contactForm = document.getElementById('contact-form');
  var formSuccess = document.getElementById('form-success');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      formSuccess.classList.add('is-visible');
      contactForm.querySelector('.btn-block').setAttribute('disabled', 'true');
      contactForm.reset();
    });
  }

  var newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsletterForm.querySelector('input');
      input.value = '';
      input.placeholder = 'Merci pour votre inscription !';
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var heroMedia = document.getElementById('hero-media');
  if (heroMedia && !reduceMotion) {
    var heroSection = document.getElementById('hero');
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y > heroSection.offsetHeight) return;
      heroMedia.style.transform = 'translateY(' + (y * 0.32) + 'px)';
    }, { passive: true });
  }

  if (hasHover && !reduceMotion) {
    var cursorDot = document.getElementById('cursor-dot');
    var previewPanel = document.getElementById('preview-panel');
    var previewImg = document.getElementById('preview-panel-img');
    var mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      cursorDot.classList.add('is-active');
      previewPanel.style.left = mouseX + 'px';
      previewPanel.style.top = mouseY + 'px';
    });
    window.addEventListener('mouseleave', function () {
      cursorDot.classList.remove('is-active');
    });

    var hoverTargets = document.querySelectorAll('a, button');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursorDot.classList.add('is-hovering'); });
      el.addEventListener('mouseleave', function () { cursorDot.classList.remove('is-hovering'); });
    });

    var previewRows = document.querySelectorAll('[data-preview-img]');
    previewRows.forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        previewImg.src = row.getAttribute('data-preview-img');
        previewPanel.classList.add('is-active');
        cursorDot.classList.add('is-hidden');
      });
      row.addEventListener('mouseleave', function () {
        previewPanel.classList.remove('is-active');
        cursorDot.classList.remove('is-hidden');
      });
    });

    var bendEls = document.querySelectorAll('[data-bend]');
    if (bendEls.length) {
      var bendState = Array.prototype.map.call(bendEls, function (el) {
        return { el: el, skew: 0 };
      });
      var lastY = window.scrollY;
      (function bendLoop() {
        var y = window.scrollY;
        var delta = y - lastY;
        lastY = y;
        var targetSkew = Math.max(-6, Math.min(6, delta * 0.5));
        bendState.forEach(function (state) {
          state.skew += (targetSkew - state.skew) * 0.12;
          state.el.style.transform = 'skewY(' + state.skew.toFixed(3) + 'deg) scale(1.06)';
        });
        window.requestAnimationFrame(bendLoop);
      })();
    }
  }
})();
