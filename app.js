(function() {
  const state = WYStorage.load();

  const today = new Date();

const dateText = today.toLocaleDateString('en-CA', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
}).toUpperCase().replace(',', '');

  const terminal = WYConsole();
  const archive = WYArchive(state);

  const save = () => WYStorage.save(state);

  window.wySession = WYSession(state, msg => {
    if (msg) terminal.write(msg);
    save();
  });

  WYCounters(state, msg => {
    terminal.write(`UPDATED ${msg}`);
    terminal.write(archive.latestLine());
    save();
  });

  terminal.write('FOUNDATION ONLINE');
  const dateEl = document.getElementById('dateValue');
if (dateEl) dateEl.textContent = dateText;
})();
