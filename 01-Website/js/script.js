/* ==========================================================================
   Project 1 - Persoonlijke profielpagina
   Maker: Harsha Vardhan Kanaparthi
   Bestand: js/script.js

   Dit script doet vier dingen:
   1. Het hamburgermenu openen en dichtmaken op een smal scherm
   2. De leesmodus aan/uit zetten en die keuze onthouden (wildcard user story)
   3. In het menu laten zien in welke sectie de bezoeker nu is
   4. Het jaartal in de footer invullen en de hoogte van de header doorgeven
      aan de CSS

   Ik heb geen library gebruikt. Alles kan met gewone browserfuncties.
   ========================================================================== */

/* "use strict" laat JavaScript fouten melden in plaats van ze stil te slikken. */
"use strict";

/* --------------------------------------------------------------------------
   1. HAMBURGERMENU
   -------------------------------------------------------------------------- */
const menuKnop = document.getElementById("menu-knop");
const hoofdmenu = document.getElementById("hoofdmenu");

/* Deze media query is dezelfde als in de CSS (52em). Ik gebruik hem om te
   weten of we op een smal scherm zitten. */
const smalScherm = window.matchMedia("(max-width: 52em)");

function menuDicht() {
  hoofdmenu.classList.remove("is-open");
  menuKnop.setAttribute("aria-expanded", "false");
}

function menuWissel() {
  const staatOpen = hoofdmenu.classList.toggle("is-open");
  /* aria-expanded is wat een schermlezer voorleest. Die moet altijd gelijk
     lopen met wat je op het scherm ziet. */
  menuKnop.setAttribute("aria-expanded", String(staatOpen));
}

menuKnop.addEventListener("click", menuWissel);

/* Klik je op een link in het menu, dan klapt het menu weer dicht.
   Anders blijft het open staan over de tekst heen. */
hoofdmenu.addEventListener("click", function (gebeurtenis) {
  if (gebeurtenis.target.tagName === "A" && smalScherm.matches) {
    menuDicht();
  }
});

/* Escape is de gewone manier om een menu te sluiten. Ik zet de focus terug op
   de knop, zodat een toetsenbordgebruiker niet verdwaalt. */
document.addEventListener("keydown", function (gebeurtenis) {
  if (gebeurtenis.key === "Escape" && hoofdmenu.classList.contains("is-open")) {
    menuDicht();
    menuKnop.focus();
  }
});

/* Gaat het venster van smal naar breed (of zoomt iemand uit), dan hoort het
   menu gewoon zichtbaar te zijn. Ik ruim de open/dicht-stand dan op. */
smalScherm.addEventListener("change", function () {
  menuDicht();
});

/* --------------------------------------------------------------------------
   2. LEESMODUS  (wildcard user story)
   De keuze wordt bewaard in localStorage. Dat is een klein opslagvak in de
   browser van de bezoeker zelf. Er gaat niets naar een server.
   -------------------------------------------------------------------------- */
const leesKnop = document.getElementById("leesmodus-knop");
const opslagSleutel = "harsha-leesmodus";

/* localStorage kan geblokkeerd zijn (bijvoorbeeld in een privevenster).
   Daarom zet ik het lezen en schrijven in try/catch: als het niet lukt,
   werkt de knop nog steeds, alleen wordt de keuze niet onthouden. */
function leesOpgeslagenStand() {
  try {
    return localStorage.getItem(opslagSleutel) === "aan";
  } catch (fout) {
    return false;
  }
}

function bewaarStand(aan) {
  try {
    localStorage.setItem(opslagSleutel, aan ? "aan" : "uit");
  } catch (fout) {
    /* Opslaan lukt niet. Geen probleem, de pagina blijft gewoon werken. */
  }
}

function zetLeesmodus(aan) {
  /* De klasse op <html> zorgt dat de CSS-regels voor de leesmodus gelden. */
  document.documentElement.classList.toggle("leesmodus", aan);
  leesKnop.setAttribute("aria-pressed", String(aan));

  /* De tekst op de knop verandert mee, zodat je ziet wat de knop nu gaat doen.
     Ik gebruik bewust geen aria-label: de naam van de knop moet gelijk zijn aan
     de tekst die je ziet. Dat is een eis uit de toegankelijkheidsrichtlijnen
     (WCAG 2.5.3 Label in Name) en mijn test met axe-core kwam hierop terug. */
  const tekst = leesKnop.querySelector(".leesmodus-tekst");
  if (tekst) {
    tekst.textContent = aan ? "Normaal" : "Leesmodus";
  }

  /* De header kan hoger worden door de grotere tekst. Even opnieuw meten. */
  meetHeader();
}

leesKnop.addEventListener("click", function () {
  const nieuweStand = !document.documentElement.classList.contains("leesmodus");
  zetLeesmodus(nieuweStand);
  bewaarStand(nieuweStand);
});

/* Bij het laden van de pagina meteen de bewaarde stand toepassen. */
zetLeesmodus(leesOpgeslagenStand());

/* --------------------------------------------------------------------------
   3. ACTIEVE SECTIE IN HET MENU
   IntersectionObserver kijkt welke sectie in beeld is. Dat is zuiniger dan
   bij elke scrollbeweging zelf de positie van alles uitrekenen.
   -------------------------------------------------------------------------- */
const menuLinks = Array.from(document.querySelectorAll(".menu-lijst a"));
const secties = menuLinks
  .map(function (link) {
    /* Van "#over-mij" maak ik het element met id="over-mij". */
    return document.querySelector(link.getAttribute("href"));
  })
  .filter(function (sectie) {
    return sectie !== null;
  });

function markeerActieveLink(id) {
  menuLinks.forEach(function (link) {
    const isDeze = link.getAttribute("href") === "#" + id;
    link.classList.toggle("is-actief", isDeze);
    if (isDeze) {
      /* aria-current vertelt een schermlezer waar je bent op de pagina. */
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/* Deze variabele hoort buiten de callback, zodat de waarnemer niet opnieuw
   gemaakt hoeft te worden. */
const waarnemer = new IntersectionObserver(
  function (items) {
    items.forEach(function (item) {
      if (item.isIntersecting) {
        markeerActieveLink(item.target.id);
      }
    });
  },
  {
    /* rootMargin maakt het waarnemingsgebied kleiner: alleen het middelste
       deel van het scherm telt mee. Zo springt de markering niet te vroeg. */
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0
  }
);

secties.forEach(function (sectie) {
  waarnemer.observe(sectie);
});

/* --------------------------------------------------------------------------
   4. HEADERHOOGTE EN JAARTAL
   -------------------------------------------------------------------------- */
function meetHeader() {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }
  /* Ik geef de gemeten hoogte als CSS-variabele door. De CSS gebruikt die bij
     scroll-padding-top, zodat een kopje niet onder de header verdwijnt.
     Dit is precies het probleem dat Selim in zijn feedback noemde: bij
     inzoomen werd de header hoger en viel tekst weg. */
  document.documentElement.style.setProperty(
    "--header-hoogte",
    header.getBoundingClientRect().height + "px"
  );
}

meetHeader();
window.addEventListener("resize", meetHeader);

/* ResizeObserver merkt het ook als de header hoger wordt zonder dat het
   venster verandert, bijvoorbeeld als het menu openklapt. */
if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(meetHeader).observe(document.querySelector(".site-header"));
}

/* Jaartal in de footer. Scheelt dat ik het elk jaar met de hand moet aanpassen. */
const jaarPlek = document.getElementById("jaar");
if (jaarPlek) {
  jaarPlek.textContent = String(new Date().getFullYear());
}
