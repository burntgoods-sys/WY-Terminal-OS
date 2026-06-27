(function(){
  const state = WYStorage.load();
  const terminal = WYConsole();
  const save = () => WYStorage.save(state);
  WYCounters(state, msg => { terminal.write(`UPDATED ${msg}`); save(); });
  WYSession(state, save);
  terminal.write('FOUNDATION ONLINE');
})();
