/**
 * elevenOne AI Services – Demo-Seite
 * UC-Karten, Filter, Demo-Modal, Typewriter-Simulation
 */
import { USE_CASES, auth, toast } from './app.js';

// ── UC-Karten rendern ───────────────────────────────────────
function renderUCGrid(filter = 'all') {
  const grid = document.getElementById('ucGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? USE_CASES
    : USE_CASES.filter(uc => uc.category === filter);

  filtered.forEach((uc, i) => {
    const card = document.createElement('div');
    card.className = 'uc-card reveal';
    card.dataset.ucId = uc.id;
    card.dataset.category = uc.category;
    card.style.transitionDelay = `${Math.min(i * 40, 400)}ms`;

    card.innerHTML = `
      <div class="uc-card-header">
        <span class="category-tag cat-${uc.category}">${uc.categoryLabel}</span>
        <div class="complexity-dots" title="Komplexität: ${uc.complexity}/3">
          ${[1,2,3].map(n => `<div class="complexity-dot${n <= uc.complexity ? ' active' : ''}"></div>`).join('')}
        </div>
      </div>
      <h3 class="uc-card-title">${uc.name}</h3>
      <p class="uc-card-description">${uc.description}</p>
      <div class="uc-card-meta">
        <span class="label-mono-muted">Zeitersparnis</span>
        <span class="label-mono" style="margin-left:auto;">${uc.timeSavings}</span>
      </div>
      <div class="uc-card-actions">
        <button class="btn btn-secondary btn-sm demo-btn" data-uc-id="${uc.id}">▶ Demo starten</button>
        <button class="btn btn-ghost btn-sm rent-btn" data-uc-id="${uc.id}">
          ${auth.isLoggedIn() ? 'Jetzt mieten' : '🔒 Anmelden & mieten'}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  // Reveal-Animation auslösen
  requestAnimationFrame(() => {
    document.querySelectorAll('.uc-card.reveal').forEach(el => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
      }, { threshold: 0.05 });
      observer.observe(el);
    });
  });

  // Event-Listener für Karten-Buttons
  grid.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.ucId));
  });

  grid.querySelectorAll('.rent-btn').forEach(btn => {
    btn.addEventListener('click', () => handleRent(btn.dataset.ucId));
  });
}

// ── Filter ──────────────────────────────────────────────────
function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderUCGrid(btn.dataset.filter);
    });
  });
}

// ── Mieten-Handler ──────────────────────────────────────────
function handleRent(ucId) {
  if (auth.isLoggedIn()) {
    // UC im Dashboard hinzufügen
    const session = auth.getSession();
    const key = `e1_rented_ucs_${session.userId}`;
    let rentedUCs = JSON.parse(localStorage.getItem(key) || '[]');

    if (rentedUCs.find(r => r.ucId === ucId)) {
      toast.show('Dieser Use Case ist bereits in Ihrem Dashboard.', 'info');
      setTimeout(() => window.location.href = 'dashboard.html', 1500);
      return;
    }

    rentedUCs.push({
      ucId,
      rentedAt: new Date().toISOString(),
      status: 'demo',
      testRuns: 0,
      config: {},
      lastRun: null,
      successRate: null
    });

    localStorage.setItem(key, JSON.stringify(rentedUCs));
    toast.show('Use Case wurde Ihrem Dashboard hinzugefügt!', 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
  } else {
    // Login-Prompt
    const uc = USE_CASES.find(u => u.id === ucId);
    toast.show(`Melden Sie sich an, um "${uc?.name}" zu mieten.`, 'info');
    setTimeout(() => window.location.href = `auth.html?uc=${ucId}`, 1800);
  }
}

// ── Modal ───────────────────────────────────────────────────
let currentUC = null;
let isSimRunning = false;

function openModal(ucId) {
  const uc = USE_CASES.find(u => u.id === ucId);
  if (!uc) return;

  currentUC = uc;

  // Inhalte befüllen
  document.getElementById('modalTitle').textContent = uc.name;
  document.getElementById('modalDescription').textContent = uc.longDescription;
  document.getElementById('modalTimeSavings').textContent = uc.timeSavings;

  // Kategorie-Tag
  const catEl = document.getElementById('modalCategory');
  catEl.className = `category-tag cat-${uc.category}`;
  catEl.textContent = uc.categoryLabel;

  // Komplexitätspunkte
  const complexEl = document.getElementById('modalComplexity');
  complexEl.innerHTML = [1,2,3].map(n => `<div class="complexity-dot${n <= uc.complexity ? ' active' : ''}"></div>`).join('');

  // Parameter-Formular
  const paramsEl = document.getElementById('modalParams');
  paramsEl.innerHTML = uc.configParams.map(param => {
    if (param.type === 'select' && param.options) {
      return `
        <div class="form-group">
          <label class="form-label">${param.label}${param.required ? ' *' : ''}</label>
          <select class="form-control" name="${param.key}">
            ${param.options.map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>
      `;
    }
    if (param.type === 'checkbox') {
      return `
        <label class="form-check">
          <input type="checkbox" name="${param.key}" ${param.default ? 'checked' : ''} />
          <span class="form-check-label">${param.label}</span>
        </label>
      `;
    }
    return `
      <div class="form-group">
        <label class="form-label">${param.label}${param.required ? ' *' : ''}</label>
        <input type="${param.type}" class="form-control" name="${param.key}"
               placeholder="${param.placeholder || ''}"
               value="${param.default || ''}" />
      </div>
    `;
  }).join('');

  // Tags
  const tagsEl = document.getElementById('modalTags');
  tagsEl.innerHTML = uc.tags.map(tag =>
    `<span style="font-family:var(--font-mono);font-size:0.65rem;padding:0.2em 0.6em;border:1px solid var(--border-subtle);border-radius:2px;color:var(--text-muted);">${tag}</span>`
  ).join('');

  // Simulation zurücksetzen
  resetSimulation();

  // Modal öffnen
  document.getElementById('demoModal').classList.add('open');
  document.body.style.overflow = 'hidden';

  // CTA-Link
  document.getElementById('simCTALink').href =
    auth.isLoggedIn() ? `dashboard.html?uc=${ucId}` : `auth.html?uc=${ucId}`;
}

function closeModal() {
  document.getElementById('demoModal').classList.remove('open');
  document.body.style.overflow = '';
  isSimRunning = false;
  currentUC = null;
}

function resetSimulation() {
  const output = document.getElementById('simOutput');
  const progress = document.getElementById('simProgress');
  const progressFill = document.getElementById('simProgressFill');
  const runBtn = document.getElementById('runSimBtn');
  const resetBtn = document.getElementById('resetSimBtn');
  const cta = document.getElementById('simCTA');

  output.innerHTML = '<span class="comment">// Bereit für Simulation\n// Parameter oben anpassen und "Starten" klicken\n</span>';
  if (progress) progress.style.display = 'none';
  if (progressFill) progressFill.style.width = '0%';
  if (runBtn) runBtn.style.display = 'flex';
  if (resetBtn) resetBtn.style.display = 'none';
  if (cta) cta.style.display = 'none';
  isSimRunning = false;
}

// Typewriter-Effekt für Demo-Output
async function typewriterEffect(text, container) {
  container.innerHTML = '';

  const lines = text.split('\n');

  for (const line of lines) {
    const lineEl = document.createElement('div');
    container.appendChild(lineEl);

    // Farbe bestimmen
    if (line.startsWith('//') || line.startsWith('#')) {
      lineEl.style.color = 'var(--text-muted)';
    } else if (line.includes('✓') || line.includes('✅')) {
      lineEl.style.color = 'var(--accent-cyan)';
    } else if (line.includes('⚠') || line.includes('🟡')) {
      lineEl.style.color = 'var(--accent-amber)';
    } else if (line.includes('🔴') || line.includes('KRITISCH')) {
      lineEl.style.color = 'var(--accent-red)';
    } else if (line.includes('→') || line.includes('•')) {
      lineEl.style.color = 'var(--text-secondary)';
    }

    // Zeichen für Zeichen ausgeben
    for (const char of line) {
      if (!isSimRunning) return; // Abbruch bei Reset
      lineEl.textContent += char;
      await sleep(12);
    }
    lineEl.textContent += '';

    // Auto-Scroll
    container.scrollTop = container.scrollHeight;
    await sleep(30);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulation starten
async function runSimulation() {
  if (!currentUC || isSimRunning) return;

  isSimRunning = true;

  const output = document.getElementById('simOutput');
  const progress = document.getElementById('simProgress');
  const progressFill = document.getElementById('simProgressFill');
  const runBtn = document.getElementById('runSimBtn');
  const resetBtn = document.getElementById('resetSimBtn');
  const cta = document.getElementById('simCTA');

  if (runBtn) { runBtn.disabled = true; runBtn.textContent = '⟳ Läuft...'; }
  if (progress) progress.style.display = 'block';

  // Fortschrittsbalken animieren
  const progressInterval = setInterval(() => {
    const current = parseFloat(progressFill.style.width) || 0;
    if (current < 90) progressFill.style.width = `${current + 2}%`;
  }, 80);

  // Lade-Nachricht
  output.innerHTML = '<span style="color:var(--text-muted);">// Verbindung wird hergestellt...\n// Daten werden verarbeitet...\n</span>';

  await sleep(1200);

  if (!isSimRunning) { clearInterval(progressInterval); return; }

  clearInterval(progressInterval);
  progressFill.style.width = '100%';
  await sleep(300);

  // Typewriter-Output
  await typewriterEffect(currentUC.demoOutput, output);

  if (!isSimRunning) return;

  // Abschluss
  if (progress) progress.style.display = 'none';
  if (runBtn) { runBtn.disabled = false; runBtn.style.display = 'none'; }
  if (resetBtn) resetBtn.style.display = 'flex';
  if (cta) cta.style.display = 'block';
  isSimRunning = false;
}

// ── Deep-Link Handler (für #uc-id in URL) ──────────────────
function handleDeepLink() {
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('uc-')) {
    setTimeout(() => openModal(hash), 500);
  }
}

// ── Initialisierung ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderUCGrid();
  initFilter();
  handleDeepLink();

  // Modal schließen
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('demoModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'demoModal') closeModal();
  });

  // Escape-Taste
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Simulation-Buttons
  document.getElementById('runSimBtn')?.addEventListener('click', runSimulation);
  document.getElementById('resetSimBtn')?.addEventListener('click', resetSimulation);
});
