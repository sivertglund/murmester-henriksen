/* ============================================================
   Murmester Henriksen AS — interaction script
   - Sticky nav style toggle
   - Mobile menu
   - Scroll-driven hero (parallax/scale on stacked layers)
   - Reveal-on-scroll
   - Footer year
   - Form: opens mailto with prefilled message
   ============================================================ */

(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Live opening-hours status pill ----------
     Mon–Thu 07:00–15:30 · Fri 07:00–13:00 · Sat–Sun closed.
     Updates immediately, then re-checks every minute. */
  const statusEl = $('#navStatus');
  if (statusEl) {
    const textEl = statusEl.querySelector('.nav__status-text');
    const HOURS = {
      // 0=Sun, 1=Mon, ... 6=Sat
      1: [7*60, 15*60+30],
      2: [7*60, 15*60+30],
      3: [7*60, 15*60+30],
      4: [7*60, 15*60+30],
      5: [7*60, 13*60],
    };
    const fmt = (mins) => {
      const h = Math.floor(mins/60), m = mins%60;
      return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    };
    const update = () => {
      const now = new Date();
      const day = now.getDay();
      const mins = now.getHours()*60 + now.getMinutes();
      const today = HOURS[day];
      let state, label;
      if (today && mins >= today[0] && mins < today[1]) {
        state = 'open';
        label = `Åpent nå · til ${fmt(today[1])}`;
      } else {
        // find next open day
        state = 'closed';
        for (let i = 1; i <= 7; i++) {
          const d = (day + i) % 7;
          if (HOURS[d]) {
            const dayName = i === 1 ? 'i morgen' : ['søndag','mandag','tirsdag','onsdag','torsdag','fredag','lørdag'][d];
            label = `Stengt · åpner ${dayName} kl ${fmt(HOURS[d][0])}`;
            break;
          }
        }
      }
      statusEl.dataset.state = state;
      if (textEl) textEl.textContent = label;
    };
    update();
    setInterval(update, 60_000);
  }

  /* ---------- Nav: solid background after hero ---------- */
  const nav = $('#nav');
  const heroEl = $('#hero');
  const onScrollNav = () => {
    if (!heroEl) {
      // Pages without a hero get solid nav from the top.
      nav.classList.add('is-solid');
      return;
    }
    const rect = heroEl.getBoundingClientRect();
    if (rect.bottom <= 80) nav.classList.add('is-solid');
    else nav.classList.remove('is-solid');
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  const reveals = document.querySelectorAll(
    '.founder__kicker, .founder__portrait, .founder__copy, .chip, ' +
    '.about__copy, .about__facts, ' +
    '.contact__copy, .contact__form, ' +
    '.areas__inner > *, ' +
    '.testimonials__head, .quote, ' +
    '.services-grid__head, .svc-card, ' +
    '.subhero__inner, .article__main > *, .article__aside, ' +
    '.projects__item'
  );
  reveals.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings within a grid for a "pour" effect
    if (el.matches('.chip, .quote, .svc-card, .projects__item')) {
      const parent = el.parentElement;
      const idx = Array.from(parent.children).indexOf(el);
      el.style.setProperty('--reveal-delay', `${Math.min(idx, 5) * 70}ms`);
    }
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));

    /* Animation-only triggers — apply .is-in without the fade-up reveal */
    document.querySelectorAll('.founder__bricks').forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
    document.querySelectorAll('.founder__bricks').forEach(el => el.classList.add('is-in'));
  }


  /* ---------- Hero video ----------
     Autoplays forward in a loop. Handwriting reveal is CSS-animated. */
  const video = $('#heroVideo');
  if (video) {
    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener('canplay', tryPlay, { once: true });
  }

  /* ---------- Marquee: autonomous infinite drift ----------
     Hver rad scroller selvstendig (CSS-keyframes). Vi dupliserer figurene
     i hvert track så animasjonen looper sømløst (translateX(-50%) lander
     på en identisk kopi av den første halvdelen).
  */
  document.querySelectorAll('.marquee__track').forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- Contact form: send via mailto ---------- */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const navn     = (data.get('navn') || '').toString().trim();
      const telefon  = (data.get('telefon') || '').toString().trim();
      const epost    = (data.get('epost') || '').toString().trim();
      const adresse  = (data.get('adresse') || '').toString().trim();
      const tjeneste = (data.get('tjeneste') || '').toString().trim();
      const melding  = (data.get('melding') || '').toString().trim();
      const samtykke = data.get('samtykke') ? 'Ja' : 'Nei';

      if (!navn || !telefon || !epost || !adresse || !melding) {
        alert('Vennligst fyll inn alle påkrevde felter.');
        return;
      }

      const subject = `Forespørsel om befaring – ${navn}`;
      const body =
`Hei Murmester Henriksen,

Navn: ${navn}
Telefon: ${telefon}
E-post: ${epost}
Adresse og sted: ${adresse}
Tjeneste: ${tjeneste}
Ønsker e-postkontakt: ${samtykke}

${melding}
`;

      const mail = `mailto:post@murmesterhenriksen.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mail;
    });
  }
})();
