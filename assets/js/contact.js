/**
 * elevenOne AI Services – Kontaktformular
 */
import { toast } from './app.js';

function setError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.style.borderColor = message ? 'var(--accent-red)' : '';
  if (error) error.textContent = message;
}

function validate() {
  let valid = true;

  const firstName = document.getElementById('contactFirstName')?.value.trim();
  const lastName  = document.getElementById('contactLastName')?.value.trim();
  const email     = document.getElementById('contactEmail')?.value.trim();
  const subject   = document.getElementById('contactSubject')?.value;
  const message   = document.getElementById('contactMessage')?.value.trim();
  const dsgvo     = document.getElementById('contactDsgvo')?.checked;

  if (!firstName) { setError('contactFirstName', 'contactFirstNameError', 'Vorname ist erforderlich.'); valid = false; }
  else setError('contactFirstName', 'contactFirstNameError', '');

  if (!lastName)  { setError('contactLastName', 'contactLastNameError', 'Nachname ist erforderlich.'); valid = false; }
  else setError('contactLastName', 'contactLastNameError', '');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('contactEmail', 'contactEmailError', 'Gültige E-Mail-Adresse erforderlich.'); valid = false;
  } else setError('contactEmail', 'contactEmailError', '');

  if (!subject) { setError('contactSubject', 'contactSubjectError', 'Bitte Betreff wählen.'); valid = false; }
  else setError('contactSubject', 'contactSubjectError', '');

  if (!message || message.length < 10) {
    setError('contactMessage', 'contactMessageError', 'Bitte mindestens 10 Zeichen eingeben.'); valid = false;
  } else setError('contactMessage', 'contactMessageError', '');

  const dsgvoError = document.getElementById('contactDsgvoError');
  if (!dsgvo) { if (dsgvoError) dsgvoError.textContent = 'Bitte Datenschutzerklärung akzeptieren.'; valid = false; }
  else if (dsgvoError) dsgvoError.textContent = '';

  return valid;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('contactSubmitBtn');
  const successDiv = document.getElementById('contactSuccess');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

    if (!validate()) return;

    btn.disabled = true;
    btn.textContent = '⟳ Wird gesendet...';

    // Simulierter Versand
    await new Promise(r => setTimeout(r, 1200));

    // Erfolg anzeigen
    form.style.display = 'none';
    if (successDiv) successDiv.style.display = 'block';
    toast.show('Ihre Nachricht wurde erfolgreich gesendet!', 'success');
  });
});
