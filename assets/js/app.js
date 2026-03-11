/**
 * elevenOne AI Services – Core App
 * Auth-State, Navigation, Reveal-Animationen, Toast-System, USE_CASES-Daten
 */

// ── USE CASES Mock-Daten ────────────────────────────────────
export const USE_CASES = [
  {
    id: 'uc-001',
    name: 'Rechnungsverarbeitung KI',
    category: 'dokument',
    categoryLabel: 'Dokumentenverarbeitung',
    description: 'Automatische Extraktion, Validierung und Buchungsvorschlag für eingehende Rechnungen per OCR und KI.',
    longDescription: 'Verarbeitet PDF- und Bildrechnungen vollautomatisch: OCR-Extraktion aller relevanten Felder, Lieferantenabgleich, Plausibilitätsprüfung, Buchungskontoempfehlung und optionale automatische Freigabe bis zu einem definierten Schwellenwert. Integration mit gängigen ERP-Systemen via API.',
    complexity: 2,
    timeSavings: '6h / Woche',
    configParams: [
      { key: 'email_eingang', label: 'Eingangs-E-Mail-Adresse', type: 'email', placeholder: 'rechnungen@ihr-unternehmen.de', required: true },
      { key: 'buchungskonten', label: 'Buchungskonten (kommagetrennt)', type: 'text', placeholder: '4200,4400,4800', required: false },
      { key: 'schwellenwert', label: 'Auto-Freigabe bis (EUR)', type: 'number', placeholder: '500', default: 500, required: false },
      { key: 'erp_webhook', label: 'ERP Webhook URL (optional)', type: 'url', placeholder: 'https://ihr-erp.de/api/webhook', required: false }
    ],
    demoOutput: '// Verarbeitung abgeschlossen ─────────────────\nLieferant:     Muster GmbH\nRechnungsnr.:  RE-2024-00892\nDatum:         15.01.2024\nBetrag netto:  1.050,42 EUR\nMwSt (19%):      199,58 EUR\nBetrag brutto: 1.250,00 EUR\nFälligkeit:    14.02.2024\n\nKonto-Empfehlung: 4200 (Bürobedarf)\nStatus: ✓ Zur Freigabe vorgelegt\nVerarbeitungszeit: 1,2 Sekunden',
    priceMonthly: 299,
    tags: ['OCR', 'ERP-Integration', 'DSGVO', 'Auto-Freigabe']
  },
  {
    id: 'uc-002',
    name: 'E-Mail-Klassifizierung',
    category: 'kommunikation',
    categoryLabel: 'Kundenkommunikation',
    description: 'KI-gestützte Klassifizierung, Priorisierung und automatisches Routing eingehender E-Mails an die richtigen Teams.',
    longDescription: 'Analysiert eingehende E-Mails mit NLP und klassifiziert sie nach Kategorie, Dringlichkeit und Sentiment. Automatisches Routing an zuständige Teams, Erzeugung von Ticket-Entwürfen und optionale Auto-Replies für Standardanfragen. Lernend durch Feedback-Loop.',
    complexity: 1,
    timeSavings: '4h / Woche',
    configParams: [
      { key: 'postfach', label: 'Zu überwachendes Postfach', type: 'email', placeholder: 'info@ihr-unternehmen.de', required: true },
      { key: 'kategorien', label: 'Kategorien (kommagetrennt)', type: 'text', placeholder: 'Anfrage,Beschwerde,Bestellung,Support', required: true },
      { key: 'auto_reply', label: 'Auto-Reply aktivieren', type: 'checkbox', default: false, required: false }
    ],
    demoOutput: '// E-Mail-Analyse ──────────────────────────────\nBetreff:    "Dringende Anfrage wegen Lieferverzug"\nAbsender:   kunde@beispiel.de\n\nKlassifikation:\n  Kategorie:    Beschwerde\n  Priorität:    HOCH\n  Sentiment:    Negativ (Score: -0.72)\n  Abteilung:    Kundenservice\n\nEmpfohlene Aktion:\n  → Ticket erstellt: #CS-2024-1891\n  → Zugewiesen an: Team Kundenservice\n  → SLA: Antwort innerhalb 2h\n\nAuto-Reply gesendet: ✓',
    priceMonthly: 199,
    tags: ['NLP', 'Auto-Routing', 'Ticketing', 'Sentiment-Analyse']
  },
  {
    id: 'uc-003',
    name: 'Vertragsanalyse & Risiko',
    category: 'dokument',
    categoryLabel: 'Dokumentenverarbeitung',
    description: 'Automatische Analyse von Verträgen auf Risikopunkte, kritische Klauseln und Fristen mit KI-gestützter Zusammenfassung.',
    longDescription: 'Scannt Vertragsunterlagen (PDF/DOCX) auf definierte Risikokategorien, extrahiert wichtige Fristen und Klauseln, bewertet Vertragsrisiken nach vordefinierten Kriterien und erstellt strukturierte Zusammenfassungen für Entscheidungsträger. Konfigurierbar für verschiedene Vertragstypen.',
    complexity: 3,
    timeSavings: '8h / Woche',
    configParams: [
      { key: 'vertragstyp', label: 'Primärer Vertragstyp', type: 'select', options: ['Kaufvertrag', 'Dienstleistungsvertrag', 'Mietvertrag', 'Arbeitsvertrag', 'NDA'], required: true },
      { key: 'risikoklassen', label: 'Zu prüfende Risikokategorien', type: 'text', placeholder: 'Haftung,Kündigung,Datenschutz,Gerichtsstand', required: true },
      { key: 'fristen_alert', label: 'Fristenerinnerung (Tage im Voraus)', type: 'number', default: 30, required: false }
    ],
    demoOutput: '// Vertragsanalyse ─────────────────────────────\nDokument:  Rahmenvertrag_Lieferant_XY.pdf\nTyp:       Lieferantenvertrag (erkannt)\nSeiten:    28\n\nRisikobewertung: MITTEL\n\n⚠ KRITISCH (2 Punkte):\n  • Haftungsklausel §8: Unbegrenzte Haftung\n    vereinbart – Gegenklausel fehlt\n  • Automatische Verlängerung §15:\n    Kündigungsfrist nur 14 Tage\n\n📅 Fristen erkannt:\n  • Vertragslaufzeit: bis 31.12.2025\n  • Kündigung bis: 17.12.2025\n  • Preisanpassung: 01.07.2025\n\nEmpfehlung: Juristisches Review empfohlen',
    priceMonthly: 449,
    tags: ['LLM', 'Dokumentenanalyse', 'Risikobewertung', 'Fristenmanagement']
  },
  {
    id: 'uc-004',
    name: 'Kundendaten-Bereinigung',
    category: 'analyse',
    categoryLabel: 'Datenanalyse',
    description: 'KI-gestützte Deduplizierung, Normalisierung und Anreicherung von Kundenstammdaten aus verschiedenen Quellen.',
    longDescription: 'Analysiert Kundenstammdaten auf Duplikate, Inkonsistenzen und fehlende Werte. Normalisiert Adressdaten nach Postleitzahlenverzeichnis, dedupliziert Kontakte mit fuzzy matching und reichert Datensätze optional mit öffentlichen Firmendaten an.',
    complexity: 2,
    timeSavings: '5h / Monat',
    configParams: [
      { key: 'daten_quelle', label: 'Datenquelle (CSV-Upload oder API)', type: 'text', placeholder: 'https://ihr-crm.de/api/contacts', required: true },
      { key: 'duplikat_schwelle', label: 'Ähnlichkeitsschwelle Duplikate (%)', type: 'number', default: 85, required: false },
      { key: 'adress_normalisierung', label: 'Adressnormalisierung aktivieren', type: 'checkbox', default: true, required: false }
    ],
    demoOutput: '// Datenbereinigung abgeschlossen ──────────────\nDatensätze geprüft:   12.847\nVerarbeitungszeit:    4 Min. 23 Sek.\n\nErgebnisse:\n  Duplikate gefunden:    234 Paare\n  Duplikate gemergt:     198\n  Adressen normalisiert: 1.204\n  Fehlende PLZ ergänzt:   89\n  Firmendaten ergänzt:   445\n\nDatenqualität:\n  Vorher: 71,3%\n  Nachher: 96,8%\n  Verbesserung: +35,8%\n\nExport: kunden_bereinigt_2024-01-20.csv',
    priceMonthly: 349,
    tags: ['Data Quality', 'Deduplizierung', 'CRM-Integration', 'Adressnormalisierung']
  },
  {
    id: 'uc-005',
    name: 'Meeting-Protokoll KI',
    category: 'prozess',
    categoryLabel: 'Prozessautomatisierung',
    description: 'Automatische Transkription, Zusammenfassung und Aufgabenextraktion aus Meeting-Aufzeichnungen oder Live-Calls.',
    longDescription: 'Transkribiert Audio-/Video-Aufzeichnungen in Echtzeit, identifiziert Sprecher, extrahiert Beschlüsse und To-dos, erstellt strukturierte Protokolle nach Ihren Vorlagen und verteilt diese automatisch per E-Mail oder in Ihr Projektmanagement-Tool.',
    complexity: 1,
    timeSavings: '3h / Woche',
    configParams: [
      { key: 'sprache', label: 'Primärsprache', type: 'select', options: ['Deutsch', 'Englisch', 'Französisch', 'Spanisch'], required: true },
      { key: 'protokoll_email', label: 'Protokoll senden an', type: 'email', placeholder: 'team@ihr-unternehmen.de', required: false },
      { key: 'vorlage', label: 'Protokollvorlage', type: 'select', options: ['Standard', 'Entscheidungsprotokoll', 'Statusmeeting', 'Projektmeeting'], required: false }
    ],
    demoOutput: '// Meeting-Protokoll ───────────────────────────\nDatum:     20.01.2024, 10:00–11:15 Uhr\nTeilnehmer: M. Müller, S. Schmidt, T. Weber\nDauer:     75 Minuten (transkribiert)\n\nKernthemen:\n  1. Q1-Planung 2024\n  2. Budget-Review\n  3. Personalentscheidungen\n\nBeschlüsse:\n  ✓ Budget Q1 genehmigt: 250.000 EUR\n  ✓ Neueinstellung: 2 Entwickler\n\nAufgaben:\n  → M. Müller: Angebote bis 27.01.\n  → S. Schmidt: Report bis 25.01.\n\nProtokoll versendet an: team@ ✓',
    priceMonthly: 149,
    tags: ['Transkription', 'NLP', 'Aufgabenextraktion', 'Kalender-Integration']
  },
  {
    id: 'uc-006',
    name: 'Bewerbungsscreening KI',
    category: 'hr',
    categoryLabel: 'HR & Recruiting',
    description: 'Automatisches Screening und Ranking von Bewerbungen nach definierten Kriterien mit DSGVO-konformer Verarbeitung.',
    longDescription: 'Analysiert eingehende Bewerbungsunterlagen (PDF/DOCX) auf Basis Ihrer Stellenausschreibung. Extrahiert relevante Qualifikationen, bewertet den Fit-Score, filtert unvollständige Bewerbungen und erstellt ein strukturiertes Ranking für HR. Vollständig DSGVO-konform mit automatischer Löschfunktion.',
    complexity: 2,
    timeSavings: '10h / Stelle',
    configParams: [
      { key: 'stelle_bezeichnung', label: 'Stellenbezeichnung', type: 'text', placeholder: 'Senior Software Engineer', required: true },
      { key: 'muss_kriterien', label: 'Muss-Kriterien (kommagetrennt)', type: 'text', placeholder: 'Python,5 Jahre Erfahrung,Deutsch', required: true },
      { key: 'kann_kriterien', label: 'Kann-Kriterien (kommagetrennt)', type: 'text', placeholder: 'Kubernetes,React,MBA', required: false }
    ],
    demoOutput: '// Bewerbungsscreening ─────────────────────────\nStelle:  Senior Software Engineer\nEingegangene Bewerbungen: 47\nScreening abgeschlossen:  47/47\n\nRanking (Top 5):\n  #1 Müller, A.    | Fit: 94% | ✓ alle Kriterien\n  #2 Schmidt, B.   | Fit: 89% | ✓ Muss, 3/5 Kann\n  #3 Weber, C.     | Fit: 82% | ✓ Muss, 2/5 Kann\n  #4 Bauer, D.     | Fit: 78% | ✓ Muss, 1/5 Kann\n  #5 Fischer, E.   | Fit: 71% | 4/5 Muss ✗\n\nAussortiert:\n  • 12 unvollständig\n  • 8 unter Mindestanforderungen\n  • 2 Duplikate\n\nDSGVO: Löschung nach 6 Monaten geplant ✓',
    priceMonthly: 399,
    tags: ['HR-Tech', 'NLP', 'DSGVO', 'Ranking', 'ATS-Integration']
  },
  {
    id: 'uc-007',
    name: 'Lieferketten-Anomalieerkennung',
    category: 'analyse',
    categoryLabel: 'Datenanalyse',
    description: 'KI-gestützte Echtzeit-Überwachung Ihrer Lieferkette auf Anomalien, Engpässe und Risiken mit proaktiver Alarmierung.',
    longDescription: 'Überwacht kontinuierlich Lieferzeiten, Lagerbestände und Lieferantendaten. Erkennt Muster, die auf potenzielle Engpässe hinweisen, bevor sie eintreten. Sendet automatische Warnmeldungen und Handlungsempfehlungen bei erkannten Anomalien.',
    complexity: 3,
    timeSavings: '15h / Monat',
    configParams: [
      { key: 'erp_api', label: 'ERP/WMS API-Endpunkt', type: 'url', placeholder: 'https://ihr-erp.de/api/v2/inventory', required: true },
      { key: 'alert_email', label: 'Alarm senden an', type: 'email', placeholder: 'supply@ihr-unternehmen.de', required: true },
      { key: 'vorlaufzeit_tage', label: 'Vorlaufzeit Warnung (Tage)', type: 'number', default: 14, required: false }
    ],
    demoOutput: '// Anomalieerkennung ───────────────────────────\nÜberwachte SKUs:    3.247\nAnalysezeitraum:    letzte 7 Tage\nLetzte Analyse:     heute 06:00 Uhr\n\n🔴 KRITISCH:\n  • Artikel A-0042: Lieferant meldet\n    Produktionsausfall, Restbestand: 3 Tage\n    → Empfehlung: Alternativlieferant kontakt.\n\n🟡 WARNUNG:\n  • Artikel B-1290: Lieferzeit +8 Tage\n  • Artikel C-0881: Bestand unter Mindest\n\n✅ NORMAL: 3.244 SKUs ohne Auffälligkeiten\n\nAlarm gesendet an: supply@ ✓',
    priceMonthly: 599,
    tags: ['Predictive Analytics', 'Supply Chain', 'Echtzeit', 'IoT-Integration']
  },
  {
    id: 'uc-008',
    name: 'FAQ-Bot Konfiguration',
    category: 'kommunikation',
    categoryLabel: 'Kundenkommunikation',
    description: 'Intelligenter FAQ-Bot der auf Basis Ihrer Wissensdatenbank Kundenfragen automatisch und präzise beantwortet.',
    longDescription: 'Verarbeitet Ihre bestehenden FAQs, Produktdokumentationen und Support-Tickets und trainiert einen spezialisierten Bot. Integration in Website, WhatsApp, Slack oder andere Kanäle. Lernt kontinuierlich aus neuen Fragen und eskaliert bei Bedarf an menschliche Agenten.',
    complexity: 2,
    timeSavings: '12h / Woche',
    configParams: [
      { key: 'wissensbasis_url', label: 'Wissensdatenbank URL oder Upload', type: 'url', placeholder: 'https://ihr-unternehmen.de/hilfe', required: true },
      { key: 'bot_name', label: 'Bot-Name', type: 'text', placeholder: 'Max', required: false },
      { key: 'eskalations_email', label: 'Eskalation an', type: 'email', placeholder: 'support@ihr-unternehmen.de', required: true }
    ],
    demoOutput: '// FAQ-Bot Demo ────────────────────────────────\nFrage: "Wie lange dauert die Lieferung?"\n\nBot-Antwort:\n  Hallo! Unsere Standardlieferzeit beträgt\n  3–5 Werktage innerhalb Deutschlands.\n  Express-Lieferung (1–2 Tage) ist gegen\n  Aufpreis möglich.\n\n  Ihre Bestellnummer?\n  → Bestellstatus abrufen: [Link]\n\nKonfidenz: 97%\nQuelle: FAQ #23 (Versand & Lieferung)\nEskalation: Nicht nötig ✓\nAntwortzeit: 0,3 Sekunden',
    priceMonthly: 249,
    tags: ['Chatbot', 'NLP', 'Omnichannel', 'Wissensdatenbank']
  },
  {
    id: 'uc-009',
    name: 'Berichte automatisieren',
    category: 'analyse',
    categoryLabel: 'Datenanalyse',
    description: 'Automatische Erstellung, Aufbereitung und Verteilung von Geschäftsberichten aus verschiedenen Datenquellen.',
    longDescription: 'Verbindet sich mit Ihren Datensystemen (ERP, CRM, BI), aggregiert relevante KPIs, erstellt formatierte Berichte nach Ihren Templates und versendet diese automatisch an definierte Empfänger. Unterstützt Excel, PDF und interaktive Dashboards.',
    complexity: 2,
    timeSavings: '7h / Woche',
    configParams: [
      { key: 'datenquellen', label: 'Datenquellen API-URLs', type: 'text', placeholder: 'https://crm.de/api, https://erp.de/api', required: true },
      { key: 'berichtstyp', label: 'Berichtstyp', type: 'select', options: ['Wochenbericht', 'Monatsbericht', 'Quartalsbericht', 'Individuelle KPIs'], required: true },
      { key: 'empfaenger', label: 'Empfänger E-Mails', type: 'text', placeholder: 'cfo@firma.de, ceo@firma.de', required: true }
    ],
    demoOutput: '// Wochenbericht KW03/2024 ─────────────────────\nErstellt: 20.01.2024, 07:00 Uhr\nZeitraum: 15.01.–19.01.2024\n\nUmsatz:         287.450 EUR (+12,3% vs Vorw.)\nNeukunden:             7 (+2 vs Vorwoche)\nSupport-Tickets:      23 (ø Lösung: 4,2h)\nLagerbestand:       94,3% (Ziel: >90%) ✓\n\nTop-Produkte diese Woche:\n  1. Produkt A: 45.200 EUR\n  2. Produkt B: 38.900 EUR\n  3. Produkt C: 31.400 EUR\n\nBericht versendet an 3 Empfänger ✓',
    priceMonthly: 299,
    tags: ['BI', 'Reporting', 'Excel', 'PDF', 'KPI-Dashboard']
  },
  {
    id: 'uc-010',
    name: 'Compliance-Dokumentation',
    category: 'dokument',
    categoryLabel: 'Dokumentenverarbeitung',
    description: 'Automatische Erstellung und Pflege von Compliance-Dokumenten, Audits und regulatorischen Nachweisen.',
    longDescription: 'Überwacht regulatorische Anforderungen, generiert automatisch benötigte Dokumentationen, pflegt Audit-Trails und erstellt Nachweise für DSGVO, ISO, GoBD und andere Standards. Proaktive Alarmierung bei Handlungsbedarf.',
    complexity: 3,
    timeSavings: '20h / Quartal',
    configParams: [
      { key: 'standards', label: 'Anzuwendende Standards', type: 'text', placeholder: 'DSGVO, ISO 27001, GoBD', required: true },
      { key: 'audit_email', label: 'Compliance-Officer E-Mail', type: 'email', placeholder: 'compliance@firma.de', required: true },
      { key: 'berichts_intervall', label: 'Berichtsintervall', type: 'select', options: ['Wöchentlich', 'Monatlich', 'Quartalsweise'], required: true }
    ],
    demoOutput: '// Compliance-Check DSGVO ──────────────────────\nPrüfdatum: 20.01.2024\nGeltungsbereich: Gesamtunternehmen\n\nGesamtstatus: WEITGEHEND KONFORM\n\n✅ Erfüllt (23 Kriterien):\n  • Datenschutzerklärung aktuell\n  • Auftragsverarbeitungsverträge vollst.\n  • Löschkonzept implementiert\n  ...\n\n⚠ Handlungsbedarf (2 Punkte):\n  • TOMs: Jährliche Überprüfung fällig\n  • Datenschutzbeauftragter: Schulung\n    Frist: 28.02.2024\n\nDokumentation aktualisiert ✓',
    priceMonthly: 499,
    tags: ['DSGVO', 'ISO 27001', 'GoBD', 'Audit', 'Compliance']
  },
  {
    id: 'uc-011',
    name: 'Preisoptimierung & Forecast',
    category: 'analyse',
    categoryLabel: 'Datenanalyse',
    description: 'KI-gestützte Preisoptimierung und Umsatzprognose basierend auf Marktdaten, Wettbewerb und historischen Daten.',
    longDescription: 'Analysiert Verkaufsdaten, Wettbewerberpreise und Markttrends. Berechnet optimale Preispunkte für maximalen Deckungsbeitrag, erstellt Umsatz-Forecasts und empfiehlt dynamische Preisanpassungen mit Auswirkungsanalyse.',
    complexity: 3,
    timeSavings: '12h / Monat',
    configParams: [
      { key: 'produktkatalog_api', label: 'Produktkatalog API', type: 'url', placeholder: 'https://ihr-shop.de/api/products', required: true },
      { key: 'optimierungsziel', label: 'Optimierungsziel', type: 'select', options: ['Deckungsbeitrag', 'Umsatz', 'Marktanteil'], required: true },
      { key: 'wettbewerber_urls', label: 'Wettbewerber-Webseiten', type: 'text', placeholder: 'https://wettb1.de, https://wettb2.de', required: false }
    ],
    demoOutput: '// Preisoptimierung Q1 2024 ────────────────────\nAnalysierte Produkte: 1.284\nDatensätze: 24 Monate historisch\n\nEmpfehlungen:\n  📈 Preiserhöhung empfohlen (312 Produkte)\n     Ø Anpassung: +8,3%\n     Erwarteter DB-Effekt: +47.200 EUR/Monat\n\n  📉 Preissenkung empfohlen (89 Produkte)\n     Ziel: Marktanteil gewinnen\n     Umsatz-Effekt: +23.100 EUR/Monat\n\nForecast März 2024:\n  Umsatz:       ≈ 320.000 EUR (±15.000)\n  Top-Produkt:  Artikel XY (+34%)\n\nBericht exportiert ✓',
    priceMonthly: 549,
    tags: ['Predictive Analytics', 'Dynamic Pricing', 'Forecasting', 'Wettbewerbsanalyse']
  },
  {
    id: 'uc-012',
    name: 'Onboarding-Automatisierung',
    category: 'hr',
    categoryLabel: 'HR & Recruiting',
    description: 'Vollautomatisierter Onboarding-Prozess für neue Mitarbeiter – von der Vertragsunterschrift bis zum ersten Arbeitstag.',
    longDescription: 'Koordiniert alle Onboarding-Schritte automatisch: IT-Zugänge anlegen, Willkommens-E-Mails versenden, Schulungen planen, Dokumente einfordern und Checklisten abarbeiten. Integriert mit HR-Systemen, Active Directory und Slack/Teams.',
    complexity: 2,
    timeSavings: '8h / Neueinstellung',
    configParams: [
      { key: 'hr_system_api', label: 'HR-System API', type: 'url', placeholder: 'https://ihr-hris.de/api', required: true },
      { key: 'willkommens_absender', label: 'Absender Willkommensmails', type: 'email', placeholder: 'hr@ihr-unternehmen.de', required: true },
      { key: 'onboarding_dauer', label: 'Onboarding-Zeitraum (Wochen)', type: 'number', default: 4, required: false }
    ],
    demoOutput: '// Onboarding gestartet ────────────────────────\nNeuer Mitarbeiter: Weber, Anna\nStartdatum: 01.02.2024\nAbteilung: Marketing\n\nAktionen ausgelöst (automatisch):\n  ✓ IT-Ticket erstellt: Laptop + Zugänge\n  ✓ Willkommensmail versendet\n  ✓ Slack-Einladung gesendet\n  ✓ Kalender: Onboarding-Termine eingetrag.\n  ✓ Schulungen geplant: 3 Module\n  ✓ Dokumente angefordert: 4 ausstehend\n  ✓ Buddy zugewiesen: M. Müller\n\nFortschritt: 3/7 Schritte\nStatus: Im Plan ✓',
    priceMonthly: 299,
    tags: ['HR-Tech', 'Workflow-Automation', 'AD-Integration', 'Slack/Teams']
  }
];

