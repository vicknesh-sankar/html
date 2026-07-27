(function () {
  'use strict';

  const panelPath = 'M 12.25 0.25 L 277.75 0.25 L 289.75 12.25 L 289.75 75.5 L 281.75 83.5 L 281.75 227.5 L 289.75 235.5 L 289.75 298.75 L 277.75 310.75 L 12.25 310.75 L 0.25 298.75 L 0.25 12.25 L 12.25 0.25';

  const journeyPhases = [
    {
      title: 'The Technical Foundation',
      phase: '01',
      desc: "Degree in hand, I quickly realized that textbook theory only takes you so far. My true education began when I started applying technical logic to real-world problems. Understanding the underlying technology behind every interface gave me a unique perspective on what's visually striking — and technically doable.",
      icon: 'iconpack-chip'
    },
    {
      title: 'Bridging Code and Creativity',
      phase: '02',
      desc: 'I kicked off my career at the intersection of design and development. Driven by a passion to build things that actually matter, I combined front-end code with clean UI design. This dual perspective allowed me to build scalable, high-performance web interfaces that look great and function seamlessly.',
      icon: 'iconpack-design-two'
    },
    {
      title: 'Shaping Brand Identities',
      phase: '03',
      desc: "Design doesn't live in a vacuum. As a creative partner across print and digital implementations, I expanded into visual identity and brand strategy. I help brands tell a cohesive story — ensuring every digital touchpoint and physical collateral piece feels intentional and unified.",
      icon: 'iconpack-brand-one'
    },
    {
      title: 'Solving Complex Problems',
      phase: '04',
      desc: "Today, my focus centers on solving complex product challenges through user-centered UX methodologies. By leveraging A/B testing, typography, color theory, and deep user research, I create data-backed digital experiences that don't just delight users — they actively drive engagement, conversion, and business growth.",
      icon: 'iconpack-problem-slove'
    }
  ];

  const featuredProjects = [
    {
      tag: 'UX Strategy · Branding',
      stat: '9+',
      label: 'years experience',
      name: 'Strategic Design',
      desc: 'Enterprise applications and digital experiences built with purpose-driven methodology.',
      grad: 'linear-gradient(135deg, #1a2a1f, #0f1814)'
    },
    {
      tag: 'Frontend · Architecture',
      stat: '50+',
      label: 'projects delivered',
      name: 'High-Performance Code',
      desc: 'Scalable frontend architectures that balance aesthetics with technical excellence.',
      grad: 'linear-gradient(135deg, #1a1f2a, #0f1218)'
    },
    {
      tag: 'Design Systems · UI',
      stat: '100%',
      label: 'design-to-code fidelity',
      name: 'Design Systems',
      desc: 'Comprehensive design systems ensuring consistency across all digital touchpoints.',
      grad: 'linear-gradient(135deg, #2a1a1f, #1a0f14)'
    },
    {
      tag: 'Brand Identity · Collateral',
      stat: '∞',
      label: 'scalability',
      name: 'Brand Strategy',
      desc: 'Complete brand identities from visual systems to marketing collateral.',
      grad: 'linear-gradient(135deg, #1f2a1a, #14180f)'
    },
    {
      tag: 'Mobile · Responsive',
      stat: 'A+',
      label: 'quality standards',
      name: 'Mobile First',
      desc: 'Mobile-first design approaches that work seamlessly across all devices.',
      grad: 'linear-gradient(135deg, #2a1f1a, #18140f)'
    },
    {
      tag: 'Data-Driven · Impact',
      stat: '↑',
      label: 'conversion focus',
      name: 'Conversion Optimization',
      desc: 'User-centered experiences that drive engagement and measurable business results.',
      grad: 'linear-gradient(135deg, #1a1f2a, #0d1014)'
    }
  ];

  function createTimelinePanel(index) {
    const filterId = `g${index}`;

    return `
      <svg class="card-svg" viewBox="0 0 290 311" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="soft-${filterId}" x="-120%" y="-120%" width="340%" height="340%" color-interpolation-filters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="a"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b"/>
            <feMerge><feMergeNode in="a"/><feMergeNode in="b"/></feMerge>
          </filter>
          <filter id="crisp-${filterId}" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge><feMergeNode in="blur"/></feMerge>
          </filter>
        </defs>
        <path class="bg" d="${panelPath}"></path>
        <g class="glow-layer">
          <path d="${panelPath}" fill="none" stroke="var(--indigo)" stroke-width="8.5" opacity="0.35" filter="url(#soft-${filterId})"></path>
          <path d="${panelPath}" fill="none" stroke="var(--pink)" stroke-width="24.5" opacity="0.25" filter="url(#crisp-${filterId})"></path>
        </g>
        <path class="crisp" d="${panelPath}"></path>
      </svg>`;
  }

  function renderJourneyCards() {
    const container = document.getElementById('cards');
    if (!container) return;

    journeyPhases.forEach((phase, index) => {
      const card = document.createElement('div');
      card.className = `card${index === 0 ? ' active' : ''}`;
      card.dataset.index = index;
      card.innerHTML = `
        ${createTimelinePanel(index)}
        <div class="card-content">
          <div class="icon-box"><i class="${phase.icon}" aria-hidden="true"></i></div>
          <div class="card-title">${phase.title}</div>
          <div class="card-desc">${phase.desc}</div>
          <div class="card-bottom">
            <div class="card-divider"></div>
            <div class="card-phase">${phase.phase}</div>
          </div>
        </div>`;
      container.appendChild(card);
    });
  }

  function renderFeaturedProjects() {
    const rail = document.getElementById('rail');
    if (!rail) return;

    featuredProjects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'rail-card';
      card.innerHTML = `
        <div class="rail-card-media" style="background:${project.grad}">
          <span class="rail-card-tag">${project.tag}</span>
          <span class="rail-card-index">${String(index + 1).padStart(2, '0')}</span>
          <div class="rail-card-stat">
            <div>${project.stat}</div>
            <span class="rail-card-label">${project.label}</span>
          </div>
          <div class="rail-card-bottom">
            <div class="rail-card-name">${project.name}</div>
            <p class="rail-card-desc">${project.desc}</p>
            <a class="rail-card-link" href="#">
              View project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </a>
          </div>
        </div>`;
      rail.appendChild(card);
    });
  }

  renderJourneyCards();
  renderFeaturedProjects();
}());
