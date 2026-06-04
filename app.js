let teams = {
  A: { name: "", color: "#3b82f6", players: [] },
  B: { name: "", color: "#ef4444", players: [] }
};

// NAVIGATION
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goToSport() {
  showPage('sport');
}

function selectSport(sport) {
  if (sport === 'handball') {
    showPage('config');
  }
}

// TEAMS
function addPlayer(team) {
  const input = document.getElementById(`team${team}Player`);
  const name = input.value;

  if (!name) return;
  if (teams[team].players.length >= 12) {
    alert("Max 12 joueurs !");
    return;
  }

  teams[team].players.push(name);
  input.value = "";

  renderTeams();
}

// update names/colors live
document.getElementById("teamAName").addEventListener("input", e => {
  teams.A.name = e.target.value;
});

document.getElementById("teamBName").addEventListener("input", e => {
  teams.B.name = e.target.value;
});

document.getElementById("teamAColor").addEventListener("input", e => {
  teams.A.color = e.target.value;
});

document.getElementById("teamBColor").addEventListener("input", e => {
  teams.B.color = e.target.value;
});

function renderTeams() {
  document.getElementById("teamAList").innerHTML =
    teams.A.players.map(p => `<li>${p}</li>`).join("");

  document.getElementById("teamBList").innerHTML =
    teams.B.players.map(p => `<li>${p}</li>`).join("");
}

// DASHBOARD
function startDashboard() {
  showPage('dashboard');
  renderDashboard();
}

function renderDashboard() {
  const container = document.getElementById("teamsDisplay");

  container.innerHTML = `
    <div style="display:flex; gap:20px;">

      <div style="flex:1; background:${teams.A.color}; padding:10px; border-radius:10px;">
        <h3>${teams.A.name || "Équipe A"}</h3>
        ${teams.A.players.map(p => `<div>${p}</div>`).join("")}
      </div>

      <div style="flex:1; background:${teams.B.color}; padding:10px; border-radius:10px;">
        <h3>${teams.B.name || "Équipe B"}</h3>
        ${teams.B.players.map(p => `<div>${p}</div>`).join("")}
      </div>

    </div>
  `;
}