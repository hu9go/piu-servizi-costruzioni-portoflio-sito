// ------------------------------
// Menu mobile
// ------------------------------
const toggle = document.getElementById('menu-toggle');
const nav = document.querySelector('#navbar ul');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  // Chiudi menu quando clicchi un link
  const links = nav.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
    });
  });
}

// ------------------------------
// Evidenzia la voce attiva nel menu
// ------------------------------
const currentPage = window.location.pathname.split('/').pop().toLowerCase();
const navLinks = document.querySelectorAll('#navbar a');

navLinks.forEach(link => {
  const href = link.getAttribute('href').split('/').pop().toLowerCase();
  if (href === currentPage) {
    link.classList.add('active');
  }
});

// ------------------------------
// Effetto scroll reveal
// ------------------------------
const faders = document.querySelectorAll('.fade-in');
if (faders.length > 0) {
  const options = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, options);

  faders.forEach(fader => observer.observe(fader));
}

// ------------------------------
// Funzione per creare query string e redirect
// ------------------------------
function redirectWithParams(page, data) {
  const params = new URLSearchParams(data);
  window.location.href = page + "?" + params.toString();
}

// ------------------------------
// Form Contatti (generato via JS)
// ------------------------------
function renderContattiForm() {
  const container = document.getElementById('form-contatti');
  if (!container) return;

  container.innerHTML = `
    <form id="contatti-form">
      <input type="text" id="nome" placeholder="Nome" required>
      <input type="email" id="email" placeholder="Email" required>
      <textarea id="messaggio" placeholder="Messaggio" required></textarea>
      <button type="submit" class="btn">Invia</button>
    </form>
  `;

  const form = document.getElementById('contatti-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      tipo: "contatti",
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      messaggio: document.getElementById('messaggio').value
    };
    redirectWithParams("conferma.html", data);
  });
}

// ------------------------------
// Form Lavora con noi (generato via JS)
// ------------------------------
function renderLavoroForm() {
  const container = document.getElementById('form-lavoro');
  if (!container) return;

  container.innerHTML = `
    <form id="lavoro-form">
      <input type="text" id="nomecognome" placeholder="Nome e Cognome" required>
      <input type="email" id="emailLav" placeholder="Email" required>
      <label for="ruolo">Ruolo desiderato:</label>
      <select id="ruolo" required>
        <option value="">-- Seleziona un ruolo --</option>
        <option value="muratore">Muratore</option>
        <option value="carpentiere">Carpentiere</option>
        <option value="ingegnere">Ingegnere</option>
        <option value="architetto">Architetto</option>
        <option value="altro">Altro</option>
      </select>
      <textarea id="presentazione" placeholder="Presentati brevemente" required></textarea>
      <button type="submit" class="btn">Invia candidatura</button>
    </form>
  `;

  const form = document.getElementById('lavoro-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      tipo: "lavoro",
      nomecognome: document.getElementById('nomecognome').value,
      emailLav: document.getElementById('emailLav').value,
      ruolo: document.getElementById('ruolo').value,
      presentazione: document.getElementById('presentazione').value
    };
    redirectWithParams("conferma.html", data);
  });
}

// ------------------------------
// Pagina Conferma: mostra i dati inviati
// ------------------------------
function renderConferma() {
  const titolo = document.getElementById('titolo');
  if (!titolo) return;

  const params = new URLSearchParams(window.location.search);
  const tipo = params.get("tipo");

  if (tipo === "contatti") {
    titolo.textContent = "Richiesta contatto inviata";
    document.getElementById('blocco-contatti').style.display = "block";
    document.getElementById('outputNome').textContent = params.get("nome");
    document.getElementById('outputEmail').textContent = params.get("email");
    document.getElementById('outputMessaggio').textContent = params.get("messaggio");
  } else if (tipo === "lavoro") {
    titolo.textContent = "Candidatura inviata";
    document.getElementById('blocco-lavoro').style.display = "block";
    document.getElementById('outputNomeCognome').textContent = params.get("nomecognome");
    document.getElementById('outputEmailLav').textContent = params.get("emailLav");
    document.getElementById('outputRuolo').textContent = params.get("ruolo");
    document.getElementById('outputPresentazione').textContent = params.get("presentazione");
  } else {
    titolo.textContent = "Dati inviati";
  }
}

// ------------------------------
// Router: decide cosa fare in base alla pagina
// ------------------------------
const page = window.location.pathname.split('/').pop().toLowerCase();
if (page === "contatti.html") {
  renderContattiForm();
} else if (page === "lavora-con-noi.html") {
  renderLavoroForm();
} else if (page === "conferma.html") {
  renderConferma();
}
