let data = {
  sport: "",
  teams: {
    A: { name: "", color: "#3b82f6", players: [] },
    B: { name: "", color: "#ef4444", players: [] }
  },
  match: {}
};

let goals = {};
let currentTime = 0;
let interval = null;
let running = false;

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

// COULEUR VIA TEXTE
function pickColor(team) {
  const color = prompt("Entrez une couleur hex (#3b82f6)");
  if (!color) return;

  data.teams[team].color = color;

  const box = document.getElementById(
    team === "A" ? "teamAColorBox" : "teamBColorBox"
  );

  box.style.background = color;
  box.style.color = "white";
}

// JOUEURS
function isNumberUsed(team, number) {
  return data.teams[team].players.some(p => Number(p.number) === Number(number));
}

function addPlayer(team) {

  const name = document.getElementById(`input${team}Name`).value.trim();
  const number = document.getElementById(`input${team}Number`).value.trim();

  if (!name || !number) {
    alert("Nom + numéro obligatoires");
    return;
  }

  if (isNumberUsed(team, number)) {
    alert("Numéro déjà utilisé");
    return;
  }

  if (data.teams[team].players.length >= 12) {
    alert("Max 12 joueurs");
    return;
  }

  data.teams[team].players.push({ name, number });

  document.getElementById(`input${team}Name`).value = "";
  document.getElementById(`input${team}Number`).value = "";

  renderPlayers();
}

function renderPlayers() {
  document.getElementById("listA").innerHTML =
    data.teams.A.players.map(p =>
      `<li>#${p.number} - ${p.name}</li>`
    ).join("");

  document.getElementById("listB").innerHTML =
    data.teams.B.players.map(p =>
      `<li>#${p.number} - ${p.name}</li>`
    ).join("");
}

// VALIDATION
function goToTime() {

  if (data.teams.A.players.length < 7 || data.teams.B.players.length < 7) {
    alert("Minimum 7 joueurs");
    return;
  }

  data.teams.A.name = document.getElementById("teamAName").value || "Équipe A";
  data.teams.B.name = document.getElementById("teamBName").value || "Équipe B";

  show("time");
}

// MATCH
function goToDashboard() {

  const periodTime = document.getElementById("periodTime").value;
  const periodCount = document.getElementById("periodCount").value;

  if (!periodTime || !periodCount) {
    alert("Remplir tous les champs");
    return;
  }

  data.match = { periodTime, periodCount };

  currentTime = periodTime * 60;

  show("dashboard");
  renderDashboard();
}

// CHRONO
function start() {
  if (running) return;

  running = true;

  interval = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateChrono();
    }
  }, 1000);
}

function pause() {
  clearInterval(interval);
  running = false;
}

function reset() {
  pause();
  currentTime = data.match.periodTime * 60;
  updateChrono();
}

function updateChrono() {
  const m = String(Math.floor(currentTime / 60)).padStart(2, "0");
  const s = String(currentTime % 60).padStart(2, "0");

  const el = document.getElementById("chrono");
  if (el) el.innerText = `${m}:${s}`;
}

// BUTS (UNIQUEMENT DASHBOARD)
function addGoal(team, number) {
  const key = `${team}-${number}`;
  goals[key] = (goals[key] || 0) + 1;
  renderDashboard();
}

// DASHBOARD
function renderDashboard() {

  document.getElementById("display").innerHTML = `

    <div style="text-align:center;font-size:42px;" id="chrono">00:00</div>

    <div style="text-align:center;margin:10px;">
      <button onclick="start()">▶️ Start</button>
      <button onclick="pause()">⏸️ Pause</button>
      <button onclick="reset()">🔄 Reset</button>
    </div>

    <div style="display:flex;gap:15px;padding:10px;">

      <div style="flex:1;background:${data.teams.A.color};padding:10px;border-radius:10px;">
        <h3>${data.teams.A.name}</h3>

        ${data.teams.A.players.map(p => `
          <div>
            #${p.number} ${p.name}
            ⚽ ${goals[`A-${p.number}`] || 0}
            <button onclick="addGoal('A','${p.number}')">+ but</button>
          </div>
        `).join("")}

      </div>

      <div style="flex:1;background:${data.teams.B.color};padding:10px;border-radius:10px;">
        <h3>${data.teams.B.name}</h3>

        ${data.teams.B.players.map(p => `
          <div>
            #${p.number} ${p.name}
            ⚽ ${goals[`B-${p.number}`] || 0}
            <button onclick="addGoal('B','${p.number}')">+ but</button>
          </div>
        `).join("")}

      </div>

    </div>

  `;

  updateChrono();
}