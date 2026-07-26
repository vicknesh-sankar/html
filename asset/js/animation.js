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

    function countUp(el, target, suffix, duration) {
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    countUp(document.getElementById('stat1'), 9, '+', 1000);
    countUp(document.getElementById('stat2'), 50, '+', 1400);
    countUp(document.getElementById('stat3'), 100, '%', 1600);

    // ===== Scroll Section Timeline =====
    const PANEL_D = "M 12.25 0.25 L 277.75 0.25 L 289.75 12.25 L 289.75 75.5 L 281.75 83.5 L 281.75 227.5 L 289.75 235.5 L 289.75 298.75 L 277.75 310.75 L 12.25 310.75 L 0.25 298.75 L 0.25 12.25 L 12.25 0.25";

    const phases = [
      {
        title: "The Technical Foundation",
        phase: "01",
        desc: "Degree in hand, I quickly realized that textbook theory only takes you so far. My true education began when I started applying technical logic to real-world problems. Understanding the underlying technology behind every interface gave me a unique perspective on what's visually striking — and technically doable.",
        icon: 'fa-solid fa-microchip'
      },
      {
        title: "Bridging Code and Creativity",
        phase: "02",
        desc: "I kicked off my career at the intersection of design and development. Driven by a passion to build things that actually matter, I combined front-end code with clean UI design. This dual perspective allowed me to build scalable, high-performance web interfaces that look great and function seamlessly.",
        icon: 'fa-solid fa-palette'
      },
      {
        title: "Shaping Brand Identities",
        phase: "03",
        desc: "Design doesn't live in a vacuum. As a creative partner across print and digital implementations, I expanded into visual identity and brand strategy. I help brands tell a cohesive story — ensuring every digital touchpoint and physical collateral piece feels intentional and unified.",
        icon: 'fa-solid fa-star'
      },
      {
        title: "Solving Complex Problems",
        phase: "04",
        desc: "Today, my focus centers on solving complex product challenges through user-centered UX methodologies. By leveraging A/B testing, typography, color theory, and deep user research, I create data-backed digital experiences that don't just delight users — they actively drive engagement, conversion, and business growth.",
        icon: 'fa-solid fa-lightbulb'
      }
    ];

    function cardSVG(idx) {
      const g = 'g' + idx;
      return `
        <svg class="card-svg" viewBox="0 0 290 311" preserveAspectRatio="none">
          <defs>
            <filter id="soft-${g}" x="-120%" y="-120%" width="340%" height="340%" color-interpolation-filters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="a"/>
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b"/>
              <feMerge><feMergeNode in="a"/><feMergeNode in="b"/></feMerge>
            </filter>
            <filter id="crisp-${g}" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="8" result="blur"/>
              <feMerge><feMergeNode in="blur"/></feMerge>
            </filter>
          </defs>
          <path class="bg" d="${PANEL_D}"></path>
          <g class="glow-layer">
            <path d="${PANEL_D}" fill="none" stroke="var(--indigo)" stroke-width="8.5" opacity="0.35" filter="url(#soft-${g})"></path>
            <path d="${PANEL_D}" fill="none" stroke="var(--pink)" stroke-width="24.5" opacity="0.25" filter="url(#crisp-${g})"></path>
          </g>
          <path class="crisp" d="${PANEL_D}"></path>
        </svg>`;
    }

    const container = document.getElementById('cards');
    if (container) {
      phases.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'card' + (idx === 0 ? ' active' : '');
        card.dataset.index = idx;
        card.innerHTML = `
          ${cardSVG(idx)}
          <div class="card-content">
            <div class="icon-box"><i class="${p.icon}"></i></div>
            <div class="card-title">${p.title}</div>
            <div class="card-desc">${p.desc}</div>
            <div class="card-bottom">
              <div class="card-divider"></div>
              <div class="card-phase">${p.phase}</div>
            </div>
          </div>`;
        container.appendChild(card);
      });

      const cards = document.querySelectorAll('.card');
      const fill = document.getElementById('timelineFill');
      const dots = document.querySelectorAll('.timeline-dot');
      const section = document.getElementById('scrollSection');

      function updateProgress() {
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight;
        let progress = -rect.top / total;
        progress = Math.max(0, Math.min(1, progress));

        fill.style.width = (progress * 100) + '%';

        const activeIdx = Math.min(3, Math.floor(progress * 4));
        cards.forEach((c, i) => c.classList.toggle('active', i === activeIdx));
        dots.forEach((d, i) => d.classList.toggle('filled', progress >= i / 3 - 0.001));
      }

      window.addEventListener('scroll', updateProgress, { passive: true });
      window.addEventListener('resize', updateProgress);
      updateProgress();
    }

    // ===== Featured Work Rail =====
    const projectsData = [
      {
        tag: "UX Strategy · Branding",
        stat: "9+",
        label: "years experience",
        name: "Strategic Design",
        desc: "Enterprise applications and digital experiences built with purpose-driven methodology.",
        grad: "linear-gradient(135deg, #1a2a1f, #0f1814)"
      },
      {
        tag: "Frontend · Architecture",
        stat: "50+",
        label: "projects delivered",
        name: "High-Performance Code",
        desc: "Scalable frontend architectures that balance aesthetics with technical excellence.",
        grad: "linear-gradient(135deg, #1a1f2a, #0f1218)"
      },
      {
        tag: "Design Systems · UI",
        stat: "100%",
        label: "design-to-code fidelity",
        name: "Design Systems",
        desc: "Comprehensive design systems ensuring consistency across all digital touchpoints.",
        grad: "linear-gradient(135deg, #2a1a1f, #1a0f14)"
      },
      {
        tag: "Brand Identity · Collateral",
        stat: "∞",
        label: "scalability",
        name: "Brand Strategy",
        desc: "Complete brand identities from visual systems to marketing collateral.",
        grad: "linear-gradient(135deg, #1f2a1a, #14180f)"
      },
      {
        tag: "Mobile · Responsive",
        stat: "A+",
        label: "quality standards",
        name: "Mobile First",
        desc: "Mobile-first design approaches that work seamlessly across all devices.",
        grad: "linear-gradient(135deg, #2a1f1a, #18140f)"
      },
      {
        tag: "Data-Driven · Impact",
        stat: "↑",
        label: "conversion focus",
        name: "Conversion Optimization",
        desc: "User-centered experiences that drive engagement and measurable business results.",
        grad: "linear-gradient(135deg, #1a1f2a, #0d1014)"
      }
    ];

    const rail = document.getElementById('rail');
    const counter = document.getElementById('counter');
    const trackFill = document.getElementById('trackFill');
    const railWrap = document.getElementById('railWrap');

    if (rail) {
      projectsData.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'rail-card';
        card.innerHTML = `
          <div class="rail-card-media" style="background:${p.grad}">
            <span class="rail-card-tag">${p.tag}</span>
            <span class="rail-card-index">0${i + 1}</span>
            <div class="rail-card-stat"><div>${p.stat}</div><span class="rail-card-label">${p.label}</span></div>
            <div class="rail-card-bottom">
              <div class="rail-card-name">${p.name}</div>
              <p class="rail-card-desc">${p.desc}</p>
              <a class="rail-card-link" href="#">View project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
          </div>`;
        rail.appendChild(card);
      });

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
      const total = projectsData.length;

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
            duration: 0.9
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
