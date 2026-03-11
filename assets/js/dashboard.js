/**
 * elevenOne AI Services – Dashboard
 * UC Lifecycle State Machine, Config-Panel, localStorage Persistence
 */
import { auth, USE_CASES, toast } from './app.js';

// ── Auth Guard ──────────────────────────────────────────────
auth.guard('dashboard');

// ── State ───────────────────────────────────────────────────
let state = {
  user: null,
  session: null,
  rentedUCs: [],
  currentPanelUcId: null
};

// ── LocalStorage Helfer ─────────────────────────────────────
function loadRentedUCs() {
  if (!state.session) return [];
  try {
    return JSON.parse(localStorage.getItem(`e1_rented_ucs_${state.session.userId}`)) || [];
  } catch { return []; }
}

function saveRentedUCs(ucs) {
  if (!state.session) return;
  localStorage.setItem(`e1_rented_ucs_${state.session.userId}`, JSON.stringify(ucs));
}

function getRentedUC(ucId) {
  return state.rentedUCs.find(r => r.ucId === ucId);
}

function updateRentedUC(ucId, updates) {
  state.rentedUCs = state.rentedUCs.map(r =>
    r.ucId === ucId ? { ...r, ...updates } : r
  );
  saveRentedUCs(state.rentedUCs);
}

// ── Initialisierung ─────────────────────────────────────────
function init() {
  state.session = auth.getSession();
  state.user = auth.getUser();
  state.rentedUCs = loadRentedUCs();

  // URL-Parameter: UC direkt hinzufügen
  const params = new URLSearchParams(window.location.search);
  const ucParam = params.get('uc');
  if (ucParam) {
    addUC(ucParam);
  }

  updateSidebarUser();
  updateHeader();
  updateStats();
  renderUCGrid();
  initSidebar();
  initPanel();
}

// ── Sidebar befüllen ────────────────────────────────────────
function updateSidebarUser() {
  const s = state.session;
  if (!s) return;

  const initials = ((s.company || s.email || '??').substring(0, 2)).toUpperCase();

  const avatarEl = document.getElementById('userAvatarSidebar');
  const companyEl = document.getElementById('userCompanySidebar');
  const emailEl = document.getElementById('userEmailSidebar');

  if (avatarEl) avatarEl.textContent = initials;
  if (companyEl) companyEl.textContent = s.company || s.email;
  if (emailEl) emailEl.textContent = s.email;
}

