/* Inhalte: OWASP Top 10 fuer LLM-Anwendungen 2026 – in einfachen Worten (de-CH) */
window.RISKS = [
  {
    code: 'LLM01', key: 'injection', rank: 'Rang 1 · unverändert',
    title: ['Prompt', 'Injection'],
    oneLiner: 'Jemand versteckt Befehle in einem Text – und die KI führt sie aus, als kämen sie von Ihnen.',
    analogy: 'Wie ein Zettel im Paket, auf dem steht: «Lieber Postbote, bring den Inhalt bitte zu mir statt zum Empfänger.» Ein Mensch lacht darüber – die KI gehorcht.',
    explain: 'Eine KI kann nicht sicher unterscheiden, was Inhalt und was Anweisung ist. Versteckte Befehle können direkt im Chat stehen oder unsichtbar in E-Mails, Webseiten, PDFs oder sogar Bildern.',
    risks: ['Vertrauliche Daten fliessen unbemerkt ab', 'Die KI löst Aktionen aus, die niemand wollte', 'Sicherheitsregeln werden ausgehebelt'],
    protect: ['Externe Inhalte immer als Daten behandeln, nie als Befehl', 'Heikle Aktionen nur mit menschlicher Bestätigung', 'Keine automatischen Links und Bilder in KI-Antworten'],
    quiz: {
      q: 'Sie lassen eine KI ein PDF eines Lieferanten zusammenfassen. Wo liegt die Gefahr?',
      options: ['Das PDF könnte versteckte Anweisungen an die KI enthalten', 'Die Zusammenfassung könnte zu lang werden', 'PDFs sind für KI grundsätzlich unlesbar'],
      correct: 0,
      explain: 'Genau. Jeder externe Inhalt kann unsichtbare Befehle tragen – die KI liest alles, auch weissen Text auf weissem Grund.'
    }
  },
  {
    code: 'LLM02', key: 'disclosure', rank: 'Rang 2 · unverändert',
    title: ['Sensitive Information', 'Disclosure'],
    oneLiner: 'Die KI verrät Informationen, die die fragende Person nie hätte sehen dürfen.',
    analogy: 'Wie ein hilfsbereiter Archivar mit Generalschlüssel, der jedem jede Akte vorliest – Hauptsache, die Frage ist freundlich gestellt.',
    explain: 'Wenn eine KI auf Firmendaten zugreifen kann, gibt sie diese weiter, sobald jemand geschickt fragt. Lohnlisten, Gesundheitsdaten, Verträge oder Kundendaten landen so bei den falschen Personen.',
    risks: ['Verstoss gegen das Datenschutzgesetz (nDSG / DSGVO)', 'Geschäftsgeheimnisse werden publik', 'Vertrauensverlust bei Mitarbeitenden und Kunden'],
    protect: ['Berechtigung prüfen, bevor die KI ein Dokument liest', 'Personendaten beim Import schwärzen', 'Auffällige Anfragen begrenzen und protokollieren'],
    quiz: {
      q: 'Wann muss geprüft werden, ob jemand ein Dokument sehen darf?',
      options: ['Nachdem die KI geantwortet hat', 'Bevor die KI das Dokument überhaupt abruft', 'Gar nicht – die KI weiss das selbst'],
      correct: 1,
      explain: 'Richtig. Was die KI nicht abrufen kann, kann sie auch nicht verraten. Die KI selbst ist kein Türsteher.'
    }
  },
  {
    code: 'LLM03', key: 'agency', rank: 'Rang 3 · aufgestiegen',
    title: ['Excessive', 'Agency'],
    oneLiner: 'Die KI darf zu viel – und eine einzige manipulierte Nachricht genügt, um echten Schaden anzurichten.',
    analogy: 'Wie ein Praktikant am ersten Tag, der gleich Bankvollmacht, Generalschlüssel und den Firmenstempel erhält.',
    explain: 'KI-Agenten können E-Mails senden, Dateien löschen oder Zahlungen auslösen. Je mehr Rechte sie haben, desto grösser der Schaden, wenn sie getäuscht werden oder sich irren.',
    risks: ['Daten werden weitergeleitet oder gelöscht', 'Zahlungen werden ohne Kontrolle ausgelöst', 'Spuren des Angriffs werden verwischt'],
    protect: ['Nur die Rechte, die wirklich nötig sind (Least Privilege)', 'Kritische Aktionen immer durch einen Menschen freigeben', 'Agent handelt mit den Rechten der Person – nicht als Superuser'],
    quiz: {
      q: 'Ein KI-Agent soll Ihr Postfach sortieren. Welche Rechte braucht er?',
      options: ['Lesen, Senden, Löschen – sicher ist sicher', 'Nur Lesen und Verschieben', 'Vollzugriff auf alle Postfächer der Firma'],
      correct: 1,
      explain: 'Genau. Zum Sortieren reicht Lesen und Verschieben. Jedes zusätzliche Recht ist eine offene Tür.'
    }
  },
  {
    code: 'LLM04', key: 'supply', rank: 'Rang 4',
    title: ['Supply', 'Chain'],
    oneLiner: 'Fertige KI-Modelle und Bausteine aus dem Internet können manipuliert sein – und bringen den Angreifer gleich mit.',
    analogy: 'Wie ein USB-Stick, den man auf dem Parkplatz findet: Das Etikett sagt «Ferienfotos», der Inhalt sagt etwas ganz anderes.',
    explain: 'Kaum jemand baut KI von Grund auf. Modelle, Datensätze und Zusatzpakete kommen von Plattformen im Internet. Ein gefälschtes Paket mit fast identischem Namen reicht, um Schadcode einzuschleusen.',
    risks: ['Hintertüren im eigenen Produktivsystem', 'Gefälschte Pakete mit Tippfehler-Namen', 'Von der KI «erfundene» Paketnamen, die Angreifer registrieren'],
    protect: ['Nur geprüfte Quellen und eine Freigabeliste verwenden', 'Signatur und Prüfsumme (Hash) jedes Modells kontrollieren', 'Stückliste aller KI-Bausteine führen (AIBOM)'],
    quiz: {
      q: 'Was ist an «rnuster-ai» statt «muster-ai» gefährlich?',
      options: ['Nichts, das ist nur ein Tippfehler', 'Es ist ein typischer Trick, um ein gefälschtes Paket unterzuschieben', 'Der Name ist zu lang'],
      correct: 1,
      explain: 'Richtig. «rn» sieht aus wie «m». Solche Namen werden gezielt registriert, damit man sich vertippt oder verliest.'
    }
  },
  {
    code: 'LLM05', key: 'poisoning', rank: 'Rang 5',
    title: ['Data and Model', 'Poisoning'],
    oneLiner: 'Angreifer vergiften das Wissen der KI – schon wenige gefälschte Dokumente können die Antworten kippen.',
    analogy: 'Wie ein paar gefälschte Seiten, die jemand heimlich ins Firmenhandbuch klebt. Alle lesen weiter im Handbuch – und vertrauen ihm.',
    explain: 'Eine KI ist nur so gut wie die Daten, aus denen sie lernt oder liest. Wer Daten einschleusen kann, kann die KI gezielt falsche Dinge sagen lassen – oft ohne dass es auffällt.',
    risks: ['Falsche Bankverbindungen, Preise oder Anweisungen', 'Versteckte «Auslöser», die die KI umschalten', 'Langsam verzerrte Entscheidungen'],
    protect: ['Herkunft jedes Dokuments nachverfolgen', 'Neue Inhalte erst nach Freigabe in die Wissensbasis', 'Auffällige Muster automatisch erkennen und testen'],
    quiz: {
      q: 'Wie viele vergiftete Dokumente braucht es, um eine KI-Antwort zu manipulieren?',
      options: ['Mindestens die Hälfte aller Dokumente', 'Oft reichen schon sehr wenige', 'Das ist technisch unmöglich'],
      correct: 1,
      explain: 'Genau. Wenige, gezielt formulierte Dokumente können bei der Suche ganz oben landen und die Antwort bestimmen.'
    }
  },
  {
    code: 'LLM06', key: 'consumption', rank: 'Rang 6 · stark aufgestiegen',
    title: ['Unbounded', 'Consumption'],
    oneLiner: 'Ohne Grenzen kann jemand die KI so stark beanspruchen, dass sie ausfällt – oder die Rechnung explodiert.',
    analogy: 'Wie ein Firmen-Taxi-Konto ohne Limit: Jemand bestellt nonstop Fahrten nach Genf und zurück. Bezahlen muss die Firma.',
    explain: 'Jede KI-Anfrage kostet Rechenzeit und Geld. Angreifer schicken massenhaft aufwendige Anfragen, bis der Dienst lahmgelegt ist oder das Budget aufgebraucht («Denial of Wallet»).',
    risks: ['Explodierende Cloud-Kosten', 'Dienst ist für echte Nutzer nicht mehr erreichbar', 'Das Modell wird durch Massenabfragen kopiert'],
    protect: ['Limits pro Person und pro Anfrage (Tokens)', 'Harter Kostendeckel mit Alarm', 'Notschalter, der Endlosschleifen automatisch stoppt'],
    quiz: {
      q: 'Was bedeutet «Denial of Wallet»?',
      options: ['Die Kreditkarte wird gestohlen', 'Ein Angriff, der vor allem hohe Kosten verursacht', 'Die KI verweigert Zahlungen'],
      correct: 1,
      explain: 'Richtig. Der Dienst läuft vielleicht weiter – aber die Rechnung frisst das Budget auf.'
    }
  },
  {
    code: 'LLM07', key: 'misinfo', rank: 'Rang 7 · aufgestiegen',
    title: ['Misin', 'formation'],
    oneLiner: 'Die KI erfindet Fakten – und klingt dabei so überzeugend, dass Menschen danach handeln.',
    analogy: 'Wie ein sehr selbstbewusster Kollege, der nie «weiss ich nicht» sagt. Meistens hat er recht. Manchmal erfindet er ein Gesetz.',
    explain: 'Sprachmodelle erzeugen wahrscheinlich klingende Sätze, keine geprüften Wahrheiten. Erfundene Gesetzesartikel, Quellen oder Softwarepakete wirken echt – und führen zu falschen Entscheidungen.',
    risks: ['Falsche Zusagen an Kunden mit Kostenfolge', 'Rechtliche Fehlentscheide', 'Erfundene Softwarepakete, die Angreifer registrieren'],
    protect: ['Antworten an geprüfte Quellen binden und Quelle anzeigen', 'Jede Behauptung vor dem Handeln prüfen (Claim–Check–Act)', 'Bei wichtigen Entscheiden: Mensch prüft'],
    quiz: {
      q: 'Die KI nennt «Art. 40k OR» als Grundlage. Was tun Sie?',
      options: ['Übernehmen – die KI klang ja sicher', 'Quelle prüfen, bevor Sie handeln', 'Den Artikel einfach weglassen'],
      correct: 1,
      explain: 'Genau. Selbstsicherheit ist kein Beweis. Erst prüfen, dann handeln.'
    }
  },
  {
    code: 'LLM08', key: 'hidden', rank: 'Rang 8 · neu gefasst',
    title: ['Hidden Context', 'Exposure'],
    oneLiner: 'Angreifer bringen die KI dazu, ihre geheimen Hintergrund-Anweisungen preiszugeben – samt allem, was dort nicht hingehört.',
    analogy: 'Wie ein Verkäufer, der sich mit einer Fangfrage dazu bringen lässt, das interne Preishandbuch vorzulesen – inklusive Tresorcode auf der letzten Seite.',
    explain: 'Hinter jeder KI-Anwendung stehen versteckte Anweisungen (System-Prompt). Diese lassen sich fast immer herauslocken. Stehen dort Passwörter, API-Schlüssel oder interne Regeln, sind sie öffentlich.',
    risks: ['API-Schlüssel und Passwörter werden gestohlen', 'Interne Regeln (z. B. Rabatte) werden ausgenutzt', 'Angreifer planen gezielte Folgeangriffe'],
    protect: ['Niemals Geheimnisse in den System-Prompt', 'Regeln im Code durchsetzen, nicht im Prompt', 'Davon ausgehen: Der Prompt wird bekannt'],
    quiz: {
      q: 'Wo gehört ein API-Schlüssel hin?',
      options: ['In den System-Prompt, dort sieht ihn niemand', 'In einen gesicherten Tresor (Vault) ausserhalb der KI', 'In die Begrüssungsnachricht'],
      correct: 1,
      explain: 'Richtig. Alles im Prompt muss man als öffentlich betrachten. Geheimnisse gehören in einen Tresor.'
    }
  },
  {
    code: 'LLM09', key: 'vector', rank: 'Rang 9 · neu',
    title: ['Vector & Embedding', 'Weaknesses'],
    oneLiner: 'Die Suche der KI holt die «ähnlichsten» Texte – auch solche von fremden Kunden oder platzierte Köder.',
    analogy: 'Wie eine Bibliothek, in der Bücher nach Thema statt nach Besitzer stehen: Wer nach «Verträge» sucht, bekommt auch die Verträge der Nachbarfirma.',
    explain: 'Moderne KI-Systeme verwandeln Texte in Punkte in einem «Bedeutungsraum» und holen die nächstgelegenen. Ohne Trennung landen fremde Daten in der Antwort, und Angreifer platzieren gezielt Köder-Dokumente.',
    risks: ['Daten anderer Kunden oder Abteilungen werden sichtbar', 'Köder-Dokumente lenken Antworten um', 'Aus gespeicherten Vektoren lassen sich Texte rekonstruieren'],
    protect: ['Mandanten-Filter direkt in der Suche', 'Inhalte vor dem Speichern bereinigen und prüfen', 'Vektoren löschen, wenn das Original gelöscht wird'],
    quiz: {
      q: 'Wo muss der Filter «nur Daten von Kunde A» wirken?',
      options: ['Direkt in der Vektor-Suche', 'Im Text der Antwort', 'Im Begrüssungstext der KI'],
      correct: 0,
      explain: 'Genau. Nur was die Suche gar nicht findet, kann nicht in die Antwort rutschen.'
    }
  },
  {
    code: 'LLM10', key: 'output', rank: 'Rang 10',
    title: ['Improper Output', 'Handling'],
    oneLiner: 'Die Antwort der KI wird ungeprüft weiterverarbeitet – und verwandelt sich in Schadcode.',
    analogy: 'Wie ein Brief, den man ungeöffnet direkt in den Aktenvernichter, die Kasse und den Drucker steckt – ohne zu lesen, was drinsteht.',
    explain: 'KI-Antworten landen in Webseiten, Datenbanken oder Terminals. Wird der Text nicht geprüft, kann er dort als Code ausgeführt werden: Session-Diebstahl, gelöschte Tabellen, gekaperte Systeme.',
    risks: ['Session-Cookies werden gestohlen (XSS)', 'Datenbanken werden manipuliert (SQL-Injection)', 'Unsicherer, KI-generierter Code geht live'],
    protect: ['KI-Ausgabe behandeln wie fremde Benutzereingabe', 'Ausgabe für das Ziel korrekt codieren (HTML, SQL)', 'Markdown-Bilder und Skripte nicht automatisch ausführen'],
    quiz: {
      q: 'Wie sollte eine Anwendung die Antwort einer KI behandeln?',
      options: ['Als vertrauenswürdig – sie kommt ja aus dem eigenen System', 'Wie eine fremde, ungeprüfte Benutzereingabe', 'Als ausführbaren Code'],
      correct: 1,
      explain: 'Richtig. Zero Trust: Die KI kann manipuliert sein – also wird ihre Ausgabe geprüft und codiert.'
    }
  }
];
