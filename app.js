let data = {
  sport: "",
  teams: {
    A: { name: "", color: "#3b82f6", players: [] },
    B: { name: "", color: "#ef4444", players: [] }
  },
  match: {}
};

// NAVIGATION
function show(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}

function goToSport() {
  show("sport");
}

function selectSport(sport) {
  data.sport = sport;
  show("teams");
}

// PLAYERS
function addPlayer(team) {
  const nameInput = document.getElementById(`input${team}Name`);
  const numberInput = document.getElementById(`input${team}Number`);

  const name = nameInput.value;
  const number = numberInput.value;

  if (!name) return;

  if (data.teams[team].players.length >= 12) {
    alert("Maximum 12 joueurs !");
    return;
  }

  data.teams[team].players.push({
    name,
    number
  });

  nameInput.value = "";
  numberInput.value = "";

  renderPlayers();
  updateTeamColors();
}

// RENDER PLAYERS
function renderPlayers() {
  document.getElementById("listA").innerHTML =
    data.teams.A.players.map(p => `<li>${p.name} (#${p.number || "-"})</li>`).join("");

  document.getElementById("listB").innerHTML =
    data.teams.B.players.map(p => `<li>${p.name} (#${p.number || "-"})</li>`).join("");
}

// COLORS LIVE FULL BLOCK
document.getElementById("teamAColor").addEventListener("input", e => {
  data.teams.A.color = e.target.value;
  updateTeamColors();
});

document.getElementById("teamBColor").addEventListener("input", e => {
  data.teams.B.color = e.target.value;
  updateTeamColors();
});

function updateTeamColors() {
  document.getElementById("teamABox").style.background = data.teams.A.color;
  document.getElementById("teamBBox").style.background = data.teams.B.color;
}

// NAVIGATION FLOW
function goToTime() {
  if (data.teams.A.players.length < 7 || data.teams.B.players.length < 7) {
    alert("Minimum 7 joueurs par équipe !");
    return;
  }
  show("time");
}

// MATCH SETTINGS
function goToDashboard() {
  data.match = {
    matchTime: document.getElementById("matchTime").value,
    periodTime: document.getElementById("periodTime").value,
    periodCount: document.getElementById("periodCount").value
  };

  show("dashboard");
  renderDashboard();
}

// DASHBOARD
function renderDashboard() {
  document.getElementById("display").innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:15px; padding:15px;">

      <div style="flex:1; min-width:250px; background:${data.teams.A.color}; padding:10px; border-radius:10px;">
        <h3>${data.teams.A.name || "Équipe A"}</h3>
        ${data.teams.A.players.map(p => `<div>${p.name} (#${p.number || "-"})</div>`).join("")}
      </div>

      <div style="flex:1; min-width:250px; background:${data.teams.B.color}; padding:10px; border-radius:10px;">
        <h3>${data.teams.B.name || "Équipe B"}</h3>
        ${data.teams.B.players.map(p => `<div>${p.name} (#${p.number || "-"})</div>`).join("")}
      </div>

    </div>

    <div style="text-align:center;">
      <p>⏱ Match: ${data.match.matchTime} min</p>
      <p>🔁 Périodes: ${data.match.periodCount} × ${data.match.periodTime} min</p>
    </div>
  `;
}

// INIT COLORS
updateTeamColors();