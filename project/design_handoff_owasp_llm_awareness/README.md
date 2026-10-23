# Handoff: OWASP LLM Top 10 (2026) – Interaktive Awareness-Schulung · Cavora Partners

## Overview
Interaktive Web-Schulung für Mitarbeitende (Security Awareness). Jedes der zehn Risiken der **OWASP Top 10 für LLM-Anwendungen 2026** wird in einfachen Worten (de-CH, ohne ß) erklärt. Darunter zeigt eine Live-Simulation den Angriff zuerst **ohne Schutz**, danach **mit Schutzmassnahmen**. Anschliessend werden Erkenntnisse und ein Quiz freigeschaltet. Den Abschluss bildet das Finale «Der Ernstfall»: Alle zehn Angriffe laufen als Kette ab (Schaden über CHF 4,8 Mio.), danach folgen ein «Zeitsprung zurück», zehn Verteidigungsrunden auf Zeit, ein Partikel-Schriftzug und eine druckbare Teilnahmebestätigung.

Fiktives Szenario-Unternehmen: **Alpenwerk AG** (Logistik, 340 Mitarbeitende). Branding: **Cavora Partners GmbH** (cavorapartners.com).

## About the Design Files
Die Dateien in diesem Paket sind **Design-Referenzen in HTML**. Es sind Prototypen, die Aussehen und Verhalten zeigen, kein Produktionscode. Aufgabe ist es, diese Designs **in der bestehenden Umgebung der Ziel-Codebasis nachzubauen** (React, Vue, Svelte usw.), mit deren Mustern und Bibliotheken. Gibt es noch keine Umgebung, empfehlen wir **React 18 + TypeScript + Vite** und CSS Modules (oder Tailwind mit den unten genannten Tokens). Der Prototyp nutzt React 18 UMD und Babel im Browser. Das ist nur für die Vorschau gedacht und nicht für den Einsatz im Betrieb.

## Fidelity
**High-fidelity.** Farben, Typografie, Abstände, Texte, Timings und Interaktionen sind final. Bitte pixelgenau nachbauen. Alle Texte stehen in `data.js` und in den Szenen-Dateien und sollen 1:1 übernommen werden.

---

## Screens / Views

### 0. App-Shell (alle Seiten ausser Finale)
- **Layout:** CSS Grid `grid-template-columns: 288px 1fr; height: 100vh`.
- **Sidebar** (`.side`): Hintergrund `#0A2463`, Padding `26px 18px 20px`, vertikaler Flex, scrollbar.
  - Brand «CAVORA PARTNERS»: 15px, Gewicht 800, letter-spacing .14em, weiss.
  - Claim «Sicherheit. Vertrauen. Produktivität.»: 11px, `#07D1FF`, letter-spacing .06em.
  - Akzentlinie: 46×2px `#07D1FF`, Margin `14px 10px 22px`.
  - Nav-Item: Grid `44px 1fr 18px`, Padding `9px 10px`, Radius 10px, 13.5px, Farbe `rgba(255,255,255,.78)`; Hover `rgba(255,255,255,.07)`; aktiv: Hintergrund weiss, Text `#0A2463`. Der Code (z. B. «LLM01») steht in Mono 11px mit opacity .7. Der Status-Kreis misst 16px mit 1.5px Rand `rgba(255,255,255,.3)`, im Zustand «erledigt» gefüllt `#07D1FF` mit Häkchen.
  - Einträge: «00 Übersicht», Label «OWASP LLM Top 10 · 2026» (Mono 10.5px, Grossbuchstaben, .18em, 50 % weiss), LLM01–LLM10, danach «★ Finale: Der Ernstfall» (gestrichelter Rand `rgba(7,209,255,.5)`, Text cyan).
  - Unten ein Fortschrittsbalken «Fortschritt n / 10»: Höhe 4px, Track 12 % weiss, Füllung `#07D1FF`, Breite mit Übergang .6s `cubic-bezier(.2,.8,.2,1)`.
