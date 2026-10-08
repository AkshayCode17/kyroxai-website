(() => {
  const header = document.getElementById('stn-header');
  const body = document.body;
  const menuBtn = document.querySelector('.stn-hamburger');
  const hero = document.querySelector('.home-hero');
  const heroVideo = hero?.querySelector('.home-hero__video');
  const productsItem = document.querySelector('.has-mega-menu');
  const productsLink = productsItem?.querySelector(':scope > a');
  const megaMenu = document.getElementById('stn-mega-menu');

  if (heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.pause();
  }

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  const closeMenu = () => {
    body.classList.remove('kx-menu-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuBtn?.addEventListener('click', () => {
    const open = body.classList.toggle('kx-menu-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.stn-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  if (productsItem && productsLink && megaMenu) {
    const productIds = [
      'product-inthings',
      'product-beacoder',
      'product-zenix',
      'product-vlook',
      'product-fams',
      'product-scm'
    ];
    const cards = document.querySelectorAll('.core-services__card');
    cards.forEach((card, index) => {
      if (productIds[index]) card.id = productIds[index];
    });

    const tabs = [...megaMenu.querySelectorAll('.mega-tab')];
    const panels = [...megaMenu.querySelectorAll('.mega-panel')];
    let closeTimer;

    const activateTab = tab => {
      const targetId = tab.dataset.megaTarget;
      if (!targetId) return;

      tabs.forEach(item => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });

      panels.forEach(panel => {
        const active = panel.id === targetId;
        panel.classList.toggle('is-active', active);
        panel.setAttribute('aria-hidden', String(!active));
      });
    };

    const openMega = () => {
      window.clearTimeout(closeTimer);
      megaMenu.classList.add('is-open');
      megaMenu.setAttribute('aria-hidden', 'false');
      productsItem.classList.add('mega-is-open');
      productsLink.setAttribute('aria-expanded', 'true');
    };

    const closeMega = () => {
      window.clearTimeout(closeTimer);
      megaMenu.classList.remove('is-open');
      megaMenu.setAttribute('aria-hidden', 'true');
      productsItem.classList.remove('mega-is-open');
      productsLink.setAttribute('aria-expanded', 'false');
    };

    const scheduleClose = () => {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        const focusInside = productsItem.contains(document.activeElement)
          || megaMenu.contains(document.activeElement);

        if (!productsItem.matches(':hover') && !megaMenu.matches(':hover') && !focusInside) {
          closeMega();
        }
      }, 120);
    };

    productsItem.addEventListener('mouseenter', openMega);
    productsItem.addEventListener('mouseleave', scheduleClose);
    productsLink.addEventListener('focus', openMega);
    megaMenu.addEventListener('mouseenter', openMega);
    megaMenu.addEventListener('mouseleave', scheduleClose);
    megaMenu.addEventListener('focusin', openMega);
    megaMenu.addEventListener('focusout', scheduleClose);

    productsLink.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        openMega();
        tabs[0]?.focus();
      }
    });

    tabs.forEach((tab, index) => {
      tab.addEventListener('mouseenter', () => activateTab(tab));
      tab.addEventListener('focus', () => activateTab(tab));
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', event => {
        let nextIndex = index;
        if (event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
        else if (event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;
        else return;

        event.preventDefault();
        tabs[nextIndex].focus();
      });
    });

    megaMenu.querySelectorAll('.mega-panel__link').forEach(link => {
      link.addEventListener('click', closeMega);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && megaMenu.classList.contains('is-open')) {
        productsLink.focus();
        closeMega();
      }
    });

    document.addEventListener('click', event => {
      if (!productsItem.contains(event.target) && !megaMenu.contains(event.target)) {
        closeMega();
      }
    });
  }

  if (hero) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => hero.classList.add('hero-animated'));
    });
  }

  const revealTargets = document.querySelectorAll(
    '.about-section__header, .about-card, #partners, .core-services__header, ' +
    '.core-services__card, .stats-slider, ' +
    '.kx-contact__panel, .kx-contact__form'
  );

  revealTargets.forEach(target => target.classList.add('kx-reveal'));
  document.documentElement.classList.add('kx-motion-ready');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealTargets.forEach(target => revealObserver.observe(target));
  } else {
    revealTargets.forEach(target => target.classList.add('is-visible'));
  }

  const counters = [...document.querySelectorAll('#why-kyroxai .stats-section__value')];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (counters.length && !prefersReducedMotion) {
    const parseStat = raw => {
      let text = raw.trim();
      let prefix = '';
      let suffix = '';
      let negative = false;

      if (text.startsWith('-')) {
        negative = true;
        text = text.slice(1);
      } else if (text.startsWith('+')) {
        prefix = '+';
        text = text.slice(1);
      }

      let index = text.length - 1;
      while (index >= 0 && !/[\d.]/.test(text[index])) {
        suffix = text[index] + suffix;
        index -= 1;
      }

      let numberText = text.slice(0, index + 1);
      const lowerNumber = numberText.toLowerCase();
      if (lowerNumber.endsWith('k') || lowerNumber.endsWith('m')) {
        suffix = numberText.slice(-1) + suffix;
        numberText = numberText.slice(0, -1);
      }

      const decimals = numberText.includes('.') ? numberText.split('.')[1].length : 0;
      if (negative) prefix = `-${prefix}`;

      return {
        prefix,
        suffix,
        number: Number.parseFloat(numberText) || 0,
        decimals
      };
    };

    const animateCounter = (counter, parsed) => {
      const duration = 1800;
      let startTime;

      const update = now => {
        if (startTime === undefined) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = parsed.number * easedProgress;
        counter.textContent = `${parsed.prefix}${currentValue.toFixed(parsed.decimals)}${parsed.suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = `${parsed.prefix}${parsed.number.toFixed(parsed.decimals)}${parsed.suffix}`;
        }
      };

      requestAnimationFrame(update);
    };

    const statValues = counters.map(counter => {
      const parsed = parseStat(counter.textContent);
      counter.textContent = `${parsed.prefix}0${parsed.suffix}`;
      return { counter, parsed };
    });

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const stat = statValues.find(item => item.counter === entry.target);
          if (stat) animateCounter(stat.counter, stat.parsed);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.3 });

      statValues.forEach(({ counter }) => counterObserver.observe(counter));
    } else {
      statValues.forEach(({ counter, parsed }) => animateCounter(counter, parsed));
    }
  }

  const aboutSection = document.querySelector('.about-section');
  if (aboutSection) {
    const finishAboutEntrance = () => aboutSection.classList.add('about-gsap-done');

    if ('IntersectionObserver' in window) {
      const aboutObserver = new IntersectionObserver((entries, observer) => {
        if (entries.some(entry => entry.isIntersecting)) {
          finishAboutEntrance();
          observer.disconnect();
        }
      }, { threshold: 0.05 });

      aboutObserver.observe(aboutSection);
    } else {
      finishAboutEntrance();
    }
  }

  const slides = [...document.querySelectorAll('.stats-slider__slide')];
  if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let activeIndex = 0;
    window.setInterval(() => {
      slides[activeIndex].classList.remove('is-active');
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex].classList.add('is-active');
    }, 5000);
  }

  document.querySelector('[data-contact-form]')?.addEventListener('submit', event => {
    event.preventDefault();
    const status = event.currentTarget.querySelector('[data-form-status]');
    if (status) {
      status.textContent = 'Thanks — this demo form is ready to be connected to your email/form endpoint.';
    }
    event.currentTarget.reset();
  });
})();