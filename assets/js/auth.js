/**
 * elevenOne AI Services – Auth-Seite
 * Login/Registrierung mit localStorage Mock-Authentication
 */
import { auth, toast } from './app.js';

// Weiterleitung wenn bereits eingeloggt
if (auth.isLoggedIn()) {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  window.location.href = redirect ? `${redirect}.html` : 'dashboard.html';
}

// ── Tab-Wechsel ─────────────────────────────────────────────
function initTabs() {
  const tabLogin    = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const panelLogin  = document.getElementById('panelLogin');
  const panelReg    = document.getElementById('panelRegister');

  function switchToLogin() {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    panelLogin.classList.add('active');
    panelReg.classList.remove('active');
    clearErrors();
  }

  function switchToRegister() {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    panelReg.classList.add('active');
    panelLogin.classList.remove('active');
    clearErrors();
  }

  tabLogin?.addEventListener('click', switchToLogin);
  tabRegister?.addEventListener('click', switchToRegister);
  document.getElementById('switchToRegister')?.addEventListener('click', switchToRegister);
  document.getElementById('switchToLogin')?.addEventListener('click', switchToLogin);

  // Hash-basiertes Tab-Öffnen (#register)
  if (window.location.hash === '#register') {
    switchToRegister();
  }
}

// ── Fehler-Helfer ───────────────────────────────────────────
function setError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

function setInputError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.style.borderColor = message ? 'var(--accent-red)' : '';
  if (error) error.textContent = message;
}

// ── Login-Validierung ───────────────────────────────────────
function validateLogin() {
  let valid = true;

  const email = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value;

  if (!email) {
    setInputError('loginEmail', 'loginEmailError', 'E-Mail-Adresse ist erforderlich.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setInputError('loginEmail', 'loginEmailError', 'Bitte gültige E-Mail-Adresse eingeben.');
    valid = false;
  } else {
    setInputError('loginEmail', 'loginEmailError', '');
  }

  if (!password) {
    setInputError('loginPassword', 'loginPasswordError', 'Passwort ist erforderlich.');
    valid = false;
  } else {
    setInputError('loginPassword', 'loginPasswordError', '');
  }

  return valid;
}

// ── Registrierung-Validierung ───────────────────────────────
function validateRegister() {
  let valid = true;

  const fields = [
    ['regCompany',   'regCompanyError',   'Unternehmensname ist erforderlich.'],
    ['regFirstName', 'regFirstNameError', 'Vorname ist erforderlich.'],
    ['regLastName',  'regLastNameError',  'Nachname ist erforderlich.'],
    ['regStreet',    'regStreetError',    'Straße und Hausnummer sind erforderlich.'],
    ['regZip',       'regZipError',       'PLZ ist erforderlich.'],
    ['regCity',      'regCityError',      'Stadt ist erforderlich.'],
  ];

  fields.forEach(([inputId, errorId, msg]) => {
    const val = document.getElementById(inputId)?.value.trim();
    if (!val) {
      setInputError(inputId, errorId, msg);
      valid = false;
    } else {
      setInputError(inputId, errorId, '');
    }
  });

  // E-Mail
  const email = document.getElementById('regEmail')?.value.trim();
  if (!email) {
    setInputError('regEmail', 'regEmailError', 'E-Mail-Adresse ist erforderlich.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setInputError('regEmail', 'regEmailError', 'Bitte gültige E-Mail-Adresse eingeben.');
    valid = false;
  } else {
    setInputError('regEmail', 'regEmailError', '');
  }

  // Passwort
  const pw  = document.getElementById('regPassword')?.value;
  const pw2 = document.getElementById('regPasswordConfirm')?.value;

  if (!pw || pw.length < 8) {
    setInputError('regPassword', 'regPasswordError', 'Passwort muss mindestens 8 Zeichen haben.');
    valid = false;
  } else {
    setInputError('regPassword', 'regPasswordError', '');
  }

  if (pw !== pw2) {
    setInputError('regPasswordConfirm', 'regPasswordConfirmError', 'Passwörter stimmen nicht überein.');
    valid = false;
  } else {
    setInputError('regPasswordConfirm', 'regPasswordConfirmError', '');
  }

  // Checkboxen
  if (!document.getElementById('regAgb')?.checked) {
    setError('regAgbError', 'Bitte AGB akzeptieren.');
    valid = false;
  } else {
    setError('regAgbError', '');
  }

  if (!document.getElementById('regDsgvo')?.checked) {
    setError('regDsgvoError', 'Bitte Datenschutzverarbeitung zustimmen.');
    valid = false;
  } else {
    setError('regDsgvoError', '');
  }

  return valid;
}

// ── Login-Formular ──────────────────────────────────────────
function initLoginForm() {
  const form = document.getElementById('loginForm');
  const btn  = document.getElementById('loginSubmitBtn');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    if (!validateLogin()) return;

    btn.disabled = true;
    btn.textContent = '⟳ Anmelden...';

    // Kurze Verzögerung für UX
    await new Promise(r => setTimeout(r, 600));

    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const result = auth.login(email, password);

    if (result.success) {
      toast.show('Erfolgreich angemeldet!', 'success');
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      setTimeout(() => {
        window.location.href = redirect ? `${redirect}.html` : 'dashboard.html';
      }, 600);
    } else {
      setError('loginGeneralError', result.error || 'Anmeldung fehlgeschlagen.');
      btn.disabled = false;
      btn.textContent = 'Anmelden';
    }
  });

  // Passwort-vergessen-Link
  document.getElementById('forgotPassword')?.addEventListener('click', (e) => {
    e.preventDefault();
    toast.show('Ein Passwort-Reset-Link wurde an Ihre E-Mail gesendet. (Demo)', 'info');
  });
}