- **Main:** `overflow:auto`. Der Inhalt-Wrapper ist `max-width:1180px; padding:46px 48px 90px`.
- **Responsiv (<1100px):** Die Sidebar wird ausgeblendet. Simulation, Info-Karten und Lern-Karten werden einspaltig.

### 1. Intro / Übersicht
- Vollflächig `#0A2463`. Dahinter liegt ein Canvas-Netzwerk mit 70 Punkten: Sie driften mit ±0.0003 pro Frame, Linien entstehen unter 150px Abstand mit `rgba(7,209,255, (1-d/150)*.18)`, Punkte haben Radius 1.6 in `rgba(7,209,255,.55)`.
- Eyebrow «Cavora Partners · AI Awareness» (Mono 12px, Grossbuchstaben, .2em, davor eine 40px-Linie in cyan).
- H1 «Zehn Wege, wie Ihre KI **gegen Sie arbeitet.**» (der zweite Teil in `#07D1FF`), `clamp(46px,6.4vw,92px)`, Gewicht 800, line-height .98, letter-spacing -.04em, max-width 980px.
- Lead (21px, 82 % weiss, max 640px): «Die OWASP Top 10 für LLM-Anwendungen 2026 – in einfachen Worten erklärt und live simuliert. Erleben Sie jeden Angriff zuerst ungeschützt. Dann mit Schutz.»
- CTA «Schulung starten →» (Hintergrund `#07D1FF`, Text `#0A2463`, Padding 15×22, Radius 12, Gewicht 700) und daneben der Hinweis zum fiktiven Unternehmen.
- Grid mit 5 Spalten × 2 Zeilen (Abstand 10px, max 900px), jede Kachel springt direkt zum Risiko. Kachel: Rand 14 % weiss, Radius 12, Padding 12; Hover: Rand cyan, Hintergrund `rgba(7,209,255,.08)`.

### 2. Risiko-Seite (×10, Inhalte aus `data.js` → `RISKS[i]`)
Von oben nach unten:
1. Eyebrow `{code}:2026 · {rank}`.
2. H1 `title[0]` und `<span>title[1]</span>` (Span in `#1E56A0`), `clamp(40px,5vw,66px)`, Gewicht 800, letter-spacing -.035em, line-height 1. Sonderfall LLM07: «Misin»+«formation» ohne Leerzeichen.
3. `oneLiner`: 22px, `#1E293B`, max 820px.
4. Zwei Karten nebeneinander (Grid `1.1fr 1fr`, Abstand 22, Margin-top 38):
   - «Was steckt dahinter?»: weisse Karte, 1px `#E2E8F2`, Radius 20, Padding 26×28, Text 16px.
   - «Im Alltag erklärt»: Hintergrund `#0A2463`, Text weiss 18px, Überschrift cyan, dekoratives Anführungszeichen (Georgia 220px, `rgba(7,209,255,.12)`) unten rechts.
5. Abschnittskopf «Live-Simulation / Was passiert, wenn es passiert» (H2 28px) mit dem Hinweis rechts «Erst ungeschützt ansehen, dann mit Schutzmassnahmen wiederholen.»
6. **SimShell** (siehe unten).
7. **Erst nach mindestens einem Simulationsdurchlauf** erscheint ein Grid `1fr 1fr 1.1fr` mit:
   - «Das kann passieren»: Liste mit rotem «!»-Icon (22px, Radius 7, Hintergrund `#FEF2F2`, Farbe `#EF4444`).
   - «So schützen Sie sich»: Liste mit Häkchen-Icon (Hintergrund `#E0F7FE`, Farbe `#1E56A0`).
   - Quiz-Karte (Hintergrund `#0A2463`): Frage 17px/700, drei Optionen als Buttons (Hintergrund 7 % weiss, Rand 16 % weiss, Radius 12). Nach dem Klick: richtige Option `#10B981`, falsch gewählte `#EF4444`, alle gesperrt, darunter die Erklärung.
   - Vorher steht an dieser Stelle der gestrichelte Platzhalter: «Starten Sie die Simulation – danach erscheinen hier die wichtigsten Erkenntnisse und ein kurzer Check.»
