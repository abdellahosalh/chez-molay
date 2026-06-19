(function(){
  'use strict';

  /* — Cursor glow — */
  const glow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  /* — Hero bg ken-burns — */
  const bg = document.getElementById('heroBg');
  setTimeout(() => bg.classList.add('ready'), 100);

  /* — Navbar solid on scroll — */
  const nav = document.getElementById('nav');
  const bookBar = document.getElementById('bookBar');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        nav.classList.toggle('solid', y > 50);
        bookBar.classList.toggle('show', y > 600);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* — Burger menu — */
  const burger = document.getElementById('burger');
  const mobMenu = document.getElementById('mob-menu');
  burger.addEventListener('click', () => {
    const open = mobMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open.toString());
  });
  mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && mobMenu.classList.contains('open')) {
      mobMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* — Reveal on scroll — */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.r').forEach(el => observer.observe(el));

  /* — Language switcher — */
  const tr = {
    en: {
      eyebrow: 'HIGH ATLAS · 2,119M ALTITUDE · 9 BOUTIQUE ROOMS',
      h1: '<span class="line"><span>Where <em>silence</em></span></span><span class="line"><span>speaks &amp; <em>stars</em></span></span><span class="line"><span>feel <em>close</em></span></span>',
      p: 'Gîte NOMADE chez Moulay — timeless Amazigh luxury at the heart of Imilchil. Nine handcrafted rooms cradled by the High Atlas Mountains.',
      book: 'Secure Your Stay →',
      rooms: 'Explore Rooms',
      nav: 'Reserve Now',
    },
    fr: {
      eyebrow: 'HAUT ATLAS · 2 119 M · 9 CHAMBRES BOUTIQUE',
      h1: '<span class="line"><span>Là où le <em>silence</em></span></span><span class="line"><span>parle &amp; les <em>étoiles</em></span></span><span class="line"><span>semblent <em>proches</em></span></span>',
      p: 'Gîte NOMADE chez Moulay — luxe amazigh intemporel au cœur d\'Imilchil. Neuf chambres artisanales bercées par le Haut Atlas.',
      book: 'Réserver →',
      rooms: 'Voir les chambres',
      nav: 'Réserver',
    }
  };
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('on', b.dataset.lang === lang);
        b.setAttribute('aria-pressed', (b.dataset.lang === lang).toString());
      });
      const t = tr[lang];
      if (!t) return;
      document.getElementById('hero-eyebrow').textContent = t.eyebrow;
      document.getElementById('hero-h1').innerHTML = t.h1;
      document.getElementById('hero-p').textContent = t.p;
      document.getElementById('hero-book').textContent = t.book;
      document.getElementById('hero-rooms').textContent = t.rooms;
      document.getElementById('nav-reserve').textContent = t.nav;
      document.documentElement.lang = lang;
    });
  });

  /* — Room card → preselect booking — */
  document.querySelectorAll('.btn-room').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const roomVal = btn.dataset.room || '';
      const select = document.getElementById('f-room');
      const kw = roomVal.split(' ')[0].toLowerCase();
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.toLowerCase().includes(kw)) { select.selectedIndex = i; break; }
      }
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => document.getElementById('f-name').focus(), 600);
    });
  });

  /* — Date validation — */
  const ci = document.getElementById('f-ci');
  const co = document.getElementById('f-co');
  if (ci) {
    ci.min = new Date().toISOString().split('T')[0];
    ci.addEventListener('change', () => {
      co.min = ci.value;
      if (co.value && co.value < ci.value) co.value = '';
    });
  }

  /* — Form submit — */
  const form = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('f-submit');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(f => {
      const ok = f.value.trim() !== '';
      f.style.borderColor = ok ? '' : '#E05A5A';
      f.setAttribute('aria-invalid', (!ok).toString());
      if (!ok) valid = false;
    });
    if (!valid) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }

    submitBtn.textContent = '✓ Request received — we reply within 12 hours';
    submitBtn.style.background = 'linear-gradient(135deg, #3A7A52, #4A9A62)';
    submitBtn.disabled = true;

    const data = {
      name: `${document.getElementById('f-name').value} ${document.getElementById('l-name').value}`,
      email: document.getElementById('f-email').value,
      ci: ci.value, co: co.value,
      room: document.getElementById('f-room').options[document.getElementById('f-room').selectedIndex].text,
      guests: document.getElementById('f-guests').value,
      req: document.getElementById('f-req').value || 'None'
    };
    const msg = encodeURIComponent(`Reservation Request — Gîte NOMADE\n\nName: ${data.name}\nEmail: ${data.email}\nCheck-in: ${data.ci}\nCheck-out: ${data.co}\nRoom: ${data.room}\nGuests: ${data.guests}\nRequests: ${data.req}`);
    setTimeout(() => window.open(`https://wa.me/212709085856?text=${msg}`, '_blank'), 1500);
  });
  form.querySelectorAll('.form-control').forEach(f => {
    f.addEventListener('input', () => { f.style.borderColor = ''; f.removeAttribute('aria-invalid'); });
  });

})();