// ── Auth-Modul ──────────────────────────────────────────────
export const auth = {
  /**
   * Prüft ob der Benutzer eingeloggt ist
   * @returns {boolean}
   */
  isLoggedIn() {
    const session = this.getSession();
    if (!session) return false;
    if (session.expiresAt < Date.now()) {
      this.logout();
      return false;
    }
    return true;
  },

  /**
   * Gibt die aktuelle Session zurück
   * @returns {Object|null}
   */
  getSession() {
    try {
      return JSON.parse(localStorage.getItem('e1_session'));
    } catch {
      return null;
    }
  },

  /**
   * Gibt den aktuellen Benutzer zurück
   * @returns {Object|null}
   */
  getUser() {
    const session = this.getSession();
    if (!session) return null;
    const users = this.getUsers();
    return users.find(u => u.id === session.userId) || null;
  },

  /**
   * Gibt alle registrierten Benutzer zurück
   * @returns {Array}
   */
  getUsers() {
    try {
      return JSON.parse(localStorage.getItem('e1_users')) || [];
    } catch {
      return [];
    }
  },

  /**
   * Registriert einen neuen Benutzer
   * @param {Object} formData
   * @returns {{success: boolean, error?: string}}
   */
  register(formData) {
    const users = this.getUsers();

    // E-Mail-Eindeutigkeit prüfen
    if (users.find(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
      return { success: false, error: 'Diese E-Mail-Adresse ist bereits registriert.' };
    }

    const newUser = {
      id: crypto.randomUUID(),
      email: formData.email.toLowerCase(),
      passwordHash: btoa(formData.password),
      company: formData.company,
      firstName: formData.firstName,
      lastName: formData.lastName,
      billing: {
        street: formData.street,
        zip: formData.zip,
        city: formData.city,
        country: formData.country || 'Deutschland',
        ustIdNr: formData.ustIdNr || ''
      },
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('e1_users', JSON.stringify(users));

    // Demo-UCs bereitstellen
    const demoUCs = USE_CASES.slice(0, 3).map(uc => ({
      ucId: uc.id,
      rentedAt: new Date().toISOString(),
      status: 'demo',
      testRuns: 0,
      config: {},
      lastRun: null,
      successRate: null
    }));
    localStorage.setItem(`e1_rented_ucs_${newUser.id}`, JSON.stringify(demoUCs));

    // Session erstellen
    this._createSession(newUser);
    return { success: true };
  },

  /**
   * Meldet einen Benutzer an
   * @param {string} email
   * @param {string} password
   * @returns {{success: boolean, error?: string}}
   */
  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, error: 'E-Mail-Adresse nicht gefunden.' };
    }

    if (user.passwordHash !== btoa(password)) {
      return { success: false, error: 'Falsches Passwort.' };
    }

    this._createSession(user);
    return { success: true };
  },

  /**
   * Meldet den aktuellen Benutzer ab
   */
  logout() {
    localStorage.removeItem('e1_session');
    window.location.href = 'index.html';
  },

  /**
   * Erstellt eine Session für den angegebenen Benutzer
   * @private
   */
  _createSession(user) {
    const session = {
      userId: user.id,
      email: user.email,
      company: user.company,
      firstName: user.firstName,
      role: user.role || 'user',
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 Tage
    };
    localStorage.setItem('e1_session', JSON.stringify(session));
  },

  /**
   * Prüft ob der aktuelle Nutzer Administrator ist
   * @returns {boolean}
   */
  isAdmin() {
    const session = this.getSession();
    if (!session || !this.isLoggedIn()) return false;
    return session.role === 'admin';
  },

  /**
   * Schützt Seiten, die eine Anmeldung erfordern
   * @param {string} redirectBack - Seite, zu der nach Login weitergeleitet wird
   */
  guard(redirectBack = '') {
    if (!this.isLoggedIn()) {
      const target = redirectBack ? `auth.html?redirect=${redirectBack}` : 'auth.html';
      window.location.href = target;
    }
  }
};

