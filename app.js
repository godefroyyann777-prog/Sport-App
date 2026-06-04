let players = [];
let stats = {};

function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// PLAYERS
function addPlayer() {
  const name = document.getElementById('playerName').value;
  if (!name) return;

  players.push(name);
  stats[name] = { goal: 0, shot: 0, shotOnTarget: 0 };

  document.getElementById('playerName').value = '';
  updatePlayers();
  updateSelect();
}

function updatePlayers() {
  const list = document.getElementById('playerList');
  list.innerHTML = players.map(p => `<div class="card">${p}</div>`).join('');
}

function updateSelect() {
  const select = document.getElementById('playerSelect');
  select.innerHTML = players.map(p => `<option>${p}</option>`).join('');
}

// STATS
function addStat(type) {
  const player = document.getElementById('playerSelect').value;
  if (!player) return;

  stats[player][type]++;
  updateStats();
}

function updateStats() {
  const display = document.getElementById('statsDisplay');

  display.innerHTML = players.map(p => `
    <div class="card">
      <b>${p}</b><br>
      Buts: ${stats[p].goal} | Tirs: ${stats[p].shot} | Cadrés: ${stats[p].shotOnTarget}
    </div>
  `).join('');
}

// DEFENSE
let goalZones = [];

function saveGoalZone(zone) {
  goalZones.push(zone);
  alert("Zone enregistrée : " + zone);
}

// EXPORT (placeholder PDF)
function exportPDF() {
  alert("Export PDF à venir (prochaine étape)");
}