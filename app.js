(function() {
  const state = WYStorage.load();
  const terminal = WYConsole();
  const save = () => WYStorage.save(state);

  window.wySession = WYSession(state, msg => {
    if (msg) terminal.write(msg);
    save();
  });

  WYCounters(state, msg => {
    terminal.write(`UPDATED ${msg}`);
    save();
  });

  terminal.write('FOUNDATION ONLINE');
})();
