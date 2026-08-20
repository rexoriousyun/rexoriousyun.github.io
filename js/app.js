/* Rex Yun portfolio — router and view controls.
   No dependencies. Everything here is enhancement: with JS off the document
   still renders every view in order, which is why .js-router is added at
   runtime rather than sitting in the markup. */
(function () {
  'use strict';

  var shell = document.getElementById('shell');
  var views = {
    '/': document.getElementById('view-home'),
    '/work/grove': document.getElementById('view-grove'),
    '/work/design-guide': document.getElementById('view-design-guide'),
    '/work/creative-library': document.getElementById('view-creative-library'),
    '/work/tree-of-knowledge': document.getElementById('view-tree-of-knowledge')
  };

  var ACCENTS = {
    volt: 'var(--rx-volt)',
    coolant: 'var(--rx-coolant)',
    amber: 'var(--rx-amber)',
    rose: 'var(--rx-rose)'
  };

  var accent = 'volt';
  var mode = 'night';

  function reduceMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---- routing ---------------------------------------------------------- */

  function route() {
    var r = (location.hash || '').replace(/^#/, '');
    return views[r] ? r : '/';
  }

  function render(scrollTop) {
    var current = route();
    Object.keys(views).forEach(function (path) {
      views[path].hidden = path !== current;
    });
    if (scrollTop) window.scrollTo(0, 0);
    return views[current];
  }

  window.addEventListener('hashchange', function () {
    var view = render(true);
    // Move focus into the view so a keyboard user is not left at the top of
    // a document whose content just changed under them.
    var heading = view.querySelector('h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  });

  /* ---- in-page jumps ---------------------------------------------------- */

  function jumpTo(id) {
    var el = document.getElementById('s-' + id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-jump]');
    if (!btn) return;
    var id = btn.getAttribute('data-jump');
    var target = document.getElementById('s-' + id);

    if (target && !target.closest('.view').hidden) {
      jumpTo(id);
      return;
    }
    // The section lives on the home view — go there first, then scroll once
    // the router has swapped views.
    location.hash = '#/';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { jumpTo(id); });
    });
  });

  /* ---- accent and mode -------------------------------------------------- */

  function applyAccent() {
    var value = ACCENTS[accent];
    shell.style.setProperty('--rx-accent', value);
    // The fill can stay at full volume in both modes; the label colour cannot.
    // On Daylight the raw accent drops to roughly 1:1, so day gets a darkened
    // mix of the same hue instead. 42% not 48%: at 48% volt lands on 4.38:1
    // against the inset surface, just under the 4.5 floor. 42% clears all four
    // accents on every day surface, worst case 5.41:1.
    shell.style.setProperty(
      '--rx-accent-text',
      mode === 'day' ? 'color-mix(in oklab, ' + value + ' 42%, var(--rx-void))' : value
    );
  }

  document.querySelectorAll('[data-accent]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      accent = btn.getAttribute('data-accent');
      document.querySelectorAll('[data-accent]').forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === btn));
      });
      applyAccent();
    });
  });

  var modeToggle = document.getElementById('mode-toggle');
  modeToggle.addEventListener('click', function () {
    mode = mode === 'day' ? 'night' : 'day';
    shell.setAttribute('data-mode', mode);
    modeToggle.setAttribute('aria-pressed', String(mode === 'day'));
    modeToggle.textContent = mode === 'day' ? 'Nightshift ◑' : 'Daylight ◐';
    applyAccent();
  });

  /* ---- header height ----------------------------------------------------
     The case bar sticks below the header and section jumps clear it. Both used
     to assume 65px, which is only true while the header is one row — on a
     phone it wraps and the bar slid underneath it. Measure instead. */

  var masthead = document.querySelector('.masthead');
  function measureHeader() {
    shell.style.setProperty('--rx-header-h', masthead.offsetHeight + 'px');
  }
  if (window.ResizeObserver) {
    new ResizeObserver(measureHeader).observe(masthead);
  } else {
    window.addEventListener('resize', measureHeader);
  }

  /* ---- boot ------------------------------------------------------------- */

  shell.classList.add('js-router');
  measureHeader();
  render(false);
  applyAccent();
})();
