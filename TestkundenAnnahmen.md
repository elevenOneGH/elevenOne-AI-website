# elevenOne AI Services – Testkunden & Annahmen

**Dokument:** Interne Dokumentation der Demo-Seed-Daten
**Stand:** März 2026
**Geltungsbereich:** Lokale Demo-Umgebung (localStorage-basierte Mock-Auth)

---

## Überblick: Die 5 meistgenutzten Demo Use Cases

Diese fünf Use Cases wurden als besonders relevant für die gewählten Testkunden-Profile ausgewählt und decken branchenübergreifende Kernanforderungen österreichischer KMU ab:

| UC-ID  | Name                           | Branchenrelevanz                                      |
|--------|--------------------------------|-------------------------------------------------------|
| uc-001 | Rechnungsverarbeitung KI       | Universal: Logistik, alle KMU mit Eingangsrechnungen  |
| uc-005 | Meeting-Protokoll KI           | Beratung, Gutachter – dokumentenintensive Branchen    |
| uc-007 | Lieferketten-Anomalieerkennung | Logistik / Supply-Chain-Management                    |
| uc-009 | Berichte automatisieren        | Beratung, Gutachter – regelmäßige Kunden-Reportings   |
| uc-010 | Compliance-Dokumentation       | QM-Beratung, Bau-Sachverständige, regulierte Branchen |

---

## Testkunde 1 – TransLogix GmbH (Logistik)

### Unternehmensprofil
- **Branche:** Logistik / Spedition (Stückgut & Systemlogistik, Österreich/CEE)
- **Standort:** Wien (1230 Wien, Industriestraße 24)
- **Unternehmensgröße:** ca. 22 Mitarbeitende (KMU)
- **Login:** demo.logistik@translogix.at / Demo2025!

### Annahmen
- **Rechnungsvolumen:** Ca. 110–130 Lieferantenrechnungen/Monat (Treibstoff, Maut, Frachtführer, Werkstatt)
- **Lagerbestand:** >3.000 SKUs im WMS, tägliche Anomalieprüfung sinnvoll
- **ERP:** Standard-ERP (SAGE / proALPHA), REST-API verfügbar
- **IT-Ressourcen:** Kein eigener IT-Entwickler; Buchhalterin 50%, Logistikleiter als Key User

### Gemietete Use Cases & Status

| UC              | Status    | Testläufe | Begründung                                                          |
|-----------------|-----------|-----------|---------------------------------------------------------------------|
| uc-007 Lieferketten-Anomalieerkennung | **LIVE** | 5/5 | Kernbedarf: Engpässe frühzeitig erkennen, Liefertermine sichern   |
| uc-001 Rechnungsverarbeitung KI       | **LIVE** | 5/5 | Hoher Rechnungseingang, Buchhalterin überlastet                    |
| uc-011 Preisoptimierung & Forecast    | **TEST** | 3/5 | Frachtratenkalkulation, saisonale Nachfrageplanung (in Erprobung)  |

### Kennzahlen-Annahmen (KMU-Maßstab)
- **Vorgänge/Monat (Dashboard-Anzeige):** ~949 (berechnet: 3×127 + 2×284)
- **Gesparte Stunden/Monat:** ~84 h (uc-007: 15 h/Monat × 4 Wochen-Faktor; uc-001: 6 h/Woche × 4)
- **Reale Schätzung:** Ca. 26–30 h/Monat ersparter manueller Aufwand (konservativ)
  - Rechnungsverarbeitung: 8–9 h/Monat (ca. 4–5 Min./Rechnung manuell, ~120 Rechnungen)
  - Anomalieüberwachung: 18–20 h/Monat (tägliche manuelle Bestandschecks entfallen)

---

## Testkunde 2 – QM Consult GmbH (Unternehmensberatung Qualitätsmanagement)

### Unternehmensprofil
- **Branche:** Unternehmensberatung, Schwerpunkt ISO-Zertifizierungsberatung (ISO 9001, ISO 14001, ISO 45001)
- **Standort:** Graz (8010 Graz, Am Stadtpark 3)
- **Unternehmensgröße:** ca. 6–8 Mitarbeitende (Kleinunternehmen)
- **Login:** demo.qm@qmconsult.at / Demo2025!

### Annahmen
- **Projektanzahl:** 4–6 aktive Kundenprojekte gleichzeitig
- **Dokumentenvolumen:** 15–20 QM-Dokumente/Monat (Handbücher, Verfahrensanweisungen, Auditberichte)
- **Meetings:** 12–18 Kundenmeetings/Monat (Audits, Reviews, Workshops)
- **IT-Affinität:** Mittel; MS-365-Umgebung, keine eigene IT-Abteilung

### Gemietete Use Cases & Status