// ── Navigation ──────────────────────────────────────────────
function initNavigation() {
  const nav = document.getElementById('siteNav');
  const hamburger = document.getElementById('navHamburger');
  const mobileNav = document.getElementById('navMobile');
  const loginBtn = document.getElementById('navLoginBtn');
  const navActions = document.querySelector('.nav-actions');

  if (!nav) return;

  // Scroll-Effekt
  const onScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger-Menü
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      if (isOpen) {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Aktiven Link markieren
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPage.includes(href.replace('.html', ''))) {
      link.classList.add('active');
    }
  });

  // Auth-Status in Navigation anzeigen
  if (auth.isLoggedIn()) {
    const session = auth.getSession();
    if (loginBtn) loginBtn.style.display = 'none';

    // Dashboard-Link anzeigen
    if (navActions) {
      // Registrieren-Button zu Dashboard ändern
      const registerBtn = navActions.querySelector('[href="auth.html#register"]');
      if (registerBtn) {
        registerBtn.href = 'dashboard.html';
        registerBtn.textContent = 'Dashboard';
      }
      // Login-Btn zu Avatar-Menü
      if (loginBtn) {
        loginBtn.style.display = 'flex';
        loginBtn.textContent = session.firstName || session.email.split('@')[0];
        loginBtn.href = 'dashboard.html';
      }
      // Admin-Badge für Administratoren
      if (auth.isAdmin()) {
        const adminLink = document.createElement('a');
        adminLink.href = 'admin.html';
        adminLink.style.cssText = 'display:inline-flex;align-items:center;gap:0.3em;padding:0.3em 0.8em;background:rgba(0,229,204,0.08);border:1px solid rgba(0,229,204,0.3);border-radius:4px;color:var(--accent-cyan);font-family:var(--font-mono);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;transition:all 0.2s ease;';
        adminLink.textContent = '⊕ Admin';
        adminLink.addEventListener('mouseenter', () => adminLink.style.background = 'rgba(0,229,204,0.15)');
        adminLink.addEventListener('mouseleave', () => adminLink.style.background = 'rgba(0,229,204,0.08)');
        navActions.insertBefore(adminLink, navActions.firstChild);
      }
    }
  }
}

