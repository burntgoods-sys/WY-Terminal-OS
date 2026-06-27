window.WYCounters = function(state, onChange) {
  const ids = {
    day: 'dayValue',
    page: 'pageValue',
    panel: 'panelValue'
  };

  const minimums = { day: 1, page: 1, panel: 1 };
  const pad = n => String(Math.max(0, n)).padStart(3, '0');

  function renderOne(key) {
    const el = document.getElementById(ids[key]);
    if (!el) return;
    el.textContent = pad(state[key]);
    el.classList.remove('is-changing');
    void el.offsetWidth;
    el.classList.add('is-changing');
  }

  function render() {
    Object.keys(ids).forEach(renderOne);
  }

  function change(target, delta) {
    const min = minimums[target] ?? 0;
    state[target] = Math.max(min, state[target] + delta);

    renderOne(target);

    if (typeof onChange === 'function') {
      onChange(`${target.toUpperCase()} ${pad(state[target])}`);
    }

    if (target === 'panel' && delta > 0 && window.wySession) {

    state.panelLog.push({
        day: state.day,
        page: state.page,
        panel: state.panel - 1,
        elapsed: state.elapsed
    });

    window.wySession.reset();
    window.wySession.start();
}
  document.querySelectorAll('[data-target][data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const delta = btn.dataset.action === 'inc' ? 1 : -1;
      change(target, delta);
    });
  });

  window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();

    const shortcuts = {
      q: ['day', -1],
      w: ['day', 1],
      a: ['page', -1],
      s: ['page', 1],
      z: ['panel', -1],
      x: ['panel', 1]
    };

    if (!shortcuts[key]) return;

    const [target, delta] = shortcuts[key];
    change(target, delta);
  });

  render();

  return { render, change };
};