8. Fusszeile: «← vorheriges» (Ghost-Button) und rechts «Weiter zu LLMxx →» (Primary `#0A2463`, Hover `#1E56A0`). Auf LLM10 heisst der Button «Zum Finale: Der Ernstfall».

### 3. SimShell (wiederverwendbarer Simulationsrahmen, `sim-core.jsx`)
- Karte: weiss, Radius 20, Rand `#E2E8F2`, Schatten `0 10px 30px rgba(2,8,23,.08)`. Nach einem ungeschützten Durchlauf zusätzlich `0 0 0 2px rgba(239,68,68,.25)`, nach einem geschützten `0 0 0 2px rgba(16,185,129,.3)`.
- **Browser-Leiste:** drei Punkte à 10px `#DCE3EE`, zentrierte URL-Pille (11.5px, Schloss-Icon, max 420px) und rechts ein Modus-Badge: «Ohne Schutz» (`#FEF2F2`/`#EF4444`) oder «Schutz aktiv» (`#ECFDF5`/`#047857`).
- **Body:** Grid `1fr 290px`, min-height 430px.
  - Links die **Szene** (Padding 20px, Verlauf von weiss nach `#FBFCFE`).
  - Rechts das **Protokoll** «Was gerade passiert»: geordnete Liste, jeder Eintrag als Grid `40px 1fr` mit Zeitstempel `ss:cc` (Mono 10.5px `#94A3B8`). Ton-Farben: info = weiss, warn = `#FFFBEB`/Rand `#FDE68A`, bad = `#FEF2F2`/`#FECACA`, good = `#ECFDF5`/`#A7F3D0`. Einblenden mit `logIn` (.35s, translateY 6px → 0). Die Liste scrollt automatisch ans Ende.
- **Footer:**
  - Optional Chips «Angriffs-Prompt wählen» (nur LLM08).
  - Button «▶ {startLabel}» (Hintergrund `#0F172A`) bzw. nach dem ersten Lauf «Angriff wiederholen».
  - Button «Mit Schutzmassnahmen wiederholen» (`#1E56A0`): erst nach dem ersten ungeschützten Lauf aktiv, pulsiert dann (box-shadow 0 → 14px `rgba(30,86,160,.45)`, 1.6s infinite).
  - «Zurücksetzen» als Ghost-Button.
  - Während eines Laufs sind alle Buttons deaktiviert (opacity .4).
- **Ergebnis-Banner** am Ende (absolut, unten in der Szene, Radius 16): ungeschützt `#1B0B0D` mit rotem Icon «Angriff erfolgreich», geschützt `#052E24` mit grünem Icon «Angriff abgewehrt», darunter `impact.unsafe|safe`. Einblenden mit `resIn` (.5s, `cubic-bezier(.2,.9,.2,1.1)`). Bei einem ungeschützten Lauf wackelt die Szene einmal kurz (.45s).
- **Ablauf:** `script[mode]` ist ein Array aus `{at(ms), cap, tone}`. Schritt 0 startet nach 250ms, Schritt i nach `250 + at`. «Fertig» folgt 1100ms nach dem letzten Schritt. Die Szene bekommt die Props `step` (-1 = Leerlauf), `mode` ('unsafe'|'safe'), `done` und `choice`.

### 4. Die zehn Szenen (`scenes-a.jsx`, `scenes-b.jsx`)
Alle Szenen ausser LLM03 und LLM06 sind zweispaltig (`.sc-split`, je ein Panel mit Header 11.5px/700 auf `#FAFBFD`). Chat-Blasen: links `#F1F5FB`, rechts `#1E56A0` weiss, Radius 14 (unten an der Sprechseite 4), 13.5px.

