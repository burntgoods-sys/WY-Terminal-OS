window.WYStorage = {
  key: 'wy-terminal-os-v010',
  defaults: { day: 2, page: 6, panel: 55, elapsed: 0 },
  load() {
    try { return { ...this.defaults, ...JSON.parse(localStorage.getItem(this.key) || '{}') }; }
    catch { return { ...this.defaults }; }
  },
  save(state) { localStorage.setItem(this.key, JSON.stringify(state)); }
};
