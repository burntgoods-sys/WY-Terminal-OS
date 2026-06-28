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

  const archiveConfirm = document.getElementById('archiveConfirm');
  const archiveChoices = document.querySelectorAll('[data-archive-choice]');

  window.wySession = WYSession(state, msg => {
  if (msg) terminal.write(msg);

  if (archiveConfirm) {
    archiveConfirm.hidden = msg !== 'ARCHIVE PANEL?';
  }

  save();
});
  
archiveChoices.forEach(button => {
  button.addEventListener('click', () => {
    const choice = button.getAttribute('data-archive-choice');

    if (choice === 'yes') {
      archive.add(state.page, state.panel);
      terminal.write(archive.latestLine());
    } else {
      terminal.write('ARCHIVE CANCELLED');
    }

    if (archiveConfirm) archiveConfirm.hidden = true;
    save();
  });
});

  WYCounters(state, msg => {
    terminal.write(`UPDATED ${msg}`);
    save();
});
  terminal.write('FOUNDATION ONLINE');
})();
