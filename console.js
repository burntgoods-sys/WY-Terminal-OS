window.WYConsole = function() {
  const el = document.getElementById('consoleMessage');
  const idle = ['SESSION ACTIVE','ARCHIVE VERIFIED','FRAME LOCKED','TRANSMISSION OK','LV-426 LINK ACTIVE','CHECKSUM OK'];
  function write(msg) { el.textContent = msg; }
  setInterval(() => write(idle[Math.floor(Math.random() * idle.length)]), 12000);
  return { write };
};