| Code | Szene | Ohne Schutz | Mit Schutz |
|---|---|---|---|
| LLM01 Prompt Injection | Posteingang + KI-Assistent | Unsichtbarer weisser Text wird rot sichtbar, unsichtbares Bild leitet Daten an evil-cdn.net weiter, rotes Paket «Vertragsdaten.zip» fliegt raus | Text durchgestrichen und entfernt, Warnhinweis |
| LLM02 Disclosure | Dokumentenregal mit Scanlinie + HR-Chat | Lohnliste wird abgerufen, Tabelle mit 4 Löhnen, Toast «Screenshot geteilt … 38 Personen» | Kein Zugriff, Verweis an HR |
| LLM03 Excessive Agency | Grid `1fr 1fr 220px`: Phishing-Mail, Agent-Kreis 130px mit Tool-Chips, KPIs | Chips Senden/Zahlung/Löschen werden rot; Zähler 214 Verträge, CHF 48'500, «gelöscht» | Chips gesperrt, Freigabe-Karte «Abgelehnt · B. Keller» |
| LLM04 Supply Chain | Dunkles Terminal + Paketvergleich «muster» vs «r**n**uster», Lupe «rn ≈ m» | Pickle-Code wird ausgeführt, Verbindung zur Angreifer-IP, gestrichelte Netzlinie | Freigabeliste und SHA-256-Abweichung, Quarantäne, signierter Spiegel |
| LLM05 Poisoning | Wissensbasis-Grid 7×3 Dokumente + Buchhaltungs-Chat | 3 rote Dokumente fallen hinein und werden zu Treffern, falsche IBAN, CHF 23'800 weg | Gelb gestrichelte Quarantäne, richtige IBAN mit Quelle |
| LLM06 Consumption | 3 KPIs, Budgetbalken (Budget CHF 5'000), 28 Balken | Kosten zählen hoch auf CHF 41'200, Portal «nicht erreichbar» | Deckel bei CHF 890, Label «Limit greift» |
| LLM07 Misinformation | Kundenbot + Faktencheck | Erfundener «Art. 40k OR», 100 % Rückerstattung, Social-Media-Karte «12'400 geteilt» | AGB Ziff. 7.2, CHF 29, Quellenangabe |
| LLM08 Hidden Context | Chat + unscharfer «Tresor» mit System-Prompt (blur 3.5px) | Prompt wird Zeile für Zeile verraten, API-Key rot, 9'812 Kundendaten | Prompt enthält keine Geheimnisse, grüne Hinweiszeilen; 3 Prompt-Varianten als Chips |
| LLM09 Vector | Bedeutungsraum: 14 Punkte (blau Alpenwerk, orange Brunner Bau), Suchradius-Kreis | Fremde Punkte werden rot, fremder Vertrag in der Antwort | Fremde Punkte gedimmt (opacity .18), eigene Quellen |
| LLM10 Output Handling | Bewertung → KI-Ausgabe → Rendering + Angreifer-Server | innerHTML: «Skript ausgeführt», Cookie wird gestohlen, Shop manipuliert | textContent/codiert, CSP, Protokoll grün |

Texte, Zahlen und Timings stehen exakt in den `SIM_*`-Objekten.

### 5. Finale «Der Ernstfall» (`finale.jsx`, `finale.css`)
Vollbild (`position:fixed; inset:0`), dunkel. Hintergrund je nach Phase: ready `#050B1F`, attack/breach `#12050A`, defend/result `#04122E`, jeweils mit radialem Leuchten (blau, rot oder cyan). Kopfzeile: «← Zurück zur Schulung», Brand, Ton-Umschalter.

Phasen:
1. **ready:** H1 «Montag, 07:42 Uhr. / *Alles passiert gleichzeitig.*» (zweite Zeile `#F87171`), Erklärtext, Button «Ernstfall starten».
2. **attack:** Layout mit drei Spalten `320px 1fr 380px`.
   - Links ein Schadenzähler (42px/800, rot leuchtend, CountUp) und das Ereignisprotokoll (neueste oben, unten ausgeblendet).
   - In der Mitte die **NetGraph**: SVG viewBox 100, Orbit-Kreis r=36, 10 Knoten (11 % Breite) im Kreis, Kern in der Mitte (28 %).
   - Rechts der Status «Angriff läuft · Kette n/10».
   - Alle 1050ms (Start bei 900ms) wird ein Knoten rot, die Speiche animiert gestrichelt und ein Ton spielt.
3. **breach:** Overlay mit Scanlines und einem glitchenden Betrag `fmtCHF(4'870'000)` (`clamp(60px,10vw,150px)`). Text «Zehn Lücken. Ein Morgen. Kein einziger Mitarbeitender hat ‹etwas falsch gemacht›.» Button «Zeit zurückdrehen – und diesmal verteidigen».
4. **rewind:** 2.3s Effekt «◀◀ 07:42» (cyan, Hue-Rotate). Knoten werden rückwärts zurückgesetzt, der Schaden zählt auf 0.
5. **defend:** 10 Runden in der Reihenfolge `CHAIN`.
   - Pro Runde: Frage, Timer-Balken (9000ms) und zwei Optionen in zufälliger Reihenfolge (richtig/falsch).
   - Richtig: Knoten wird cyan mit Ring-Puls und Schild-Ton.
   - Falsch oder Zeit abgelaufen: Knoten wird rot und der Schaden steigt.
   - Nach 1500ms folgt die nächste Runde.
6. **result:** Ein Partikel-Canvas (42vh) formt «GESCHÜTZT.» (ab 8 Treffern), «FAST GESCHÜTZT.» (ab 5) oder «NOCH VERWUNDBAR.» (rot `#F87171`).
   - Partikel fliegen von aussen ein (Verzögerung 0–500ms, Easing 0.04–0.09) und weichen der Maus in einem Radius von 80px aus.
   - Nach 2.6s blendet das Panel ein: 3 Kennzahlen (abgewehrt, Schaden verhindert, Quiz richtig) und eine **Teilnahmebestätigung** (weiss, Radius 18, editierbares Namensfeld 36px/800, Datum de-CH).
   - Buttons: «Bestätigung drucken» (`@media print` druckt nur `#cert`), «Nochmals verteidigen», «Schulung neu starten».

Töne: WebAudio-Oszillator (hit, alarm, shield, rewind, win), stummschaltbar. Der AudioContext wird erst nach einem Klick des Nutzers erzeugt.

---

## Interactions & Behavior
- Navigation über Sidebar, Intro-Kacheln und Weiter/Zurück. Beim Seitenwechsel scrollt Main nach oben.
- Die Simulation lässt sich beliebig oft wiederholen. «Zurücksetzen» stoppt alle Timer.
- Timer müssen beim Seitenwechsel oder Unmount aufgeräumt werden (siehe `clear()` und `clearAll()`).
- Animationen: `logIn` .3–.35s ease, `resIn` .4–.5s, `pulse` 1.6s, `shake` .45s, `scan` 1.6s ×2, `fly` 1.6s, `glitch` 2.4s, `ring` 1.2s, CountUp mit easeOutCubic (1200ms Standard).
- **Barrierefreiheit (beim Nachbau ergänzen):** `prefers-reduced-motion` beachten (Partikel, Shake und Glitch reduzieren), Tastaturfokus sichtbar machen, Protokoll als `aria-live="polite"` auszeichnen.

## State Management
In localStorage unter dem Schlüssel `cavora-owasp-llm-2026`:
```ts
type AppState = {
  page: number;                 // -1 Intro, 0–9 Risiko, 10 Finale
  sims: Record<RiskKey, { unsafe?: boolean; safe?: boolean }>;
  quiz: Record<RiskKey, number>; // gewählter Options-Index
  name?: string;                 // Name auf der Bestätigung
};
```
- Ein Risiko gilt als «erledigt», wenn `sims[key].unsafe || sims[key].safe`.
- Lokaler State in SimShell: `mode`, `step`, `running`, `done`, `seenUnsafe`, `choice`.
- Lokaler State im Finale: `phase`, `states[10]` ('', 'bad', 'ok'), `active`, `dmg`, `ticker`, `round`, `picked`, `order`, `muted`, `timeLeft`, `certReady`.
- Es gibt kein Backend. Für ein LMS empfiehlt sich optional eine SCORM- oder xAPI-Meldung bei Abschluss (Ergebnis: blocked, quizRight).
- **Sicherheit:** Das Namensfeld ist auf 60 Zeichen begrenzt und wird nur als Text gerendert (kein innerHTML). Die Schadcode-Strings in LLM10 sind reine Anzeige und dürfen nie per innerHTML gerendert werden.

## Design Tokens
| Token | Wert |
|---|---|
| primary | `#0A2463` |
| primary-2 | `#1E56A0` |
| accent | `#07D1FF` |
| bg | `#F7FAFF` |
| text | `#0F172A` |
| muted | `#475569` |
| line | `#E2E8F2` |
| danger / bg | `#EF4444` / `#FEF2F2` (Text `#B91C1C`, hell `#F87171`) |
| success / bg | `#10B981` / `#ECFDF5` (Text `#047857`, hell `#34D399`) |
| warning | `#F59E0B` (bg `#FFFBEB`, Rand `#FDE68A`) |
| Finale dunkel | `#050B1F`, `#12050A`, `#04122E`, Knoten `#0D1A3D` |
| Schatten | `0 10px 30px rgba(2,8,23,.08)` |
| Radien | 6, 7, 10, 12, 14, 16, 20, 999 |

**Typografie:**
- Sans: `'Helvetica Neue', Helvetica, Arial, sans-serif` (wie cavorapartners.com).
- Mono: `'JetBrains Mono'` (Google Fonts 400/700), für Eyebrows, Codes und Zeitstempel.
- Skala: 10.5 / 11 / 12.5 / 13.5 / 14 / 16 / 18 / 22 / 28 / 42, Display mit clamp bis 92px.
- Eyebrows: Mono 11–12px, Grossbuchstaben, letter-spacing .16–.2em.

**Abstände:** 6 / 8 / 10 / 14 / 16 / 18 / 22 / 26 / 38 / 46 / 54 px.

## Assets
- `assets/cavora-logo.png`: OG-Bild von cavorapartners.com (1200×630). Im Design **nicht verwendet**, das Branding ist als Schriftzug gesetzt. Für das Produkt ein offizielles SVG-Logo bei Cavora Partners anfragen.
- Icons: inline-SVG (`Icon` in `sim-core.jsx`): play, shield, reset, check, alert, lock, arrow, back.
- Keine Fotos und keine externen Medien.

## Files
- `OWASP LLM Top 10 Awareness.html`: Einstiegspunkt (lädt React UMD und Babel).
- `styles.css`: Shell, Risiko-Seite, SimShell, alle Szenen, Intro.
- `finale.css`: Finale inkl. Print-Stylesheet.
- `data.js`: `window.RISKS` mit allen Texten (oneLiner, explain, analogy, risks, protect, quiz).
- `sim-core.jsx`: `Icon`, `useCountUp`, `fmtCHF`, `SimShell`.
- `scenes-a.jsx`: Szenen und Skripte LLM01–05.
- `scenes-b.jsx`: Szenen und Skripte LLM06–10.
- `finale.jsx`: Finale (CHAIN-Daten, NetGraph, ParticleText, Sfx, Zertifikat).
- `app.jsx`: App-Shell, Intro, RiskPage, Quiz, Persistenz.

Inhaltsquelle: OWASP Top 10 for LLM Applications 2026 (CC BY-SA 4.0). Die Quellenangabe muss im Produkt sichtbar sein, z. B. im Footer.
