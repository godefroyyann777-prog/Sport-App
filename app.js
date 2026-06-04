let data = {
  sport: "",
  teams: {
    A: {
      name: "",
      color: "#3b82f6",
      players: []
    },
    B: {
      name: "",
      color: "#ef4444",
      players: []
    }
  },
  match: {}
};

let chronoInterval = null;
let currentTime = 0;
let isRunning = false;

// ------------------
// NAVIGATION
// ------------------

function show(page) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  document.getElementById(page).classList.add("active");
}

function goToSport() {
  show("sport");
}

function selectSport(sport) {
  data.sport = sport;
  show("teams");
}

// ------------------
// JOUEURS
// ------------------

function addPlayer(team) {

  const nameInput = document.getElementById(`input${team}Name`);
  const numberInput = document.getElementById(`input${team}Number`);

  const name = nameInput.value.trim();
  const number = numberInput.value.trim();

  if (!name) {
    alert("Nom du joueur obligatoire");
    return;
  }

  if (!number) {
    alert("Numéro obligatoire");
    return;
  }

  if (data.teams[team].players.length >= 12) {
    alert("Maximum 12 joueurs");
    return;
  }

  data.teams[team].players.push({
    name,
    number
  });

  nameInput.value = "";
  numberInput.value = "";

  renderPlayers();
}

function renderPlayers() {

  document.getElementById("listA").innerHTML =
    data.teams.A.players.map(player =>
      `<li>#${player.number} - ${player.name}</li>`
    ).join("");

  document.getElementById("listB").innerHTML =
    data.teams.B.players.map(player =>
      `<li>#${player.number} - ${player.name}</li>`
    ).join("");
}

// ------------------
// COULEURS
// ------------------

function updateTeamColors() {

  const boxA = document.getElementById("teamABox");
  const boxB = document.getElementById("teamBBox");

  if(boxA){
    boxA.style.backgroundColor = data.teams.A.color;
  }

  if(boxB){
    boxB.style.backgroundColor = data.teams.B.color;
  }
}

// ------------------
// VALIDATION EQUIPES
// ------------------

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

// ------------------
// DASHBOARD
// ------------------

function goToDashboard() {

  const matchTime =
    document.getElementById("matchTime").value;

  const periodTime =
    document.getElementById("periodTime").value;

  const periodCount =
    document.getElementById("periodCount").value;

  if(!matchTime || !periodTime || !periodCount){
    alert("Complète tous les champs");
    return;
  }

  data.match = {
    matchTime,
    periodTime,
    periodCount
  };

  currentTime = parseInt(periodTime) * 60;

  show("dashboard");

  renderDashboard();
}

// ------------------
// CHRONO
// ------------------

function startChrono() {

  if(isRunning) return;

  isRunning = true;

  chronoInterval = setInterval(() => {

    if(currentTime > 0){

      currentTime--;

      updateChronoDisplay();

    }

  },1000);
}

function pauseChrono() {

  clearInterval(chronoInterval);

  isRunning = false;
}

function resetChrono() {

  pauseChrono();

  currentTime =
    parseInt(data.match.periodTime) * 60;

  updateChronoDisplay();
}

function updateChronoDisplay() {

  const chrono =
    document.getElementById("chrono");

  if(!chrono) return;

  const minutes =
    Math.floor(currentTime / 60)
      .toString()
      .padStart(2,"0");

  const seconds =
    (currentTime % 60)
      .toString()
      .padStart(2,"0");

  chrono.innerText =
    `${minutes}:${seconds}`;
}

// ------------------
// AFFICHAGE DASHBOARD
// ------------------

function renderDashboard() {

  document.getElementById("display").innerHTML = `

  <div class="chrono">
    <span id="chrono">00:00</span>
  </div>

  <div class="chrono-buttons">
    <button onclick="startChrono()">▶️ Démarrer</button>
    <button onclick="pauseChrono()">⏸️ Pause</button>
    <button onclick="resetChrono()">🔄 Reset</button>
  </div>

  <br>

  <div class="dashboard-container">

    <div class="team-dashboard"
      style="background:${data.teams.A.color}">
      <h3>${data.teams.A.name}</h3>

      ${data.teams.A.players.map(player => `
        <div>#${player.number} - ${player.name}</div>
      `).join("")}

    </div>

    <div class="team-dashboard"
      style="background:${data.teams.B.color}">
      <h3>${data.teams.B.name}</h3>

      ${data.teams.B.players.map(player => `
        <div>#${player.number} - ${player.name}</div>
      `).join("")}

    </div>

  </div>

  <div style="text-align:center;margin-top:20px;">
    <p>Match : ${data.match.matchTime} min</p>
    <p>${data.match.periodCount} période(s)</p>
    <p>${data.match.periodTime} min par période</p>
  </div>
  `;

  updateChronoDisplay();
}

// ------------------
// INITIALISATION
// ------------------

window.onload = () => {

  document.getElementById("teamAColor")
    .addEventListener("input", e => {

      data.teams.A.color = e.target.value;
      updateTeamColors();
    });

  document.getElementById("teamBColor")
    .addEventListener("input", e => {

      data.teams.B.color = e.target.value;
      updateTeamColors();
    });

  updateTeamColors();
};