// ── Scroll-Reveal ───────────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Toast-System ────────────────────────────────────────────
export const toast = {
  /**
   * Zeigt eine Toast-Benachrichtigung an
   * @param {string} message
   * @param {'info'|'success'|'error'|'warning'} type
   * @param {number} duration - Anzeigedauer in ms
   */
  show(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = { info: '💡', success: '✓', error: '✕', warning: '⚠' };

    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${type}`;
    toastEl.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;

    container.appendChild(toastEl);

    // Auto-Entfernen
    setTimeout(() => {
      toastEl.classList.add('removing');
      setTimeout(() => toastEl.remove(), 300);
    }, duration);

    // Klick zum Entfernen
    toastEl.addEventListener('click', () => {
      toastEl.classList.add('removing');
      setTimeout(() => toastEl.remove(), 300);
    });
  }
};

// ── Featured UCs auf Landing Page ──────────────────────────
function initFeaturedUCs() {
  const container = document.getElementById('featuredUCs');
  if (!container) return;

  const featured = [USE_CASES[0], USE_CASES[1], USE_CASES[5]];

  featured.forEach((uc, i) => {
    const card = document.createElement('div');
    card.className = `uc-card reveal reveal-delay-${i + 1}`;
    card.innerHTML = `
      <div class="uc-card-header">
        <span class="category-tag cat-${uc.category}">${uc.categoryLabel}</span>
      </div>
      <h3 class="uc-card-title">${uc.name}</h3>
      <p class="uc-card-description">${uc.description}</p>
      <div class="uc-card-meta">
        <div class="complexity-dots" title="Komplexität">
          ${[1,2,3].map(n => `<div class="complexity-dot${n <= uc.complexity ? ' active' : ''}"></div>`).join('')}
        </div>
        <span class="label-mono-muted" style="margin-left:0.5rem;">Komplexität</span>
        <span style="margin-left:auto;" class="label-mono">${uc.timeSavings}</span>
      </div>
      <div class="uc-card-actions">
        <a href="demo.html#${uc.id}" class="btn btn-secondary btn-sm">Demo ansehen</a>
        <a href="auth.html#register" class="btn btn-ghost btn-sm">Mieten</a>
      </div>
    `;
    container.appendChild(card);
  });

  // Reveal neu initialisieren für dynamisch hinzugefügte Elemente
  setTimeout(initReveal, 100);
}

// ── Testkunden Seed-Daten ────────────────────────────────────
/**
 * Legt drei vordefinierte Demo-Testkunden in localStorage an,
 * sofern diese noch nicht vorhanden sind (einmalig, idempotent).
 *
 * Login-Daten für alle drei Testkunden: Passwort = Demo2025!
 *
 * Testkunde 1 – TransLogix GmbH (Logistik, Wien)
 *   E-Mail: demo.logistik@translogix.at
 *
 * Testkunde 2 – QM Consult GmbH (Unternehmensberatung QM, Graz)
 *   E-Mail: demo.qm@qmconsult.at
 *
 * Testkunde 3 – Sachverständigenbüro DI Dr. Huber (Tiefbau/Tunnelbau, Innsbruck)
 *   E-Mail: demo.sv@svbuero-huber.at
 */
function seedTestCustomers() {
  const SEED_KEY = 'e1_seed_v2';
  if (localStorage.getItem(SEED_KEY)) return; // bereits geseeded

  const ph = pwd => btoa(pwd); // Mock-Hash (identisch mit auth.register)
  const NOW = new Date().toISOString();

  // ── Testkunden-Stammdaten ──────────────────────────────────
  const testUsers = [
    // ── Administrator ──
    {
      id: 'e1-admin-001',
      email: 'admin@elevenone.at',
      passwordHash: ph('Admin2025!'),
      company: 'elevenOne AI Services',
      firstName: 'Admin',
      lastName: '',
      role: 'admin',
      billing: {
        street: 'Mariahilfer Straße 1',
        zip: '1060',
        city: 'Wien',
        country: 'Österreich',
        ustIdNr: 'ATU99999999'
      },
      registeredAt: NOW
    },
    // ── Testkunde 1 – TransLogix GmbH (Logistik, Wien) ──
    {
      id: 'e1-test-logistik-001',
      email: 'demo.logistik@translogix.at',
      passwordHash: ph('Demo2025!'),
      company: 'TransLogix GmbH',
      firstName: 'Markus',
      lastName: 'Gruber',
      billing: {
        street: 'Industriestraße 24',
        zip: '1230',
        city: 'Wien',
        country: 'Österreich',
        ustIdNr: 'ATU12345678'
      },
      registeredAt: NOW
    },
    // ── Testkunde 2 – QM Consult GmbH (Unternehmensberatung, Graz) ──
    {
      id: 'e1-test-qm-002',
      email: 'demo.qm@qmconsult.at',
      passwordHash: ph('Demo2025!'),
      company: 'QM Consult GmbH',
      firstName: 'Sandra',
      lastName: 'Hofmann',
      billing: {
        street: 'Am Stadtpark 3',
        zip: '8010',
        city: 'Graz',
        country: 'Österreich',
        ustIdNr: 'ATU87654321'
      },
      registeredAt: NOW
    },
    // ── Testkunde 3 – Sachverständigenbüro DI Dr. Huber (Tiefbau, Innsbruck) ──
    {
      id: 'e1-test-sv-003',
      email: 'demo.sv@svbuero-huber.at',
      passwordHash: ph('Demo2025!'),
      company: 'Sachverständigenbüro DI Dr. Huber',
      firstName: 'Thomas',
      lastName: 'Huber',
      billing: {
        street: 'Universitätsstraße 5',
        zip: '6020',
        city: 'Innsbruck',
        country: 'Österreich',
        ustIdNr: 'ATU55566677'
      },
      registeredAt: NOW
    },
    // ── Testkunde 4 – Elektro Haas e.U. (Elektriker/Handwerk, Linz) ──
    {
      id: 'e1-test-handwerk-004',
      email: 'demo.handwerk@elektro-haas.at',
      passwordHash: ph('Demo2025!'),
      company: 'Elektro Haas e.U.',
      firstName: 'Gerald',
      lastName: 'Haas',
      billing: {
        street: 'Linzer Straße 88',
        zip: '4020',
        city: 'Linz',
        country: 'Österreich',
        ustIdNr: 'ATU33344455'
      },
      registeredAt: NOW
    },
    // ── Testkunde 5 – Kanzlei Dr. Berger & Partner (Rechtsanwälte, Salzburg) ──
    {
      id: 'e1-test-anwalt-005',
      email: 'demo.anwalt@kanzlei-berger.at',
      passwordHash: ph('Demo2025!'),
      company: 'Kanzlei Dr. Berger & Partner',
      firstName: 'Petra',
      lastName: 'Berger',
      billing: {
        street: 'Getreidegasse 15',
        zip: '5020',
        city: 'Salzburg',
        country: 'Österreich',
        ustIdNr: 'ATU77788899'
      },
      registeredAt: NOW
    }
  ];

  // ── UC-Zuweisungen pro Testkunde ───────────────────────────
  const testUCs = {
    'e1-admin-001': [], // Administrator hat keine UC-Mieten

    'e1-test-logistik-001': [
      { ucId: 'uc-007', rentedAt: NOW, status: 'live',  testRuns: 5, config: { erp_api: 'https://erp.translogix.at/api/v2/inventory', alert_email: 'supply@translogix.at', vorlaufzeit_tage: 14 }, lastRun: NOW, successRate: 98 },
      { ucId: 'uc-001', rentedAt: NOW, status: 'live',  testRuns: 5, config: { email_eingang: 'rechnungen@translogix.at', schwellenwert: 1000, erp_webhook: 'https://erp.translogix.at/api/webhook' }, lastRun: NOW, successRate: 97 },
      { ucId: 'uc-011', rentedAt: NOW, status: 'test',  testRuns: 3, config: { optimierungsziel: 'Deckungsbeitrag' }, lastRun: NOW, successRate: null }
    ],

    'e1-test-qm-002': [
      { ucId: 'uc-010', rentedAt: NOW, status: 'live',  testRuns: 5, config: { standards: 'ISO 9001, ISO 14001, DSGVO', audit_email: 'compliance@qmconsult.at', berichts_intervall: 'Monatlich' }, lastRun: NOW, successRate: 99 },
      { ucId: 'uc-009', rentedAt: NOW, status: 'live',  testRuns: 5, config: { berichtstyp: 'Monatsbericht', empfaenger: 'geschaeftsfuehrung@qmconsult.at' }, lastRun: NOW, successRate: 96 },
      { ucId: 'uc-005', rentedAt: NOW, status: 'test',  testRuns: 2, config: { sprache: 'Deutsch', vorlage: 'Projektmeeting' }, lastRun: NOW, successRate: null }
    ],

    'e1-test-sv-003': [
      { ucId: 'uc-009', rentedAt: NOW, status: 'live',  testRuns: 5, config: { berichtstyp: 'Individuelle KPIs', empfaenger: 'buero@svbuero-huber.at' }, lastRun: NOW, successRate: 95 },
      { ucId: 'uc-003', rentedAt: NOW, status: 'test',  testRuns: 1, config: { vertragstyp: 'Dienstleistungsvertrag', risikoklassen: 'Haftung,Gewährleistung,Kündigung', fristen_alert: 30 }, lastRun: NOW, successRate: null }
    ],

    'e1-test-handwerk-004': [
      // E-Mail-Klassifizierung – LIVE (Kundenanfragen automatisch routen)
      { ucId: 'uc-002', rentedAt: NOW, status: 'live',  testRuns: 5, config: { postfach: 'office@elektro-haas.at', kategorien: 'Angebot,Störung,Termin,Rechnung', auto_reply: true }, lastRun: NOW, successRate: 94 },
      // FAQ-Bot – In Testphase (Kundenfragen zu Leistungen)
      { ucId: 'uc-008', rentedAt: NOW, status: 'test',  testRuns: 2, config: { wissensbasis_url: 'https://elektro-haas.at/leistungen', bot_name: 'Elektro-Assistent', eskalations_email: 'office@elektro-haas.at' }, lastRun: NOW, successRate: null }
    ],

    'e1-test-anwalt-005': [
      // Vertragsanalyse & Risiko – LIVE (Mandantenverträge prüfen)
      { ucId: 'uc-003', rentedAt: NOW, status: 'live',  testRuns: 5, config: { vertragstyp: 'Dienstleistungsvertrag', risikoklassen: 'Haftung,Kündigung,Datenschutz,Gerichtsstand', fristen_alert: 21 }, lastRun: NOW, successRate: 97 },
      // Meeting-Protokoll KI – LIVE (Mandantengespräche dokumentieren)
      { ucId: 'uc-005', rentedAt: NOW, status: 'live',  testRuns: 5, config: { sprache: 'Deutsch', protokoll_email: 'sekretariat@kanzlei-berger.at', vorlage: 'Entscheidungsprotokoll' }, lastRun: NOW, successRate: 96 },
      // Compliance-Dokumentation – In Testphase (Kanzlei-DSGVO)
      { ucId: 'uc-010', rentedAt: NOW, status: 'test',  testRuns: 2, config: { standards: 'DSGVO, RAO', audit_email: 'berger@kanzlei-berger.at', berichts_intervall: 'Monatlich' }, lastRun: NOW, successRate: null }
    ]
  };

  // ── In localStorage schreiben ──────────────────────────────
  const existingUsers = JSON.parse(localStorage.getItem('e1_users') || '[]');
  const existingIds = new Set(existingUsers.map(u => u.id));

  testUsers.forEach(u => {
    if (!existingIds.has(u.id)) existingUsers.push(u);
    localStorage.setItem(`e1_rented_ucs_${u.id}`, JSON.stringify(testUCs[u.id]));
  });

  localStorage.setItem('e1_users', JSON.stringify(existingUsers));
  localStorage.setItem(SEED_KEY, '1');
}

// ── Initialisierung ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  seedTestCustomers();
  initNavigation();
  initReveal();
  initFeaturedUCs();
});
