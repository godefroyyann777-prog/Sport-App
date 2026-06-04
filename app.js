let data = {
  sport: "",
  teams: {
    A: { name: "", color: "#3b82f6", players: [] },
    B: { name: "", color: "#ef4444", players: [] }
  },
  match: {
    time: 0,
    half: 0
  }
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
  const input = document.getElementById(team === "A" ? "inputA" : "inputB");
  const name = input.value;

  if (!name) return;

  if (data.teams[team].players.length >= 12) {
    alert("Max 12 joueurs !");
    return;
  }

  data.teams[team].players.push(name);
  input.value = "";

  renderPlayers();
}

function renderPlayers() {
  document.getElementById("listA").innerHTML =
    data.teams.A.players.map(p => `<li>${p}</li>`).join("");

  document.getElementById("listB").innerHTML =
    data.teams.B.players.map(p => `<li>${p}</li>`).join("");
}

// COLORS / NAMES
document.getElementById("teamAName").addEventListener("input", e => {
  data.teams.A.name = e.target.value;
});

document.getElementById("teamBName").addEventListener("input", e => {
  data.teams.B.name = e.target.value;
});

document.getElementById("teamAColor").addEventListener("input", e => {
  data.teams.A.color = e.target.value;
});

document.getElementById("teamBColor").addEventListener("input", e => {
  data.teams.B.color = e.target.value;
});

// VALIDATION -> TEMPS
function goToTime() {
  show("time");
}

// MATCH TIME
function goToDashboard() {
  data.match.time = document.getElementById("matchTime").value;
  data.match.half = document.getElementById("halfTime").value;

  show("dashboard");
  renderDashboard();
}

// DASHBOARD
function renderDashboard() {
  document.getElementById("display").innerHTML = `
    <div style="display:flex; gap:20px;">

      <div style="flex:1; background:${data.teams.A.color}; padding:10px; border-radius:10px;">
        <h3>${data.teams.A.name || "Équipe A"}</h3>
        ${data.teams.A.players.map(p => `<div>${p}</div>`).join("")}
      </div>

      <div style="flex:1; background:${data.teams.B.color}; padding:10px; border-radius:10px;">
        <h3>${data.teams.B.name || "Équipe B"}</h3>
        ${data.teams.B.players.map(p => `<div>${p}</div>`).join("")}
      </div>

    </div>

    <p>⏱ Match : ${data.match.time} min | Mi-temps : ${data.match.half} min</p>
  `;
}