// ── Registrierungs-Formular ─────────────────────────────────
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  const btn  = document.getElementById('registerSubmitBtn');

  // Passwort-Stärke-Anzeige
  document.getElementById('regPassword')?.addEventListener('input', (e) => {
    const pw = e.target.value;
    const fill = document.getElementById('passwordStrengthFill');
    if (!fill) return;

    let strength = 0;
    if (pw.length >= 8)  strength += 25;
    if (pw.length >= 12) strength += 15;
    if (/[A-Z]/.test(pw)) strength += 20;
    if (/[0-9]/.test(pw)) strength += 20;
    if (/[^A-Za-z0-9]/.test(pw)) strength += 20;

    fill.style.width = `${Math.min(strength, 100)}%`;
    fill.style.background =
      strength < 40 ? 'var(--accent-red)' :
      strength < 70 ? 'var(--accent-amber)' :
                      'var(--accent-cyan)';
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    if (!validateRegister()) return;

    btn.disabled = true;
    btn.textContent = '⟳ Konto wird erstellt...';

    await new Promise(r => setTimeout(r, 800));

    const formData = {
      company:   document.getElementById('regCompany').value.trim(),
      firstName: document.getElementById('regFirstName').value.trim(),
      lastName:  document.getElementById('regLastName').value.trim(),
      email:     document.getElementById('regEmail').value.trim(),
      password:  document.getElementById('regPassword').value,
      street:    document.getElementById('regStreet').value.trim(),
      zip:       document.getElementById('regZip').value.trim(),
      city:      document.getElementById('regCity').value.trim(),
      country:   document.getElementById('regCountry').value,
      ustIdNr:   document.getElementById('regUstIdNr')?.value.trim() || ''
    };

    const result = auth.register(formData);

    if (result.success) {
      toast.show('Konto erfolgreich erstellt! Willkommen bei elevenOne!', 'success');
      const params = new URLSearchParams(window.location.search);
      const ucParam = params.get('uc');
      setTimeout(() => {
        window.location.href = ucParam
          ? `dashboard.html?uc=${ucParam}`
          : 'dashboard.html';
      }, 800);
    } else {
      setError('regGeneralError', result.error || 'Registrierung fehlgeschlagen.');
      btn.disabled = false;
      btn.textContent = 'Konto erstellen';
    }
  });
}

// ── Initialisierung ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initLoginForm();
  initRegisterForm();
});
