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


  /* ---------- Scroll-driven hero ----------
     The .hero section is taller than the viewport. As the user scrolls, we
     map scroll progress (0 → 1) to:
       • video.currentTime = (1 - p) * duration  — plays REVERSED (wall opens)
       • CSS custom property --reveal on the brand text — drawn left-to-right
         like marker ink in real time
       • opacity fade for ancillary copy as the title fully appears
  */
  const hero = $('#hero');
  const video = $('#heroVideo');
  const writeRoot = $('.hero__write');
  const writeText = $('#heroWriteText');
  const pen       = $('#heroPen');
  const heroWelcome = $('.hero__welcome');
  const heroSignature = $('.hero__signature');

  if (hero && video) {
    let duration = 0;
    let canScrub = false;
    let progressTarget = 0;
    let progressCurrent = 0;
    let ticking = false;

    /* ----- Hero video scroll mapping -----
       Source video plays the wall coming apart top-down. Reversed playback
       from 55% → 0% gives "litt over halve muren intakt" at the top of scroll
       and the wall builds upward to complete by the bottom of the hero. */
    const HERO_START_FRAC = 0.55;
    const HERO_END_FRAC   = 0.0;

    const setDuration = () => {
      if (isFinite(video.duration) && video.duration > 0) {
        duration = video.duration;
      }
    };
    const showInitialFrame = () => {
      if (duration) {
        const t0 = Math.max(0, Math.min(duration - 0.001, HERO_START_FRAC * duration));
        try { video.currentTime = t0; } catch (_) {}
      }
    };

    video.addEventListener('loadedmetadata', setDuration);
    video.addEventListener('durationchange', setDuration);
    // canplay fires when frame data is available — *now* scrubbing works visually
    const onCanPlay = () => {
      setDuration();
      canScrub = true;
      // Force the decode pipeline to wake up — some browsers (Chrome, Safari)
      // won't render new frames after currentTime changes unless play() has
      // been called at least once.
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => video.pause()).catch(() => {});
      } else {
        video.pause();
      }
      showInitialFrame();
      onScroll();
    };
    video.addEventListener('canplay', onCanPlay, { once: true });
    video.addEventListener('canplaythrough', () => { canScrub = true; }, { once: true });
    // Force-buffer the whole video so seeks land on cached frames
    try { video.load(); } catch (_) {}
    if (video.readyState >= 2) onCanPlay();

    // Map scroll → reveal range — bias so writing starts a bit late and finishes a bit early
    const REVEAL_START = 0.06;
    const REVEAL_END   = 0.92;

    const applyProgress = (p) => {
      if (canScrub && duration) {
        const raw = (HERO_START_FRAC + p * (HERO_END_FRAC - HERO_START_FRAC)) * duration;
        const t = Math.max(0, Math.min(duration - 0.001, raw));
        // Tighter threshold = more frame updates = smoother scrub
        if (Math.abs(video.currentTime - t) > 0.008) {
          try { video.currentTime = t; } catch (_) {}
        }
      }

      // Handwriting reveal (0 → 1)
      const r = Math.max(0, Math.min(1,
        (p - REVEAL_START) / (REVEAL_END - REVEAL_START)
      ));
      // Set --reveal on the H1 root so it's inherited by the text mask
       // AND the marker-underline path (drawn in sync with the text).
      if (writeRoot) {
        writeRoot.style.setProperty('--reveal', r.toFixed(4));
      }
      if (pen && writeText) {
        const w = writeText.offsetWidth;
        const x = r * w;
        pen.style.transform = `translate3d(${x}px, 0, 0)`;
        // Pen visible while drawing, fading at the very ends
        const edge = Math.min(r * 8, (1 - r) * 8, 1);
        pen.style.opacity = String(r > 0.001 && r < 0.999 ? edge : 0);
      }

      // Welcome copy fades toward the end of the hero scroll. Buttons stay solid.
      if (heroWelcome) heroWelcome.style.opacity = String(1 - Math.max(0, p - 0.55) * 2.2);

      // Signature appears once the handwritten title has finished drawing.
      if (heroSignature) heroSignature.classList.toggle('is-shown', r >= 0.96);
    };

    const update = () => {
      ticking = false;
      // Higher lerp = snappier (closer to direct scroll). 0.32 follows scroll
      // tightly without jumping; lower values feel laggy with the compressed
      // 55%–100% video time range.
      progressCurrent += (progressTarget - progressCurrent) * 0.32;
      applyProgress(Math.max(0, Math.min(1, progressCurrent)));
      if (Math.abs(progressTarget - progressCurrent) > 0.001) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const computeProgress = () => {
      const rect = hero.getBoundingClientRect();
      const total = hero.offsetHeight - window.innerHeight;
      const p = total > 0 ? (-rect.top) / total : 0;
      return Math.max(0, Math.min(1, p));
    };

    const onScroll = () => {
      progressTarget = computeProgress();
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
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
