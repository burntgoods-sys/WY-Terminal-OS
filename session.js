window.WYSession = function(state, onTick) {
  const timer = document.getElementById('sessionTimer');
  const started = Date.now() - (state.elapsed * 1000);
  const fmt = s => [Math.floor(s/3600), Math.floor(s/60)%60, s%60].map(v => String(v).padStart(2,'0')).join(':');
  function tick() { state.elapsed = Math.floor((Date.now() - started) / 1000); timer.textContent = fmt(state.elapsed); onTick(); }
  tick();
  setInterval(tick, 1000);
};