| UC              | Status    | Testläufe | Begründung                                                          |
|-----------------|-----------|-----------|---------------------------------------------------------------------|
| uc-010 Compliance-Dokumentation | **LIVE** | 5/5 | Kernleistung: DSGVO + ISO-Nachweise für Kunden erstellen           |
| uc-009 Berichte automatisieren  | **LIVE** | 5/5 | Monatliche Projekt-Statusberichte an Kunden automatisiert          |
| uc-005 Meeting-Protokoll KI     | **TEST** | 2/5 | Auditprotokolle & Workshop-Mitschriften (noch in Erprobung)        |

### Kennzahlen-Annahmen (KMU-Maßstab)
- **Vorgänge/Monat (Dashboard-Anzeige):** ~822 (berechnet: 2×127 + 2×284)
- **Gesparte Stunden/Monat:** ~108 h (Dashboard-Formel: 20×4 + 7×4; enthält Quartalswert ×4)
- **Reale Schätzung:** Ca. 28–35 h/Monat
  - Compliance-Dokumentation: 15–18 h/Monat (Normen-Updates, Nachweis-PDFs)
  - Berichte automatisieren: 12–14 h/Monat (4–6 Berichte × 2,5 h manuell)

---

## Testkunde 3 – Sachverständigenbüro DI Dr. Huber (Tiefbau / Tunnelbau)

### Unternehmensprofil
- **Branche:** Öffentlich bestellter und vereidigter Sachverständiger / Gutachter
- **Spezialgebiet:** Tiefbau, Tunnelbau, Geotechnik (Bauprojekte öffentliche Hand + Privat)
- **Standort:** Innsbruck (6020 Innsbruck, Universitätsstraße 5)
- **Unternehmensgröße:** 3 Personen (DI Dr. Huber + 2 technische Mitarbeitende)
- **Login:** demo.sv@svbuero-huber.at / Demo2025!

### Annahmen
- **Gutachtenvolumen:** 8–10 Gutachten/Monat (Umfang: 15–80 Seiten je Gutachten)
- **Vertragstypen:** Werkverträge, Rahmenvereinbarungen mit Auftraggeber (Bund, Länder, Kommunen)
- **Datenquellen:** AutoCAD-Pläne, Bohrprotokolle, Messdaten (manuell in Berichte übertragen)
- **IT-Ressourcen:** Keine IT-Stelle; Word/Excel-Workflows, Gutachter selbst als Key User

### Gemietete Use Cases & Status

| UC              | Status    | Testläufe | Begründung                                                          |
|-----------------|-----------|-----------|---------------------------------------------------------------------|
| uc-009 Berichte automatisieren | **LIVE** | 5/5 | Gutachten-Strukturierung: Messdaten → formatierter Bericht         |
| uc-003 Vertragsanalyse & Risiko | **TEST** | 1/5 | Werkverträge auf Haftungs-/Gewährleistungsklauseln prüfen (Test)  |

### Kennzahlen-Annahmen (KMU-Maßstab)
- **Vorgänge/Monat (Dashboard-Anzeige):** ~411 (berechnet: 1×127 + 1×284)
- **Gesparte Stunden/Monat:** ~28 h (Dashboard-Formel: 7×4)
- **Reale Schätzung:** Ca. 16–20 h/Monat
  - Berichte automatisieren: 1,5–2 h Zeitersparnis je Gutachten × 9 Gutachten = 13,5–18 h/Monat
  - Manuelle Dateneingabe aus Messprotokollen entfällt weitgehend

---

## Allgemeine Annahmen & Modell-Hinweise

### Dashboard-Kennzahlen-Formel (Implementierung dashboard.js)
```
Vorgänge/Monat = Σ(testRuns × 127) + liveCount × 284
Gesparte Stunden = Σ aller LIVE-UCs: parseInt(timeSavings) × 4
```
Die Multiplikation mit 4 normiert wöchentliche Angaben ("h / Woche") auf den Monat.
Bei Quartalsangaben ("h / Quartal") führt dies zu einer Überschätzung – dies ist bekannt
und als konservative Demo-Darstellung akzeptiert.

### Seed-Mechanismus
Die Testkunden werden beim ersten Seitenaufruf einmalig per `seedTestCustomers()`
in den localStorage geschrieben (Marker: `e1_seed_v1`). Erneutes Seeden wird verhindert.
Zum Zurücksetzen: `localStorage.removeItem('e1_seed_v1')` in der Browser-Konsole ausführen.

### Österreich-Kontext
- Alle Rechnungsadressen verwenden AT-PLZ und Österreich als Land
- USt-IdNr.-Format: ATU + 8 Stellen (gemäß österreichischer Finanzverwaltung)
- Währung: EUR, Mehrwertsteuersatz 20 % (Standard AT)
- Datenschutz: DSGVO gilt direkt; kein Abweichen von deutschem Recht erforderlich

---

*Erstellt für Demo-Zwecke. Alle Personen, Unternehmen und Daten sind fiktiv.*
