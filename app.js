(function() {
  const state = WYStorage.load();

  const today = new Date();
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const dateText =
    String(today.getDate()).padStart(2, '0') +
    ' ' +
    months[today.getMonth()] +
    ' ' +
    today.getFullYear();

  document.getElementById('dateValue').textContent = dateText;

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
})();
