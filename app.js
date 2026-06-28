(function() {
  const state = WYStorage.load();

  const today = new Date();
  const dateText = today.toLocaleDateString('en-CA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase().replace(',', '');

  const dateEl = document.getElementById('dateValue');
  if (dateEl) dateEl.textContent = dateText;

  const terminal = WYConsole();
  const save = () => WYStorage.save(state);

  const archive = window.WYArchive
  ? WYArchive(state)
  : {
      add: () => {},
      latestLine: () => 'BUFFER EMPTY'
    };

  window.wySession = WYSession(state, msg => {
  if (msg) terminal.write(msg);

  WYCounters(state, msg => {
    terminal.write(`UPDATED ${msg}`);
    save();
});
  terminal.write('FOUNDATION ONLINE');
})();
