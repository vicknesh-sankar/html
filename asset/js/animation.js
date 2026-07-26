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
        icon: 'bi-cpu'
      },
      {
        title: "Bridging Code and Creativity",
        phase: "02",
        desc: "I kicked off my career at the intersection of design and development. Driven by a passion to build things that actually matter, I combined front-end code with clean UI design. This dual perspective allowed me to build scalable, high-performance web interfaces that look great and function seamlessly.",
        icon: 'bi-palette'
      },
      {
        title: "Shaping Brand Identities",
        phase: "03",
        desc: "Design doesn't live in a vacuum. As a creative partner across print and digital implementations, I expanded into visual identity and brand strategy. I help brands tell a cohesive story — ensuring every digital touchpoint and physical collateral piece feels intentional and unified.",
        icon: 'bi-star'
      },
      {
        title: "Solving Complex Problems",
        phase: "04",
        desc: "Today, my focus centers on solving complex product challenges through user-centered UX methodologies. By leveraging A/B testing, typography, color theory, and deep user research, I create data-backed digital experiences that don't just delight users — they actively drive engagement, conversion, and business growth.",
        icon: 'bi-lightbulb'
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
            <div class="icon-box"><i class="bi ${p.icon}"></i></div>
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
            <div class="rail-card-stat">${p.stat}<span class="rail-card-label">${p.label}</span></div>
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

      // Drag to scroll
      const dragHint = document.querySelector('.drag-hint');
      let isDown = false, startX, scrollLeft;

      railWrap.addEventListener('mouseenter', () => {
        dragHint?.classList.add('visible');
      });

      railWrap.addEventListener('mouseleave', () => {
        dragHint?.classList.remove('visible');
      });

      railWrap.addEventListener('mousemove', (e) => {
        if (!isDown && dragHint && e.target.closest('.rail') === rail) {
          const rect = railWrap.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          dragHint.style.left = (x - 40) + 'px';
          dragHint.style.top = (y - 20) + 'px';
        }
      });

      rail.addEventListener('mousedown', (e) => {
        isDown = true;
        railWrap.classList.add('dragging');
        dragHint?.classList.remove('visible');
        startX = e.pageX;
        scrollLeft = rail.scrollLeft;
      });

      document.addEventListener('mouseup', () => {
        isDown = false;
        railWrap.classList.remove('dragging');
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const dx = e.pageX - startX;
        rail.scrollLeft = scrollLeft - dx;
      });

      // Counter + progress track
      const total = projectsData.length;

      function updateCounter() {
        const cardWidth = rail.children[0]?.offsetWidth + 24 || 404;
        const idx = Math.min(total - 1, Math.round(rail.scrollLeft / cardWidth));
        counter.textContent = String(idx + 1).padStart(2, '0') + ' / 0' + total;
        trackFill.style.width = ((idx + 1) / total * 100) + '%';
      }

      rail.addEventListener('scroll', updateCounter, { passive: true });
      updateCounter();
    }