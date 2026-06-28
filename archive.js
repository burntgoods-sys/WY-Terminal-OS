window.WYArchive = function(state) {
  const listEl = document.getElementById('archiveList');

  if (!state.archiveLog) state.archiveLog = [];

  function formatEntry(entry) {
    return `P${String(entry.page).padStart(3, '0')}-${String(entry.panel).padStart(3, '0')} VERIFIED`;
  }

  function render() {
    if (!listEl) return;

    listEl.innerHTML = '';

    state.archiveLog.slice(-8).forEach(entry => {
      const li = document.createElement('li');
      li.textContent = formatEntry(entry);
      listEl.appendChild(li);
    });

    listEl.scrollTop = listEl.scrollHeight;
  }

  function add(page, panel) {
    state.archiveLog.push({
      page,
      panel,
      time: Date.now()
    });

    render();
  }

  function latestLine() {
    if (!state.archiveLog.length) return 'BUFFER EMPTY';

    const latest = state.archiveLog[state.archiveLog.length - 1];
    return formatEntry(latest);
  }

  render();

  return { add, render, latestLine };
};