// ── Header ──────────────────────────────────────────────────
function updateHeader() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Guten Morgen' : hour < 18 ? 'Guten Tag' : 'Guten Abend';

  const name = state.session?.firstName || state.session?.company || '';
  const greetingEl = document.getElementById('dashboardGreeting');
  const dateEl = document.getElementById('dashboardDate');

  if (greetingEl) greetingEl.textContent = `${greeting}${name ? ', ' + name : ''}.`;
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString('de-DE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}

// ── Stats berechnen ─────────────────────────────────────────
function updateStats() {
  const liveCount  = state.rentedUCs.filter(r => r.status === 'live').length;
  const testCount  = state.rentedUCs.filter(r => r.status === 'test' || r.status === 'demo').length;

  // Mock-Werte für Vorgänge und Stunden
  const totalRuns  = state.rentedUCs.reduce((sum, r) => sum + (r.testRuns * 127 || 0), 0) + liveCount * 284;
  const savedHours = state.rentedUCs
    .filter(r => r.status === 'live')
    .reduce((sum, r) => {
      const uc = USE_CASES.find(u => u.id === r.ucId);
      if (!uc) return sum;
      // Zeitersparnis aus String parsen (z.B. "6h / Woche")
      const match = uc.timeSavings.match(/(\d+)/);
      return sum + (match ? parseInt(match[1]) * 4 : 0);
    }, 0);

  document.getElementById('statLive').textContent  = liveCount;
  document.getElementById('statTest').textContent  = testCount;
  document.getElementById('statRuns').textContent  = totalRuns > 999 ? `${(totalRuns/1000).toFixed(1)}K` : totalRuns;
  document.getElementById('statHours').textContent = `${savedHours}h`;
}

// ── UC hinzufügen ───────────────────────────────────────────
function addUC(ucId) {
  if (state.rentedUCs.find(r => r.ucId === ucId)) return; // bereits vorhanden

  const newRented = {
    ucId,
    rentedAt: new Date().toISOString(),
    status: 'demo',
    testRuns: 0,
    config: {},
    lastRun: null,
    successRate: null
  };

  state.rentedUCs.push(newRented);
  saveRentedUCs(state.rentedUCs);
}

// ── UC-Grid rendern ─────────────────────────────────────────
function renderUCGrid() {
  const grid = document.getElementById('dashboardUCGrid');
  const emptyState = document.getElementById('emptyState');

  if (!grid) return;
  grid.innerHTML = '';

  if (state.rentedUCs.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Sortierung: live zuerst, dann test, dann demo
  const order = { live: 0, test: 1, demo: 2 };
  const sorted = [...state.rentedUCs].sort((a, b) =>
    (order[a.status] ?? 3) - (order[b.status] ?? 3)
  );

  sorted.forEach(rentedUC => {
    const uc = USE_CASES.find(u => u.id === rentedUC.ucId);
    if (!uc) return;

    const card = document.createElement('div');
    card.className = `dashboard-uc-card status-${rentedUC.status}`;
    card.dataset.ucId = uc.id;

    const badgeHtml = {
      demo: '<span class="badge badge-demo">Demo</span>',
      test: '<span class="badge badge-test">Testphase</span>',
      live: '<span class="badge badge-live">Live</span>'
    }[rentedUC.status] || '';

    const testProgress = rentedUC.status === 'test' || rentedUC.status === 'demo'
      ? `
        <div class="test-progress">
          <div class="test-progress-label">
            <span>Testläufe</span>
            <span>${rentedUC.testRuns} / 5</span>
          </div>
          <div class="test-progress-bar">
            <div class="test-progress-fill" style="width:${(rentedUC.testRuns / 5) * 100}%;"></div>
          </div>
        </div>
      ` : '';

    const liveMetrics = rentedUC.status === 'live'
      ? `
        <div class="live-metrics">
          <div class="live-metric">
            <div class="live-metric-value">${rentedUC.successRate ?? '98'}%</div>
            <div class="live-metric-label">Erfolgsrate</div>
          </div>
          <div class="live-metric">
            <div class="live-metric-value">${formatLastRun(rentedUC.lastRun)}</div>
            <div class="live-metric-label">Letzter Lauf</div>
          </div>
        </div>
      ` : '';

    const actionsHtml = buildCardActions(rentedUC, uc);

    card.innerHTML = `
      <div class="uc-card-top">
        <div>
          <div class="dashboard-uc-name">${uc.name}</div>
          <div class="dashboard-uc-category">${uc.categoryLabel}</div>
        </div>
        ${badgeHtml}
      </div>
      ${testProgress}
      ${liveMetrics}
      <div class="uc-card-actions">${actionsHtml}</div>
    `;

    grid.appendChild(card);
  });

  // Event-Listener für Karten-Buttons
  grid.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => handleCardAction(btn.dataset.action, btn.dataset.ucId));
  });
}

function buildCardActions(rentedUC, uc) {
  const { status, ucId, testRuns } = rentedUC;

  if (status === 'demo') {
    return `
      <button class="btn btn-secondary btn-sm" data-action="configure" data-uc-id="${ucId}">
        ⚙ Konfigurieren
      </button>
      <button class="btn btn-ghost btn-sm" data-action="remove" data-uc-id="${ucId}">
        Entfernen
      </button>
    `;
  }

  if (status === 'test') {
    const canGoLive = testRuns >= 3;
    return `
      <button class="btn btn-secondary btn-sm" data-action="configure" data-uc-id="${ucId}">
        ⚙ Konfigurieren
      </button>
      ${canGoLive
        ? `<button class="lifecycle-btn lifecycle-btn-live btn-sm" data-action="go-live" data-uc-id="${ucId}">✓ Live schalten</button>`
        : `<button class="btn btn-ghost btn-sm" data-action="run-test" data-uc-id="${ucId}">▶ Testlauf</button>`
      }
    `;
  }

  if (status === 'live') {
    return `
      <button class="btn btn-ghost btn-sm" data-action="configure" data-uc-id="${ucId}">
        Details & Konfig.
      </button>
      <button class="btn btn-secondary btn-sm" style="background:transparent;color:var(--accent-red);border-color:rgba(255,59,92,0.3);" data-action="pause" data-uc-id="${ucId}">
        Pausieren
      </button>
    `;
  }

  return '';
}

