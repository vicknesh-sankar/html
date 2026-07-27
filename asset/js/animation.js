    document.querySelectorAll('[data-scroll-target]').forEach((button) => {
      button.addEventListener('click', () => {
        const target = document.querySelector(button.dataset.scrollTarget);
        if (!target) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      });
    });

    // ===== Status Badge Parallax =====
    const statusBadge = document.querySelector('.ai-btn');
    const statusParallaxArea = statusBadge?.closest('.hero');
    const allowStatusParallax = window.matchMedia(
      '(pointer: fine) and (prefers-reduced-motion: no-preference)'
    );

    if (statusBadge && statusParallaxArea && allowStatusParallax.matches) {
      let statusFrame = null;
      let pointerX = 0;
      let pointerY = 0;

      function renderStatusParallax() {
        const rect = statusParallaxArea.getBoundingClientRect();
        const normalizedX = ((pointerX - rect.left) / rect.width - 0.5) * 2;
        const normalizedY = ((pointerY - rect.top) / rect.height - 0.5) * 2;
        const x = Math.max(-1, Math.min(1, normalizedX));
        const y = Math.max(-1, Math.min(1, normalizedY));

        statusBadge.style.setProperty('--status-x', `${(x * 10).toFixed(2)}px`);
        statusBadge.style.setProperty('--status-y', `${(y * 7).toFixed(2)}px`);
        statusBadge.style.setProperty('--status-rotate-x', `${(-y * 4).toFixed(2)}deg`);
        statusBadge.style.setProperty('--status-rotate-y', `${(x * 6).toFixed(2)}deg`);
        statusBadge.style.setProperty('--status-icon-x', `${(x * 4).toFixed(2)}px`);
        statusBadge.style.setProperty('--status-icon-y', `${(y * 3).toFixed(2)}px`);
        statusFrame = null;
      }

      statusParallaxArea.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (statusFrame === null) {
          statusFrame = requestAnimationFrame(renderStatusParallax);
        }
      }, { passive: true });

      statusParallaxArea.addEventListener('pointerleave', () => {
        if (statusFrame !== null) {
          cancelAnimationFrame(statusFrame);
          statusFrame = null;
        }

        [
          '--status-x',
          '--status-y',
          '--status-rotate-x',
          '--status-rotate-y',
          '--status-icon-x',
          '--status-icon-y'
        ].forEach((property) => statusBadge.style.removeProperty(property));
      });
    }

    // ===== Page-wide Scroll Parallax =====
    const allowPageParallax = window.matchMedia(
      '(prefers-reduced-motion: no-preference)'
    );

    if (allowPageParallax.matches) {
      const pageParallaxLayers = [];
      let pageParallaxFrame = null;

      function registerPageParallax(selector, speed, xSpeed = 0) {
        document.querySelectorAll(selector).forEach((element, index) => {
          if (element.hasAttribute('data-page-parallax')) return;

          const direction = index % 2 === 0 ? 1 : -1;
          element.setAttribute('data-page-parallax', '');
          element.dataset.parallaxSpeed = String(speed);
          element.dataset.parallaxXSpeed = String(xSpeed * direction);
          pageParallaxLayers.push(element);
        });
      }

      registerPageParallax('.hero-txt-block', 0.035, -0.006);
      registerPageParallax('.hero-img-block', 0.065, 0.012);
      registerPageParallax('#experience .view-frame > .hero-frame-body', 0.03, 0.004);
      registerPageParallax('.scroll-section .wrap', 0.035, -0.004);
      registerPageParallax('.list-block', 0.022, 0.005);
      registerPageParallax('#featured-work .rail', 0.03, 0.004);
      registerPageParallax('.lanch-block', 0.028, -0.004);
      registerPageParallax('.capabilities-grid', 0.032, 0.004);
      registerPageParallax('.core-service-card', 0.022, 0.005);
      registerPageParallax('.faq-accordion', 0.03, -0.004);
      registerPageParallax('.footer-cta', 0.045, 0.006);
      registerPageParallax('.footer-details', 0.025, -0.004);
      registerPageParallax(
        '.block-title, .sec-text-main, .sec-text-muted, .sec-sub-main',
        0.018,
        0.003
      );

      function renderPageParallax() {
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        const compactViewport = window.innerWidth <= 720;
        const maxY = compactViewport ? 14 : 40;
        const maxX = compactViewport ? 6 : 16;

        pageParallaxLayers.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = viewportCenter - elementCenter;
          const speed = Number(element.dataset.parallaxSpeed);
          const xSpeed = Number(element.dataset.parallaxXSpeed);
          const y = Math.max(-maxY, Math.min(maxY, distance * speed));
          const x = Math.max(-maxX, Math.min(maxX, distance * xSpeed));

          element.style.setProperty('--page-parallax-x', `${x.toFixed(2)}px`);
          element.style.setProperty('--page-parallax-y', `${y.toFixed(2)}px`);
        });

        pageParallaxFrame = null;
      }

      function requestPageParallax() {
        if (pageParallaxFrame === null) {
          pageParallaxFrame = requestAnimationFrame(renderPageParallax);
        }
      }

      window.addEventListener('scroll', requestPageParallax, { passive: true });
      window.addEventListener('resize', requestPageParallax, { passive: true });
      window.addEventListener('load', requestPageParallax, { once: true });
      requestPageParallax();
    }

    function countUp(el, target, suffix, duration) {
      if (!el) return;

      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const statCounters = [
      { element: document.getElementById('stat1'), target: 9, suffix: '+', duration: 1000 },
      { element: document.getElementById('stat2'), target: 50, suffix: '+', duration: 1400 },
      { element: document.getElementById('stat3'), target: 100, suffix: '%', duration: 1600 }
    ];
    const statsRow = document.querySelector('.stats-row');
    const reduceStatMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    let statsHaveAnimated = false;

    function startStatCounters() {
      if (statsHaveAnimated) return;
      statsHaveAnimated = true;

      statCounters.forEach(({ element, target, suffix, duration }) => {
        if (!element) return;

        if (reduceStatMotion) {
          element.textContent = `${target}${suffix}`;
        } else {
          countUp(element, target, suffix, duration);
        }
      });
    }

    if (statsRow && 'IntersectionObserver' in window && !reduceStatMotion) {
      const statsObserver = new IntersectionObserver((entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        startStatCounters();
        observer.disconnect();
      }, {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px'
      });

      statsObserver.observe(statsRow);
    } else {
      startStatCounters();
    }

    // ===== Scroll Section Timeline =====
    const container = document.getElementById('cards');
    if (container) {
      const cards = container.querySelectorAll('.card');
      const fill = document.getElementById('timelineFill');
      const dots = document.querySelectorAll('.timeline-dot');
      const section = document.getElementById('scrollSection');
      const reduceTimelineMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      let activeCardIndex = 0;

      function animateTimelineCard(index) {
        if (!window.gsap || reduceTimelineMotion) return;

        const activeCard = cards[index];
        if (!activeCard) return;

        cards.forEach((card, cardIndex) => {
          gsap.killTweensOf(card);

          if (cardIndex === index) {
            gsap.fromTo(card, {
              y: 18,
              scale: 0.965,
              rotationX: 4,
              transformOrigin: 'center center'
            }, {
              y: -8,
              scale: 1.025,
              rotationX: 0,
              duration: 0.68,
              ease: 'back.out(1.7)',
              overwrite: true
            });
          } else {
            gsap.to(card, {
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 0.42,
              ease: 'power2.out',
              overwrite: true
            });
          }
        });

        const cardDetails = activeCard.querySelectorAll(
          '.card-title, .card-desc, .card-bottom'
        );
        const cardIcon = activeCard.querySelector('.icon-box');

        gsap.fromTo(cardDetails, {
          y: 14,
          autoAlpha: 0.45
        }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.48,
          stagger: 0.07,
          ease: 'power2.out',
          overwrite: true
        });

        if (cardIcon) {
          gsap.fromTo(cardIcon, {
            y: 10,
            scale: 0.82,
            rotation: -10
          }, {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.58,
            ease: 'back.out(2)',
            overwrite: true
          });
        }
      }

      function updateProgress() {
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight;
        let progress = -rect.top / total;
        progress = Math.max(0, Math.min(1, progress));

        fill.style.width = (progress * 100) + '%';

        const activeIdx = Math.min(3, Math.floor(progress * 4));
        cards.forEach((c, i) => c.classList.toggle('active', i === activeIdx));
        dots.forEach((d, i) => d.classList.toggle('filled', progress >= i / 3 - 0.001));

        if (activeIdx !== activeCardIndex) {
          activeCardIndex = activeIdx;
          animateTimelineCard(activeIdx);
        }
      }

      window.addEventListener('scroll', updateProgress, { passive: true });
      window.addEventListener('resize', updateProgress);
      updateProgress();

      if ('IntersectionObserver' in window && window.gsap && !reduceTimelineMotion) {
        const timelineEntranceObserver = new IntersectionObserver((entries, observer) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          animateTimelineCard(activeCardIndex);
          observer.disconnect();
        }, {
          threshold: 0.25
        });

        timelineEntranceObserver.observe(section);
      }
    }

    // ===== Featured Work Rail =====
    const rail = document.getElementById('rail');
    const counter = document.getElementById('counter');
    const trackFill = document.getElementById('trackFill');
    const railWrap = document.getElementById('railWrap');

    if (rail) {
      // Drag and wheel scroll. Pointer events cover mouse, touch, and pen input.
      const dragHint = document.querySelector('.drag-hint');
      let isDown = false, startX, scrollLeft, activePointerId = null;

      railWrap.addEventListener('mouseenter', () => {
        dragHint?.classList.add('visible');
      });

      railWrap.addEventListener('mouseleave', () => {
        dragHint?.classList.remove('visible');
      });

      railWrap.addEventListener('pointermove', (e) => {
        if (!isDown && dragHint && e.target.closest('.rail') === rail) {
          const rect = railWrap.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          dragHint.style.left = (x - 40) + 'px';
          dragHint.style.top = (y - 20) + 'px';
        }
      });

      railWrap.addEventListener('pointerdown', (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        isDown = true;
        activePointerId = e.pointerId;
        railWrap.classList.add('dragging');
        dragHint?.classList.remove('visible');
        startX = e.clientX;
        scrollLeft = railWrap.scrollLeft;
        railWrap.setPointerCapture?.(e.pointerId);
      });

      function stopDragging(e) {
        if (activePointerId !== null && e?.pointerId !== activePointerId) return;
        isDown = false;
        activePointerId = null;
        railWrap.classList.remove('dragging');
      }

      railWrap.addEventListener('pointerup', stopDragging);
      railWrap.addEventListener('pointercancel', stopDragging);
      railWrap.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        railWrap.scrollLeft = scrollLeft - dx;
      });

      railWrap.addEventListener('wheel', (e) => {
        if (railWrap.scrollWidth <= railWrap.clientWidth) return;
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (!delta) return;
        e.preventDefault();
        railWrap.scrollLeft += delta;
      }, { passive: false });

      // Counter + progress track
      const total = rail.children.length;

      function updateCounter() {
        const maxScroll = Math.max(railWrap.scrollWidth - railWrap.clientWidth, 0);
        const progress = maxScroll ? railWrap.scrollLeft / maxScroll : 0;
        const idx = Math.min(total - 1, Math.round(progress * (total - 1)));
        counter.textContent = String(idx + 1).padStart(2, '0') + ' / 0' + total;
        trackFill.style.width = (progress * 100) + '%';
      }

      railWrap.addEventListener('scroll', updateCounter, { passive: true });
      updateCounter();
    }

    // ===== Auto-opening Launch Process =====
    const lanchBlock = document.querySelector('.lanch-block');

    if (lanchBlock) {
      const lanchItems = [...lanchBlock.querySelectorAll('.lanch-list')];
      const lanchToggles = lanchItems.map((item) => item.querySelector('.lanch-toggle'));
      let lanchScrollFrame = null;
      let hoveredLanchToggle = null;

      lanchItems.forEach((item, index) => {
        const row = item.querySelector('.lanch-row');
        const toggle = lanchToggles[index];

        if (!row || !toggle) return;

        row.addEventListener('mouseenter', () => {
          hoveredLanchToggle = toggle;
          toggle.checked = true;
        });

        row.addEventListener('mouseleave', () => {
          hoveredLanchToggle = null;
          requestLanchUpdate();
        });
        toggle.addEventListener('focus', () => {
          toggle.checked = true;
        });
        toggle.addEventListener('blur', requestLanchUpdate);
      });

      function updateLanchTimeline() {
        lanchScrollFrame = null;

        if (hoveredLanchToggle) {
          hoveredLanchToggle.checked = true;
          return;
        }

        const viewportHeight = window.innerHeight;
        const blockRect = lanchBlock.getBoundingClientRect();
        const focusTop = viewportHeight * 0.22;
        const focusBottom = viewportHeight * 0.78;

        // Collapse the timeline when its block has left the active viewport area.
        if (blockRect.bottom < focusTop || blockRect.top > focusBottom) {
          lanchToggles.forEach((toggle) => {
            if (toggle) toggle.checked = false;
          });
          return;
        }

        // Activate each row when it crosses a line near the bottom of the
        // viewport. This lets every step run even when the whole block is
        // shorter than the viewport or sits at the end of the page.
        const activationLine = viewportHeight * 0.88;
        let activeIndex = 0;

        lanchItems.forEach((item, index) => {
          if (item.getBoundingClientRect().top <= activationLine) {
            activeIndex = index;
          }
        });

        const activeToggle = lanchToggles[activeIndex];
        if (activeToggle) activeToggle.checked = true;
      }

      function requestLanchUpdate() {
        if (lanchScrollFrame !== null) return;
        lanchScrollFrame = requestAnimationFrame(updateLanchTimeline);
      }

      window.addEventListener('scroll', requestLanchUpdate, { passive: true });
      window.addEventListener('resize', requestLanchUpdate, { passive: true });
      requestLanchUpdate();
    }

    // ===== GSAP Page Motion =====
    if (window.gsap) {
      const reducePageMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!reducePageMotion) {
        const pageEase = 'power3.out';

        // Reveal the identity first, followed by the message, portrait, and contact details.
        const heroMotion = gsap.timeline({
          defaults: {
            duration: 0.75,
            ease: pageEase
          }
        });

        heroMotion
          .from('.hero-frame-header > *', {
            autoAlpha: 0,
            y: -20,
            stagger: 0.1
          })
          .from('.hero-txt-block > *', {
            autoAlpha: 0,
            y: 30,
            stagger: 0.1
          }, '-=0.42')
          .from('.hero-img-block', {
            autoAlpha: 0,
            x: 42,
            scale: 0.96,
            duration: 0.9,
            clearProps: 'transform'
          }, '-=0.72')
          .from('.hero-frame-footer > *', {
            autoAlpha: 0,
            y: 16,
            stagger: 0.08,
            duration: 0.55
          }, '-=0.42');

        const revealSections = document.querySelectorAll(
          'body > section:not(:first-of-type), .footer-block'
        );

        function revealSection(section) {
          const headings = section.querySelectorAll(
            '.block-title, .sec-text-main, .sec-text-muted'
          );
          const revealItems = section.querySelectorAll(
            '.stat-card, .list-block, .rail-card, .lanch-list, ' +
            '.capability-card, .core-service-card, .accordion-item'
          );

          if (headings.length) {
            gsap.to(headings, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.09,
              ease: pageEase,
              clearProps: 'transform'
            });
          }

          if (revealItems.length) {
            gsap.to(revealItems, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.72,
              stagger: 0.08,
              ease: pageEase,
              clearProps: 'transform'
            });
          }

          const footerCta = section.querySelector('.footer-cta');
          if (footerCta) {
            gsap.to(footerCta, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: pageEase,
              clearProps: 'transform'
            });

            gsap.to(section.querySelectorAll('.footer-details > *, .footer-bottom'), {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              delay: 0.18,
              ease: pageEase,
              clearProps: 'transform'
            });
          }
        }

        revealSections.forEach((section) => {
          const headings = section.querySelectorAll(
            '.block-title, .sec-text-main, .sec-text-muted'
          );
          const revealItems = section.querySelectorAll(
            '.stat-card, .list-block, .rail-card, .lanch-list, ' +
            '.capability-card, .core-service-card, .accordion-item'
          );

          gsap.set(headings, { autoAlpha: 0, y: 24 });
          gsap.set(revealItems, { autoAlpha: 0, y: 34, scale: 0.985 });

          const footerCta = section.querySelector('.footer-cta');
          if (footerCta) {
            gsap.set(footerCta, { autoAlpha: 0, y: 42, scale: 0.985 });
            gsap.set(section.querySelectorAll('.footer-details > *, .footer-bottom'), {
              autoAlpha: 0,
              y: 26
            });
          }
        });

        if ('IntersectionObserver' in window) {
          const sectionMotionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              revealSection(entry.target);
              observer.unobserve(entry.target);
            });
          }, {
            threshold: 0.1,
            rootMargin: '0px 0px -8% 0px'
          });

          revealSections.forEach((section) => sectionMotionObserver.observe(section));
        } else {
          revealSections.forEach(revealSection);
        }
      }
    }
