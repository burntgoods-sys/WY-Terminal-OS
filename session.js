window.WYSession = function(state, onChange) {
  const timerEl = document.getElementById('sessionTimer');
  const buttons = document.querySelectorAll('[data-timer-action]');
  
  let elapsed = state.panelElapsed || 0;
  let startedAt = null;
  let interval = null;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function format(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }

  function currentElapsed() {
    if (!startedAt) return elapsed;
    return elapsed + Math.floor((Date.now() - startedAt) / 1000);
  }

  function render() {
    if (timerEl) timerEl.textContent = format(currentElapsed());
  }

  function save(message) {
    state.panelElapsed = currentElapsed();
    if (typeof onChange === 'function') onChange(message);
  }

  function start() {
    if (startedAt) return;
    startedAt = Date.now();

    interval = setInterval(() => {
      render();
      save('PANEL TIMER ACTIVE');
    }, 1000);

    save('PANEL TIMER STARTED');
    render();
  }

  function pause() {
    if (!startedAt) return;

    elapsed = currentElapsed();
    startedAt = null;

    clearInterval(interval);
    interval = null;

    state.panelElapsed = elapsed;
    save('PANEL TIMER PAUSED');
    render();


  function reset() {
  if (currentElapsed() > 0) {
    save('ARCHIVE PANEL?');
    return;
  }

  elapsed = 0;
  startedAt = null;

  clearInterval(interval);
  interval = null;

  state.panelElapsed = 0;
  save('PANEL TIMER RESET');
  render();
}

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-timer-action');

      if (action === 'start') start();
      if (action === 'pause') pause();
      if (action === 'reset') reset();
    });
  });

  render();

  return {
    start,
    pause,
    reset,
    render
  };
};
