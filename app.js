let data = {
  sport: "",
  teams: {
    A: { name: "", color: "#3b82f6", players: [] },
    B: { name: "", color: "#ef4444", players: [] }
  },
  match: {}
};

let chronoInterval = null;
let currentTime = 0;
let isRunning = false;

// =====================
// NAVIGATION
// =====================

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

// =====================
// PLAYERS + NUMEROS UNIQUES
// =====================

function isNumberUsed(team, number) {
  return data.teams[team].players.some(p => p.number == number);
}

function addPlayer(team) {

  const nameInput = document.getElementById(`input${team}Name`);
  const numberInput = document.getElementById(`input${team}Number`);

  const name = nameInput.value.trim();
  const number = numberInput.value.trim();

  if (!name || !number) {
    alert("Nom et numéro obligatoires");
    return;
  }

  if (isNumberUsed(team, number)) {
    alert("Ce numéro est déjà utilisé dans l'équipe");
    return;
  }

  if (data.teams[team].players.length >= 12) {
    alert("Maximum 12 joueurs");
    return;
  }

  data.teams[team].players.push({ name, number });

  nameInput.value = "";
  numberInput.value = "";

  renderPlayers();
}

// =====================
// AFFICHAGE JOUEURS
// =====================

function renderPlayers() {

  document.getElementById("listA").innerHTML =
    data.teams.A.players.map(p =>
      `<li>#${p.number} - ${p.name} <button onclick="addGoal('A',${p.number})">+1 but</button></li>`
    ).join("");

  document.getElementById("listB").innerHTML =
    data.teams.B.players.map(p =>
      `<li>#${p.number} - ${p.name} <button onclick="addGoal('B',${p.number})">+1 but</button></li>`
    ).join("");
}

// =====================
// COULEURS
// =====================

function updateTeamColors() {

  const a = document.getElementById("teamABox");
  const b = document.getElementById("teamBBox");

  if (a) a.style.backgroundColor = data.teams.A.color;
  if (b) b.style.backgroundColor = data.teams.B.color;
}

// =====================
// VALIDATION EQUIPES
// =====================

function goToTime() {

  data.teams.A.name =
    document.getElementById("teamAName").value || "Équipe A";

  data.teams.B.name =
    document.getElementById("teamBName").value || "Équipe B";

  if (data.teams.A.players.length < 7 ||
      data.teams.B.players.length < 7) {
    alert("Minimum 7 joueurs par équipe");
    return;
  }

  show("time");
}

// =====================
// MATCH CONFIG (SIMPLIFIÉ)
// =====================

function goToDashboard() {

  const periodTime =
    document.getElementById("periodTime").value;

  const periodCount =
    document.getElementById("periodCount").value;

  if (!periodTime || !periodCount) {
    alert("Remplis tous les champs");
    return;
  }

  data.match = {
    periodTime,
    periodCount
  };

  currentTime = periodTime * 60;

  show("dashboard");
  renderDashboard();
}

// =====================
// CHRONO
// =====================

function startChrono() {
  if (isRunning) return;

  isRunning = true;

  chronoInterval = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateChronoDisplay();
    }
  }, 1000);
}

function pauseChrono() {
  clearInterval(chronoInterval);
  isRunning = false;
}

function resetChrono() {
  pauseChrono();
  currentTime = data.match.periodTime * 60;
  updateChronoDisplay();
}

function updateChronoDisplay() {
  const el = document.getElementById("chrono");
  if (!el) return;

  const m = String(Math.floor(currentTime / 60)).padStart(2, "0");
  const s = String(currentTime % 60).padStart(2, "0");

  el.innerText = `${m}:${s}`;
}

// =====================
// BUTS JOUEURS
// =====================

let goals = {};

function addGoal(team, number) {

  const key = `${team}-${number}`;

  if (!goals[key]) goals[key] = 0;

  goals[key]++;

  alert(`But ajouté (#${number})`);
  renderDashboard();
}

// =====================
// DASHBOARD
// =====================

function renderDashboard() {

  document.getElementById("display").innerHTML = `

    <div class="chrono">
      <span id="chrono">00:00</span>
    </div>

    <div class="chrono-buttons">
      <button onclick="startChrono()">▶️ Start</button>
      <button onclick="pauseChrono()">⏸️ Pause</button>
      <button onclick="resetChrono()">🔄 Reset</button>
    </div>

    <hr>

    <div class="dashboard-container">

      <div class="team-dashboard" style="background:${data.teams.A.color}">
        <h3>${data.teams.A.name}</h3>
        ${data.teams.A.players.map(p => `
          <div>
            #${p.number} - ${p.name}
            | ⚽ ${goals[`A-${p.number}`] || 0}
          </div>
        `).join("")}
      </div>

      <div class="team-dashboard" style="background:${data.teams.B.color}">
        <h3>${data.teams.B.name}</h3>
        ${data.teams.B.players.map(p => `
          <div>
            #${p.number} - ${p.name}
            | ⚽ ${goals[`B-${p.number}`] || 0}
          </div>
        `).join("")}
      </div>

    </div>

    <div style="text-align:center;margin-top:15px;">
      <p>${data.match.periodCount} période(s)</p>
      <p>${data.match.periodTime} min / période</p>
    </div>
  `;

  updateChronoDisplay();
}

// =====================
// INIT
// =====================

window.onload = () => {

  document.getElementById("teamAColor").addEventListener("input", e => {
    data.teams.A.color = e.target.value;
    updateTeamColors();
  });

  document.getElementById("teamBColor").addEventListener("input", e => {
    data.teams.B.color = e.target.value;
    updateTeamColors();
  });

  updateTeamColors();
};