function formatLastRun(iso) {
  if (!iso) return '–';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'gerade';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours/24)}d`;
}

// ── Karten-Aktionen ─────────────────────────────────────────
function handleCardAction(action, ucId) {
  switch (action) {
    case 'configure': openPanel(ucId); break;
    case 'run-test':  runTest(ucId); break;
    case 'go-live':   goLive(ucId); break;
    case 'remove':    removeUC(ucId); break;
    case 'pause':     pauseUC(ucId); break;
  }
}

function removeUC(ucId) {
  const uc = USE_CASES.find(u => u.id === ucId);
  state.rentedUCs = state.rentedUCs.filter(r => r.ucId !== ucId);
  saveRentedUCs(state.rentedUCs);
  updateStats();
  renderUCGrid();
  toast.show(`"${uc?.name}" wurde entfernt.`, 'info');
}

function pauseUC(ucId) {
  updateRentedUC(ucId, { status: 'demo' });
  updateStats();
  renderUCGrid();
  const uc = USE_CASES.find(u => u.id === ucId);
  toast.show(`"${uc?.name}" wurde pausiert.`, 'warning');
}

function goLive(ucId) {
  const rentedUC = getRentedUC(ucId);
  if (!rentedUC) return;

  if (rentedUC.testRuns < 3) {
    toast.show('Mindestens 3 erfolgreiche Testläufe erforderlich.', 'warning');
    return;
  }

  updateRentedUC(ucId, {
    status: 'live',
    lastRun: new Date().toISOString(),
    successRate: 97 + Math.random() * 2.5
  });

  updateStats();
  renderUCGrid();

  const uc = USE_CASES.find(u => u.id === ucId);
  toast.show(`"${uc?.name}" ist jetzt live! 🎉`, 'success', 5000);
}

// ── Testlauf ────────────────────────────────────────────────
async function runTest(ucId) {
  const rentedUC = getRentedUC(ucId);
  const uc = USE_CASES.find(u => u.id === ucId);
  if (!rentedUC || !uc) return;

  // Status auf test setzen falls noch demo
  if (rentedUC.status === 'demo') {
    updateRentedUC(ucId, { status: 'test' });
  }

  toast.show(`Testlauf für "${uc.name}" wird gestartet...`, 'info');

  await new Promise(r => setTimeout(r, 1500));

  const newRuns = (rentedUC.testRuns || 0) + 1;
  updateRentedUC(ucId, {
    testRuns: newRuns,
    lastRun: new Date().toISOString()
  });

  updateStats();
  renderUCGrid();

  if (newRuns >= 3) {
    toast.show(`Testlauf ${newRuns}/5 erfolgreich! Use Case kann jetzt live geschaltet werden.`, 'success');
  } else {
    toast.show(`Testlauf ${newRuns}/5 erfolgreich abgeschlossen.`, 'success');
  }
}

// ── Config Panel ────────────────────────────────────────────
function openPanel(ucId) {
  const rentedUC = getRentedUC(ucId);
  const uc = USE_CASES.find(u => u.id === ucId);
  if (!rentedUC || !uc) return;

  state.currentPanelUcId = ucId;

  // Inhalte befüllen
  const catEl = document.getElementById('panelCategory');
  if (catEl) { catEl.className = `category-tag cat-${uc.category}`; catEl.textContent = uc.categoryLabel; }

  const titleEl = document.getElementById('panelTitle');
  if (titleEl) titleEl.textContent = uc.name;

  const badgeEl = document.getElementById('panelBadge');
  if (badgeEl) badgeEl.innerHTML = {
    demo: '<span class="badge badge-demo">Demo</span>',
    test: '<span class="badge badge-test">Testphase</span>',
    live: '<span class="badge badge-live">Live</span>'
  }[rentedUC.status] || '';

  // Config-Formular
  const formEl = document.getElementById('panelConfigForm');
  if (formEl) {
    formEl.innerHTML = uc.configParams.map(param => {
      const savedVal = rentedUC.config?.[param.key] ?? param.default ?? '';

      if (param.type === 'select' && param.options) {
        return `
          <div class="form-group">
            <label class="form-label">${param.label}${param.required ? ' *' : ''}</label>
            <select class="form-control" name="${param.key}">
              ${param.options.map(o => `<option value="${o}" ${o === savedVal ? 'selected' : ''}>${o}</option>`).join('')}
            </select>
          </div>`;
      }
      if (param.type === 'checkbox') {
        return `
          <label class="form-check">
            <input type="checkbox" name="${param.key}" ${savedVal ? 'checked' : ''} />
            <span class="form-check-label">${param.label}</span>
          </label>`;
      }
      return `
        <div class="form-group">
          <label class="form-label">${param.label}${param.required ? ' *' : ''}</label>
          <input type="${param.type}" class="form-control" name="${param.key}"
                 placeholder="${param.placeholder || ''}"
                 value="${savedVal}" />
        </div>`;
    }).join('');
  }

  // Testphase
  const testCount = document.getElementById('panelTestCount');
  const testFill  = document.getElementById('panelTestProgressFill');
  const testOutput = document.getElementById('panelTestOutput');
  const runTestBtn = document.getElementById('runTestBtn');
  const goLivePanelBtn = document.getElementById('goLiveBtn');

  if (testCount) testCount.textContent = `${rentedUC.testRuns} / 5`;
  if (testFill) testFill.style.width = `${(rentedUC.testRuns / 5) * 100}%`;
  if (testOutput) {
    testOutput.textContent = rentedUC.testRuns > 0
      ? `// Letzter Testlauf: ${new Date(rentedUC.lastRun).toLocaleString('de-DE')}\n// Status: Erfolgreich ✓\n\n${uc.demoOutput.split('\n').slice(0, 8).join('\n')}`
      : '// Noch keine Testläufe durchgeführt.\n// Konfiguration speichern und Testlauf starten.';
  }

  if (runTestBtn) {
    runTestBtn.style.display = rentedUC.status !== 'live' ? 'flex' : 'none';
  }
  if (goLivePanelBtn) {
    goLivePanelBtn.style.display = rentedUC.testRuns >= 3 && rentedUC.status !== 'live' ? 'flex' : 'none';
  }

  // Live-Metriken
  const liveSection  = document.getElementById('panelLiveSection');
  const liveMetrics  = document.getElementById('panelLiveMetrics');
  const testSection  = document.getElementById('panelTestSection');

  if (rentedUC.status === 'live') {
    if (liveSection) liveSection.style.display = 'block';
    if (testSection) testSection.style.display = 'none';
    if (liveMetrics) {
      liveMetrics.innerHTML = `
        <div class="live-metric">
          <div class="live-metric-value">${rentedUC.successRate?.toFixed(1) ?? '97.3'}%</div>
          <div class="live-metric-label">Erfolgsrate</div>
        </div>
        <div class="live-metric">
          <div class="live-metric-value">${formatLastRun(rentedUC.lastRun)}</div>
          <div class="live-metric-label">Letzter Lauf</div>
        </div>
        <div class="live-metric">
          <div class="live-metric-value" style="color:var(--accent-gold);">${Math.floor(Math.random() * 200 + 50)}</div>
          <div class="live-metric-label">Läufe (Monat)</div>
        </div>
        <div class="live-metric">
          <div class="live-metric-value" style="color:var(--accent-gold);">0</div>
          <div class="live-metric-label">Fehler (Monat)</div>
        </div>
      `;
    }
  } else {
    if (liveSection) liveSection.style.display = 'none';
    if (testSection) testSection.style.display = 'block';
  }

  // Panel öffnen
  document.getElementById('panelOverlay').classList.add('open');
  document.getElementById('configPanel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePanel() {
  document.getElementById('panelOverlay')?.classList.remove('open');
  document.getElementById('configPanel')?.classList.remove('open');
  document.body.style.overflow = '';
  state.currentPanelUcId = null;
}

