/**
 * elevenOne AI Services – Admin Panel
 * Benutzerverwaltung: Alle User anzeigen, bearbeiten, UC-Zuweisungen verwalten
 */
import { auth, USE_CASES, toast } from './app.js';

// ── Admin Guard ──────────────────────────────────────────────
// seedTestCustomers läuft beim Import von app.js noch nicht – Guard auf localStorage
(function checkAdminAccess() {
  try {
    const session = JSON.parse(localStorage.getItem('e1_session'));
    if (!session || session.expiresAt < Date.now()) {
      window.location.replace('auth.html');
    } else if (session.role !== 'admin') {
      window.location.replace('dashboard.html');
    }
  } catch {
    window.location.replace('auth.html');
  }
})();

// ── State ────────────────────────────────────────────────────
const state = {
  users: [],
  selectedUserId: null
};

// ── localStorage Helfer ──────────────────────────────────────
function loadUsers() {
  try { return JSON.parse(localStorage.getItem('e1_users')) || []; }
  catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem('e1_users', JSON.stringify(users));
}

function getUserUCs(userId) {
  try { return JSON.parse(localStorage.getItem(`e1_rented_ucs_${userId}`)) || []; }
  catch { return []; }
}

function saveUserUCs(userId, ucs) {
  localStorage.setItem(`e1_rented_ucs_${userId}`, JSON.stringify(ucs));
}

// ── Initialisierung ──────────────────────────────────────────
function init() {
  state.users = loadUsers();

  // Datum
  const dateEl = document.getElementById('adminDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('de-DE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  // Admin-E-Mail in Sidebar
  const emailEl = document.getElementById('adminSidebarEmail');
  if (emailEl) emailEl.textContent = auth.getSession()?.email || 'admin@elevenone.at';

  updateAdminStats();
  renderUserTable();
  initPanel();
  initSidebar();
  initSearch();
}

// ── Admin Stats ──────────────────────────────────────────────
function updateAdminStats() {
  const customers = state.users.filter(u => u.role !== 'admin');
  const allUCs = customers.flatMap(u => getUserUCs(u.id));
  const liveUCs = allUCs.filter(u => u.status === 'live').length;
  const testUCs = allUCs.filter(u => u.status === 'test').length;

  // Geschätzter Monatsumsatz: Summe der Preise aller Live- und Test-UCs
  const monthlyRevenue = allUCs
    .filter(u => u.status === 'live' || u.status === 'test')
    .reduce((sum, u) => {
      const uc = USE_CASES.find(c => c.id === u.ucId);
      return sum + (uc?.priceMonthly || 0);
    }, 0);

  document.getElementById('adminStatUsers').textContent = customers.length;
  document.getElementById('adminStatLive').textContent = liveUCs;
  document.getElementById('adminStatTest').textContent = testUCs;
  document.getElementById('adminStatRevenue').textContent =
    `€ ${monthlyRevenue.toLocaleString('de-DE')}`;
}

// ── User-Tabelle rendern ─────────────────────────────────────
function renderUserTable(filter = '') {
  const tbody = document.getElementById('userTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const customers = state.users.filter(u => {
    if (u.role === 'admin') return false;
    if (!filter) return true;
    const q = filter.toLowerCase();
    return (u.company?.toLowerCase().includes(q)) ||
           (u.email.toLowerCase().includes(q)) ||
           (u.billing?.city?.toLowerCase().includes(q)) ||
           ((u.firstName + ' ' + u.lastName).toLowerCase().includes(q));
  });

  if (customers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;padding:2.5rem;color:var(--text-muted);font-family:var(--font-mono);font-size:0.75rem;letter-spacing:0.08em;">
          Keine Benutzer gefunden.
        </td>
      </tr>`;
    return;
  }

  customers.forEach(user => {
    const ucs = getUserUCs(user.id);
    const liveCount = ucs.filter(u => u.status === 'live').length;
    const testCount = ucs.filter(u => u.status === 'test').length;
    const demoCount = ucs.filter(u => u.status === 'demo').length;
    const initials = (
      (user.firstName?.[0] || '') + (user.lastName?.[0] || '')
    ).toUpperCase() || user.email.substring(0, 2).toUpperCase();

    const tr = document.createElement('tr');
    tr.className = 'user-table-row';
    tr.dataset.userId = user.id;

    const ucBadges = [
      liveCount > 0 ? `<span class="badge badge-live">${liveCount} Live</span>` : '',
      testCount > 0 ? `<span class="badge badge-test">${testCount} Test</span>` : '',
      demoCount > 0 ? `<span class="badge badge-demo">${demoCount} Demo</span>` : ''
    ].filter(Boolean).join('') || '<span style="color:var(--text-muted);font-size:0.68rem;font-family:var(--font-mono);">–</span>';

    tr.innerHTML = `
      <td>
        <div class="user-table-avatar">${initials}</div>
      </td>
      <td>
        <div class="user-table-company">${user.company || '–'}</div>
        <div class="user-table-name">${user.firstName || ''} ${user.lastName || ''}</div>
      </td>
      <td>
        <span class="user-table-email">${user.email}</span>
      </td>
      <td>
        <span class="user-table-city">${user.billing?.city || '–'}, ${user.billing?.country || ''}</span>
      </td>
      <td>
        <div class="uc-count-badges">${ucBadges}</div>
      </td>
      <td>
        <span class="user-table-date">${new Date(user.registeredAt).toLocaleDateString('de-DE')}</span>
      </td>
      <td>
        <button class="btn btn-ghost btn-sm" data-action="edit" data-user-id="${user.id}">Bearbeiten</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Zeile anklicken → Panel öffnen
  tbody.querySelectorAll('.user-table-row').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') openUserPanel(row.dataset.userId);
    });
  });
  tbody.querySelectorAll('[data-action="edit"]').forEach(btn => {
    btn.addEventListener('click', () => openUserPanel(btn.dataset.userId));
  });
}

