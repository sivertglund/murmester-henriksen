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
    '.section--intro .intro__head, .section--intro .intro__quote, .section--intro .intro__col, ' +
    '.stack__head, .stack__card, ' +
    '.about__copy, .about__facts, ' +
    '.contact__copy, .contact__form'
  );
  reveals.forEach(el => el.classList.add('reveal'));

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
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
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
  const writeText = $('#heroWriteText');
  const pen       = $('#heroPen');
  const heroSub     = $('.hero__sub');
  const heroCta     = $('.hero__cta');
  const heroWelcome = $('.hero__welcome');
  const heroMicro   = $('.hero__microcopy');
  const scrollHint  = $('.hero__scroll-hint');

  if (hero && video) {
    let duration = 0;
    let canScrub = false;
    let progressTarget = 0;
    let progressCurrent = 0;
    let ticking = false;

    const setDuration = () => {
      if (isFinite(video.duration) && video.duration > 0) {
        duration = video.duration;
      }
    };
    const showEndFrame = () => {
      // Show END frame initially — wall is "built" before user scrolls
      if (duration) {
        try { video.currentTime = Math.max(0, duration - 0.001); } catch (_) {}
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
      showEndFrame();
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
      // Reverse video playback — only after the browser has frame data
      if (canScrub && duration) {
        const t = Math.max(0, Math.min(duration - 0.001, (1 - p) * duration));
        if (Math.abs(video.currentTime - t) > 0.015) {
          try { video.currentTime = t; } catch (_) {}
        }
      }

      // Handwriting reveal (0 → 1)
      const r = Math.max(0, Math.min(1,
        (p - REVEAL_START) / (REVEAL_END - REVEAL_START)
      ));
      if (writeText) {
        writeText.style.setProperty('--reveal', r.toFixed(4));
      }
      if (pen && writeText) {
        const w = writeText.offsetWidth;
        const x = r * w;
        pen.style.transform = `translate3d(${x}px, 0, 0)`;
        // Pen visible while drawing, fading at the very ends
        const edge = Math.min(r * 8, (1 - r) * 8, 1);
        pen.style.opacity = String(r > 0.001 && r < 0.999 ? edge : 0);
      }

      // Surrounding copy: keep visible, gently dim toward the end
      if (heroWelcome) heroWelcome.style.opacity = String(1 - Math.max(0, p - 0.55) * 2.2);
      if (heroSub)     heroSub.style.opacity     = String(1 - Math.max(0, p - 0.45) * 1.6);
      if (heroCta)     heroCta.style.opacity     = String(1 - Math.max(0, p - 0.50) * 1.4);
      if (heroMicro)   heroMicro.style.opacity   = String(1 - Math.max(0, p - 0.40) * 2.0);
      if (scrollHint)  scrollHint.style.opacity  = String(1 - Math.min(1, p * 4));
    };

    const update = () => {
      ticking = false;
      progressCurrent += (progressTarget - progressCurrent) * 0.18;
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

  /* ---------- Marquee: scroll-coupled horizontal rows ----------
     Two rows of project images. While the marquee section is in view, the
     scroll progress (0 → 1) drives a horizontal translate. Row[direction=left]
     slides leftward as the user scrolls down; the row marked direction=right
     slides rightward. Falls back to a slow CSS animation when JS is disabled
     (or before the section enters the viewport).
  */
  const marquee = $('#prosjekter-utvalg');
  if (marquee) {
    const rows = marquee.querySelectorAll('.marquee__row');
    const tracks = Array.from(rows).map((r) => r.querySelector('.marquee__track'));
    let raf = false;

    const updateMarquee = () => {
      raf = false;
      const rect = marquee.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: starts when section top crosses bottom of viewport,
      // ends when section bottom crosses top of viewport.
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const p = Math.max(0, Math.min(1, traveled / total));

      rows.forEach((row, i) => {
        const track = tracks[i];
        if (!track) return;
        if (!row.classList.contains('is-coupled')) row.classList.add('is-coupled');
        const max = Math.max(0, track.scrollWidth - row.clientWidth);
        const dir = row.dataset.direction || 'left';
        // direction=left  : slides leftward → x goes from +max/4 down to -max + max/4
        //                   we keep some padding on each side so first frame doesn't show empty space.
        // direction=right : slides rightward (mirrored)
        const overflow = max;
        let x;
        if (dir === 'right') {
          x = -overflow + p * overflow;       // -max → 0
        } else {
          x = -p * overflow;                  //  0   → -max
        }
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      });
    };

    const onMarqueeScroll = () => {
      if (raf) return;
      raf = true;
      requestAnimationFrame(updateMarquee);
    };

    window.addEventListener('scroll', onMarqueeScroll, { passive: true });
    window.addEventListener('resize', onMarqueeScroll);
    // Also re-run when images load (so scrollWidth is accurate)
    marquee.querySelectorAll('img').forEach((img) => {
      if (img.complete) return;
      img.addEventListener('load', onMarqueeScroll, { once: true });
    });
    updateMarquee();
  }

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
