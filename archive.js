window.WYArchive = function(state) {
  const pad = n => String(Math.max(0, n)).padStart(3, '0');

  function formatTime(seconds = 0) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return h > 0
      ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      : `${m}:${String(s).padStart(2, '0')}`;
  }

  function latestLine() {
    const log = state.panelLog || [];

    if (!log.length) {
      return 'ARCHIVE EMPTY';
    }

    const last = log[log.length - 1];

    return `D${last.date || 'NO DATE'} P${pad(last.page)} #${pad(last.panel)} COMPLETE ${formatTime(last.elapsed)}`;
  }

  return {
    latestLine,
    formatTime
  };
};
