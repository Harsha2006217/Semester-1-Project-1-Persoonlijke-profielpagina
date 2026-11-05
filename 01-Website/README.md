# Project 1 — Persoonlijke profielpagina

**Maker:** Harsha Vardhan Kanaparthi
**Opleiding:** HBO-ICT (Open-ICT), Hogeschool Utrecht, semester 1
**Squad:** Harsha Kanaparthi, Amer Kopić, Abdallah Meftahi, Selim Kocak

## Wat is dit

Mijn eerste opdracht van de opleiding: een persoonlijke profielpagina met HTML, CSS
en een klein beetje JavaScript. Geen Bootstrap en geen ander framework.

## Mappenindeling

```
index.html              structuur en inhoud
css/
  style.css             alle opmaak
js/
  script.js             menu, leesmodus, actieve menulink, jaartal, headerhoogte
img/
  profiel-harsha.svg    monogram HK
  cloud-security.svg    illustratie bij mijn interesses
  favicon.svg           icoontje in het tabblad
```

## Openen

**Snel:** dubbelklik op `index.html`. Alles werkt, behalve dat sommige browsers het
onthouden van de leesmodus blokkeren bij een lokaal bestand.

**Volledig:** open een terminal in deze map en draai

```bash
python3 -m http.server 8000
```

Ga daarna naar `http://localhost:8000`. Nu werkt ook het onthouden van de leesmodus.

## Wat de pagina kan

- Zes secties: over mij, interesses, vaardigheden, achtergrond, over deze pagina,
  contact.
- Menubalk bovenaan die meescrolt; op een smal scherm een hamburgermenu.
- De sectie waar je bent, wordt gemarkeerd in het menu.
- Leesmodus: grotere tekst, ruimere regelafstand en meer contrast. De keuze blijft
  bewaard.
- Skiplink voor wie met het toetsenbord werkt (één keer Tab).
- Werkt op schermen van 320 tot 1440 px en bij inzoomen tot 400%.

## Getest

| Wat | Uitkomst |
|---|---|
| 10 schermbreedtes | 0 px horizontale overflow |
| 200%, 300%, 400% zoom en tekstzoom 200% | 0 px horizontale overflow |
| 12 functionele tests | alle 12 geslaagd |
| axe-core (desktop en mobiel) | 0 overtredingen |
| W3C-validatie HTML en CSS | 0 fouten |
| Contrast (15 metingen) | laagste 6,7:1, eis is 4,5:1 |
| Externe netwerkverzoeken | 0 |

Niet getest: Firefox, Edge, een echte telefoon en een echte schermlezer.

## Verantwoording

Ik heb een AI-assistent (Arena.ai Agent Mode) gebruikt bij het schrijven en
controleren van deze code. De keuzes (geen Bootstrap, monogram in plaats van foto,
geen adres of telefoonnummer, breakpoints in `em`, leesmodus als wildcard) zijn van
mij en komen uit de feedback van mijn squad. Ik kan de code uitleggen en zelf
aanpassen; zie `08-Code-uitleg` in het bewijspakket.
