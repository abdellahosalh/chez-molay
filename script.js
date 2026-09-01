(function() {
    'use strict';

    const glow = document.getElementById('cursorGlow');
    document.addEventListener('mousemove', function(e) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    const bg = document.getElementById('heroBg');
    if (bg) setTimeout(function() { bg.classList.add('ready'); }, 100);

    const nav = document.getElementById('nav');
    const bookBar = document.getElementById('bookBar');
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const y = window.scrollY;
                if (nav) nav.classList.toggle('solid', y > 50);
                if (bookBar) bookBar.classList.toggle('show', y > 600);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    const burger = document.getElementById('burger');
    const mobMenu = document.getElementById('mob-menu');
    if (burger && mobMenu) {
        burger.addEventListener('click', function() {
            const open = mobMenu.classList.toggle('open');
            burger.classList.toggle('open', open);
            burger.setAttribute('aria-expanded', open.toString());
        });
        mobMenu.querySelectorAll('a').forEach(function(a) {
            a.addEventListener('click', function() {
                mobMenu.classList.remove('open');
                burger.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && mobMenu.classList.contains('open')) {
                mobMenu.classList.remove('open');
                burger.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) { e.target.classList.add('in');
                observer.unobserve(e.target); }
        });
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.r').forEach(function(el) { observer.observe(el); });

    const tr = {
        en: {
            eyebrow: 'HIGH ATLAS · 2,119M ALTITUDE · 9 BOUTIQUE ROOMS',
            h1: '<span class="line"><span>Where <em>silence</em></span></span><span class="line"><span>speaks &amp; <em>stars</em></span></span><span class="line"><span>feel <em>close</em></span></span>',
            p: 'Gîte NO€E chez Moulay — timeless Amazigh luxury at the heart of Imilchil. Nine handcrafted rooms cradled by the High Atlas Mountains.',
            book: 'Secure Your Stay →',
            rooms: 'Explore Rooms',
            nav: 'Reserve Now',
        },
        fr: {
            eyebrow: 'HAUT ATLAS · 2 119 M · 9 CHAMBRES BOUTIQUE',
            h1: '<span class="line"><span>Là où le <em>silence</em></span></span><span class="line"><span>parle &amp; les <em>étoiles</em></span></span><span class="line"><span>semblent <em>proches</em></span></span>',
            p: 'Gîte NO€E chez Moulay — luxe amazigh intemporel au cœur d\'Imilchil. Neuf chambres artisanales bercées par le Haut Atlas.',
            book: 'Réserver →',
            rooms: 'Voir les chambres',
            nav: 'Réserver',
        }
    };
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const lang = btn.dataset.lang;
            document.querySelectorAll('.lang-btn').forEach(function(b) {
                b.classList.toggle('on', b.dataset.lang === lang);
                b.setAttribute('aria-pressed', (b.dataset.lang === lang).toString());
            });
            const t = tr[lang];
            if (!t) return;
            const eyebrow = document.getElementById('hero-eyebrow');
            const h1 = document.getElementById('hero-h1');
            const p = document.getElementById('hero-p');
            const book = document.getElementById('hero-book');
            const rooms = document.getElementById('hero-rooms');
            const reserve = document.getElementById('nav-reserve');
            if (eyebrow) eyebrow.textContent = t.eyebrow;
            if (h1) h1.innerHTML = t.h1;
            if (p) p.textContent = t.p;
            if (book) book.textContent = t.book;
            if (rooms) rooms.textContent = t.rooms;
            if (reserve) reserve.textContent = t.nav;
            document.documentElement.lang = lang;
        });
    });

    document.querySelectorAll('.btn-room').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const roomVal = btn.dataset.room || '';
            const select = document.getElementById('f-room');
            if (!select) return;
            const kw = roomVal.split(' ')[0].toLowerCase();
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].text.toLowerCase().includes(kw)) { select.selectedIndex = i; break; }
            }
            const booking = document.getElementById('booking');
            if (booking) {
                booking.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(function() { const name = document.getElementById('f-name'); if (name) name.focus(); }, 600);
            }
        });
    });

    const ci = document.getElementById('f-ci');
    const co = document.getElementById('f-co');
    if (ci) {
        ci.min = new Date().toISOString().split('T')[0];
        ci.addEventListener('change', function() {
            co.min = ci.value;
            if (co.value && co.value < ci.value) co.value = '';
        });
    }

    const form = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('f-submit');
    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let valid = true;
            form.querySelectorAll('[required]').forEach(function(f) {
                const ok = f.value.trim() !== '';
                f.style.borderColor = ok ? '' : '#E05A5A';
                f.setAttribute('aria-invalid', (!ok).toString());
                if (!ok) valid = false;
            });
            if (!valid) { const inv = form.querySelector('[aria-invalid="true"]'); if (inv) inv.focus(); return; }

            submitBtn.textContent = '✓ Request received — we reply within 12 hours';
            submitBtn.style.background = 'linear-gradient(135deg, #3A7A52, #4A9A62)';
            submitBtn.disabled = true;

            const name = document.getElementById('f-name');
            const lname = document.getElementById('l-name');
            const email = document.getElementById('f-email');
            const room = document.getElementById('f-room');
            const guests = document.getElementById('f-guests');
            const req = document.getElementById('f-req');

            const data = {
                name: (name ? name.value : '') + ' ' + (lname ? lname.value : ''),
                email: email ? email.value : '',
                ci: ci ? ci.value : '',
                co: co ? co.value : '',
                room: room ? room.options[room.selectedIndex].text : '',
                guests: guests ? guests.value : '',
                req: req ? req.value || 'None' : 'None'
            };
            const msg = encodeURIComponent('Reservation Request — Gîte NO€E\n\nName: ' + data.name + '\nEmail: ' + data
                .email + '\nCheck-in: ' + data.ci + '\nCheck-out: ' + data.co + '\nRoom: ' + data.room +
                '\nGuests: ' + data.guests + '\nRequests: ' + data.req);
            setTimeout(function() { window.open('https://wa.me/212709085856?text=' + msg, '_blank'); }, 1500);
        });
        form.querySelectorAll('.form-control').forEach(function(f) {
            f.addEventListener('input', function() { f.style.borderColor = '';
                f.removeAttribute('aria-invalid'); });
        });
    }
})();