function saveConfig() {
  const ucId = state.currentPanelUcId;
  if (!ucId) return;

  const form = document.getElementById('panelConfigForm');
  if (!form) return;

  const config = {};
  form.querySelectorAll('[name]').forEach(el => {
    if (el.type === 'checkbox') {
      config[el.name] = el.checked;
    } else {
      config[el.name] = el.value;
    }
  });

  updateRentedUC(ucId, { config });

  const uc = USE_CASES.find(u => u.id === ucId);
  toast.show(`Konfiguration für "${uc?.name}" gespeichert.`, 'success');
}

// ── Panel-Events ────────────────────────────────────────────
function initPanel() {
  document.getElementById('panelClose')?.addEventListener('click', closePanel);
  document.getElementById('cancelPanelBtn')?.addEventListener('click', closePanel);
  document.getElementById('panelOverlay')?.addEventListener('click', closePanel);

  document.getElementById('saveConfigBtn')?.addEventListener('click', () => {
    saveConfig();
  });

  document.getElementById('runTestBtn')?.addEventListener('click', async () => {
    const ucId = state.currentPanelUcId;
    if (!ucId) return;

    saveConfig();
    closePanel();
    await runTest(ucId);

    // Panel nach Testlauf wieder öffnen
    setTimeout(() => openPanel(ucId), 800);
  });

  document.getElementById('goLiveBtn')?.addEventListener('click', () => {
    const ucId = state.currentPanelUcId;
    if (!ucId) return;
    saveConfig();
    closePanel();
    setTimeout(() => goLive(ucId), 300);
  });
}

// ── Sidebar-Events ──────────────────────────────────────────
function initSidebar() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');

  toggle?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    auth.logout();
  });

  // Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });
}

// ── Start ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