// ── Edit Panel öffnen ────────────────────────────────────────
function openUserPanel(userId) {
  const user = state.users.find(u => u.id === userId);
  if (!user) return;
  state.selectedUserId = userId;

  // Formularfelder befüllen
  document.getElementById('editFirstName').value = user.firstName || '';
  document.getElementById('editLastName').value  = user.lastName  || '';
  document.getElementById('editCompany').value   = user.company   || '';
  document.getElementById('editEmail').value     = user.email     || '';
  document.getElementById('editStreet').value    = user.billing?.street  || '';
  document.getElementById('editZip').value       = user.billing?.zip     || '';
  document.getElementById('editCity').value      = user.billing?.city    || '';
  document.getElementById('editCountry').value   = user.billing?.country || 'Österreich';
  document.getElementById('editUstId').value     = user.billing?.ustIdNr || '';

  // Panel-Titel
  document.getElementById('panelUserName').textContent  = user.company || user.email;
  document.getElementById('panelUserEmail').textContent = user.email;

  // UC-Liste rendern
  renderPanelUCList(userId);

  // Panel öffnen
  document.getElementById('panelOverlay').classList.add('open');
  document.getElementById('editPanel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ── UC-Liste im Panel ────────────────────────────────────────
function renderPanelUCList(userId) {
  const container = document.getElementById('editPanelUCList');
  if (!container) return;

  const ucs = getUserUCs(userId);
  container.innerHTML = '';

  if (ucs.length === 0) {
    container.innerHTML = `
      <p style="color:var(--text-muted);font-size:0.78rem;font-family:var(--font-mono);">Keine Use Cases zugewiesen.</p>`;
  } else {
    ucs.forEach(rentedUC => {
      const uc = USE_CASES.find(u => u.id === rentedUC.ucId);
      if (!uc) return;

      const statusLabels = { demo: 'Demo', test: 'Testphase', live: 'Live' };
      const row = document.createElement('div');
      row.className = 'admin-uc-row';
      row.innerHTML = `
        <div class="admin-uc-info">
          <span class="admin-uc-name">${uc.name}</span>
          <span class="badge badge-${rentedUC.status}">${statusLabels[rentedUC.status] || rentedUC.status}</span>
        </div>
        <div class="admin-uc-actions">
          <select class="admin-uc-status-select" title="Status ändern">
            <option value="demo" ${rentedUC.status === 'demo' ? 'selected' : ''}>Demo</option>
            <option value="test" ${rentedUC.status === 'test' ? 'selected' : ''}>Testphase</option>
            <option value="live" ${rentedUC.status === 'live' ? 'selected' : ''}>Live</option>
          </select>
          <button class="admin-uc-remove-btn" title="Entfernen">✕</button>
        </div>
      `;

      // Status-Änderung
      row.querySelector('.admin-uc-status-select').addEventListener('change', e => {
        const updated = getUserUCs(userId).map(u =>
          u.ucId === rentedUC.ucId ? { ...u, status: e.target.value } : u
        );
        saveUserUCs(userId, updated);
        toast.show(`Status "${uc.name}" → ${statusLabels[e.target.value]}.`, 'success');
        updateAdminStats();
        renderUserTable(document.getElementById('userSearch')?.value || '');
        renderPanelUCList(userId);
      });

      // Entfernen
      row.querySelector('.admin-uc-remove-btn').addEventListener('click', () => {
        const updated = getUserUCs(userId).filter(u => u.ucId !== rentedUC.ucId);
        saveUserUCs(userId, updated);
        toast.show(`"${uc.name}" entfernt.`, 'info');
        updateAdminStats();
        renderUserTable(document.getElementById('userSearch')?.value || '');
        renderPanelUCList(userId);
      });

      container.appendChild(row);
    });
  }

  // "+ UC hinzufügen" Button
  const addBtn = document.createElement('button');
  addBtn.className = 'btn btn-ghost btn-sm';
  addBtn.style.cssText = 'margin-top:var(--s1);width:100%;';
  addBtn.textContent = '+ Use Case hinzufügen';
  addBtn.addEventListener('click', () => showAddUCSelect(userId));
  container.appendChild(addBtn);
}

// ── UC hinzufügen ────────────────────────────────────────────
function showAddUCSelect(userId) {
  const container = document.getElementById('editPanelUCList');
  if (!container) return;

  // Bereits vorhandene Add-Row entfernen
  container.querySelector('.admin-uc-add-row')?.remove();

  const currentUCIds = getUserUCs(userId).map(u => u.ucId);
  const available = USE_CASES.filter(uc => !currentUCIds.includes(uc.id));

  if (available.length === 0) {
    toast.show('Alle Use Cases bereits zugewiesen.', 'info');
    return;
  }

  const addRow = document.createElement('div');
  addRow.className = 'admin-uc-add-row';
  addRow.innerHTML = `
    <select class="form-control" id="addUCSelectEl" style="font-size:0.78rem;flex:1;">
      <option value="">Use Case auswählen...</option>
      ${available.map(uc => `<option value="${uc.id}">${uc.name} (€${uc.priceMonthly}/Mo.)</option>`).join('')}
    </select>
    <button class="lifecycle-btn lifecycle-btn-live" id="confirmAddUCBtn" style="white-space:nowrap;">Hinzufügen</button>
  `;
  container.appendChild(addRow);

  document.getElementById('confirmAddUCBtn').addEventListener('click', () => {
    const ucId = document.getElementById('addUCSelectEl').value;
    if (!ucId) { toast.show('Bitte einen Use Case auswählen.', 'warning'); return; }

    const ucs = getUserUCs(userId);
    ucs.push({
      ucId,
      rentedAt: new Date().toISOString(),
      status: 'demo',
      testRuns: 0,
      config: {},
      lastRun: null,
      successRate: null
    });
    saveUserUCs(userId, ucs);

    const uc = USE_CASES.find(u => u.id === ucId);
    toast.show(`"${uc?.name}" hinzugefügt.`, 'success');
    updateAdminStats();
    renderUserTable(document.getElementById('userSearch')?.value || '');
    renderPanelUCList(userId);
  });
}

// ── Benutzer speichern ───────────────────────────────────────
function saveUserEdit() {
  const userId = state.selectedUserId;
  if (!userId) return;

  const users = loadUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return;

  const newEmail = document.getElementById('editEmail').value.trim().toLowerCase();

  // E-Mail-Eindeutigkeit prüfen (außer eigene)
  const emailTaken = users.some(u => u.id !== userId && u.email.toLowerCase() === newEmail);
  if (emailTaken) {
    toast.show('Diese E-Mail-Adresse ist bereits vergeben.', 'error');
    return;
  }

  users[idx] = {
    ...users[idx],
    firstName: document.getElementById('editFirstName').value.trim(),
    lastName:  document.getElementById('editLastName').value.trim(),
    company:   document.getElementById('editCompany').value.trim(),
    email:     newEmail,
    billing: {
      street:   document.getElementById('editStreet').value.trim(),
      zip:      document.getElementById('editZip').value.trim(),
      city:     document.getElementById('editCity').value.trim(),
      country:  document.getElementById('editCountry').value.trim(),
      ustIdNr:  document.getElementById('editUstId').value.trim()
    }
  };

  saveUsers(users);
  state.users = users;

  document.getElementById('panelUserName').textContent  = users[idx].company || users[idx].email;
  document.getElementById('panelUserEmail').textContent = users[idx].email;

  renderUserTable(document.getElementById('userSearch')?.value || '');
  toast.show('Benutzerdaten gespeichert.', 'success');
}

// ── Benutzer löschen ─────────────────────────────────────────
function deleteUser() {
  const userId = state.selectedUserId;
  if (!userId) return;

  const user = state.users.find(u => u.id === userId);
  const label = user?.company || user?.email || userId;

  if (!confirm(`Benutzer "${label}" wirklich endgültig löschen?\nAlle Daten und UC-Zuweisungen werden entfernt.\nDiese Aktion kann nicht rückgängig gemacht werden.`)) return;

  const users = loadUsers().filter(u => u.id !== userId);
  saveUsers(users);
  localStorage.removeItem(`e1_rented_ucs_${userId}`);

  state.users = users;
  closePanel();
  updateAdminStats();
  renderUserTable();
  toast.show(`Benutzer "${label}" gelöscht.`, 'warning');
}

// ── Panel schließen ──────────────────────────────────────────
function closePanel() {
  document.getElementById('panelOverlay')?.classList.remove('open');
  document.getElementById('editPanel')?.classList.remove('open');
  document.body.style.overflow = '';
  state.selectedUserId = null;
}

// ── Panel Events ─────────────────────────────────────────────
function initPanel() {
  document.getElementById('panelClose')?.addEventListener('click', closePanel);
  document.getElementById('cancelEditBtn')?.addEventListener('click', closePanel);
  document.getElementById('panelOverlay')?.addEventListener('click', closePanel);
  document.getElementById('saveUserBtn')?.addEventListener('click', saveUserEdit);
  document.getElementById('deleteUserBtn')?.addEventListener('click', deleteUser);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
}

// ── Sidebar Events ───────────────────────────────────────────
function initSidebar() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  toggle?.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.getElementById('logoutBtn')?.addEventListener('click', () => auth.logout());
}

// ── Suche ────────────────────────────────────────────────────
function initSearch() {
  document.getElementById('userSearch')?.addEventListener('input', e => {
    renderUserTable(e.target.value);
  });
}

// ── Start ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
