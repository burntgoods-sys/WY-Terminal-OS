window.WYCounters = function(state, onChange) {
  const ids = { day: 'dayValue', page: 'pageValue', panel: 'panelValue' };
  const pad = n => String(Math.max(0, n)).padStart(3, '0');
  function render() { Object.keys(ids).forEach(k => document.getElementById(ids[k]).textContent = pad(state[k])); }
  function change(target, delta) { state[target] = Math.max(0, state[target] + delta); render(); onChange(`${target.toUpperCase()} ${pad(state[target])}`); }
  document.querySelectorAll('.counter-btn').forEach(btn => {
    btn.addEventListener('click', () => change(btn.dataset.target, btn.dataset.action === 'inc' ? 1 : -1));
  });
  window.addEventListener('keydown', e => {
    const map = { q:['day',-1], w:['day',1], a:['page',-1], s:['page',1], z:['panel',-1], x:['panel',1] };
    const hit = map[e.key.toLowerCase()];
    if (hit) change(hit[0], hit[1]);
  });
  render();
  return { render, change };
};
