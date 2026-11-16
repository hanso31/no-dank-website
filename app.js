(function () {
  "use strict";

  var DE = {};
  var EN = {
    "a11y.skip": "Skip to content",
    "nav.aria": "Main navigation",
    "nav.wirkung": "How it works",
    "nav.anwendung": "How to use",
    "nav.dosierung": "Dosing",
    "nav.pflege": "Care",
    "nav.haendler": "For retailers",
    "hero.kicker": "Activated-carbon pouch · 50 g · coconut shells",
    "hero.title": '<span>Odors.</span><span>Simply</span><span class="hero-highlight">gone.</span>',
    "hero.sub": "Neutralizes unwanted odors.",
    "hero.cta": "How it works",
    "hero.cta2": "How to use it",
    "hero.doodle": "little pouch.<br>big impact.",
    "hero.fact1": "Activated-carbon granulate",
    "hero.fact2": "Perfume & fragrances",
    "hero.fact3": "Physics, not chemicals",
    "model.aria": "Interactive 3D model of the NO STANK. pouch; rotate it with a mouse, finger or the arrow keys",
    "model.hint": "↔ Drag to rotate",
    "wirkung.eyebrow": "How does activated carbon work?",
    "wirkung.title": "Physics, not<br>perfume.",
    "wirkung.intro": "From odors in the air to the very inside of a carbon granule: see exactly where the molecules end up.",
    "carbon.tab1": "Odors in the air",
    "carbon.tab2": "Through the fabric",
    "carbon.tab3": "Inside the pores",
    "carbon.aria": "Three magnification levels: odor molecules float toward the pouch, pass through the fabric and adhere to the pores of the activated carbon",
    "carbon.note1": "<strong>Smelling means sensing molecules.</strong> The tiny particles float freely through the air.",
    "carbon.note2": "<strong>The fabric lets air through.</strong> Inside, coconut-shell activated-carbon granulate is waiting.",
    "carbon.note3": "<strong>Adsorption instead of masking.</strong> The molecules adhere to the vast internal surface — and stay there.",
    "explainer.pause": "Pause",
    "explainer.play": "Play",
    "wirkung.p1": 'Activated carbon has a vast internal surface area — a single gram has roughly the surface of a tennis court. Odor molecules adhere to this surface (<strong>adsorption</strong>) and stay there. Nothing is masked, nothing is covered up: the odor disappears because it is bound.',
    "wirkung.diff": "<strong>The difference from air fresheners:</strong> sprays add a new smell. Activated carbon removes the old one.",
    "wirkung.compare1": "activated carbon — tiny, unremarkable",
    "wirkung.compare2": "of internal surface area, binding odors",
    "wirkung.compareNum1": "1 g",
    "wirkung.compareNum2": "≈ 1 tennis court",
    "usage.eyebrow": "How do I use the pouches?",
    "usage.title": "Unpack.<br>Place. Done.",
    "usage.intro": "No spray, no power, no effort. Three steps — and the carbon does the rest.",
    "usage.tab1": "Open the zip bag",
    "usage.tab2": "Place by the odor",
    "usage.tab3": "Optional: airflow",
    "usage.aria": "Three steps: open the zip bag only before use, place or hang the pouch by the source of the odor and optionally hang it in the moderate airflow of an existing fan",
    "usage.svgOpen": "ONLY OPEN",
    "usage.svgOpen2": "WHEN READY.",
    "usage.note1": "<strong>Keep it fresh until you need it.</strong> Open the airtight zip bag only when you are ready to use the pouch.",
    "usage.note2": "<strong>Put it where the odor is.</strong> Place it in a cabinet, bathroom or by the bin — or hang it up by its drawstring.",
    "usage.note3": "<strong>A fan is optional.</strong> For heavy odors or larger air-circulation areas, moderate airflow carries additional molecules to the carbon.",
    "fan.eyebrow": "Optional: more air movement",
    "fan.title": "When a fan is useful.",
    "fan.p1": "In small, enclosed spaces, placing or hanging the pouch by the odor source is enough — no fan is needed. For heavier odors or larger air-circulation areas, an existing fan can support its performance: hang the pouch freely in a moderate airflow.",
    "fan.li1": "Without a fan: place or hang it directly by the odor source",
    "fan.li2": "With a fan: hang it freely in a moderate airflow",
    "fan.li3": "Do not place it on the device or block its air inlet or outlet",
    "dosis.eyebrow": "Dosing",
    "dosis.title": "The rule of thumb:<br>50–100 g per m³.",
    "dosis.p1": "One pouch (50&nbsp;g) is ideal for small, enclosed spaces up to approx. 1&nbsp;m³ — e.g. cabinets, bin areas, bathrooms — or the room where your tomatoes spend the winter.",
    "dosis.multi": "<strong>For larger spaces:</strong> distribute several pouches (multi-pouch strategy) instead of buying one large product. This keeps contact surface per volume high.",
    "dosis.calcKicker": "The pouch calculator",
    "dosis.calcTitle": "How many does your space need?",
    "dosis.presetGrow": "Herb garden 60×60",
    "dosis.presetCab": "Cabinet",
    "dosis.presetWc": "Bathroom",
    "dosis.presetBin": "Bin area",
    "dosis.len": "Length",
    "dosis.wid": "Width",
    "dosis.hei": "Height",
    "dosis.unit": "m",
    "dosis.volume": "Room volume",
    "dosis.pouches": "pouches",
    "dosis.hint": "The higher the odor load, the closer to the upper end of the range you should dose.",
    "care.eyebrow": "Care & replacement",
    "care.title": "One carbon,<br>many lives.",
    "care.p1": "Well maintained, the pouch lasts considerably longer than a disposable product — and you'll notice in time when it's due.",
    "care.s1t": "Store airtight",
    "care.s1p": "Keep the pouch sealed in its zip bag until use — <strong>open only before use.</strong>",
    "care.s2t": "Check every 4–8 weeks",
    "care.s2p": "After weeks to months (depending on odor load) the surface is full — check regularly under heavy load.",
    "care.s3t": "Regenerate: 120&nbsp;°C, 2–3&nbsp;h",
    "care.s3p": "Heat the pouch at 120&nbsp;°C for 2–3 hours in an oven — bound molecules are released and the carbon works again.",
    "care.s4t": "Or replace",
    "care.s4p": "If a grease or moisture layer has built up, regeneration is limited — then replacing it is the honest solution.",
    "dealer.eyebrow": "For retailers",
    "dealer.title": "Sell<br>without risk.",
    "dealer.p1": "Running a store for discerning plant lovers, CBD products, or a kiosk? NO STANK. runs on consignment — you carry nothing, we carry the rest.",
    "dealer.c1t": "Zero risk",
    "dealer.c1p": "Buy-back guarantee and retention of ownership — unsold stock is ours, not yours.",
    "dealer.c2t": "Margin",
    "dealer.c2p": "On 5.90 CHF retail you keep up to 2.10 CHF per unit — at roughly 0.35 CHF cost of goods.",
    "dealer.c3t": "Display with QR",
    "dealer.c3p": "Sales-ready display — place it at the till, customers scan, understand, buy.",
    "dealer.c4t": "Monthly settlement",
    "dealer.c4p": "Settle once a month, with a free sample to get to know the product.",
    "dealer.cta": "Request sample + display",
    "dealer.ctaNote": "Reply within 48 hours. No subscription, no minimum stock.",
    "shops.eyebrow": "Where to buy",
    "shops.sticker": "Soon<br>near you.",
    "shops.title": "Soon in<br>your store.",
    "shops.p1": 'NO STANK. is available in selected stores — the list is growing. <a href="#haendler">Your store doesn’t stock it yet? Join here.</a>',
    "shops.link": "Your store doesn’t stock it yet? Join here.",
    "legal.eyebrow": "Contact & legal notice",
    "legal.title": "Legal notice",
    "legal.address": "Erdem Tertemiz<br>Benkenstr. 66<br>4102 Binningen, Switzerland<br><a href=\"mailto:info@nostank.ch\">info@nostank.ch</a>",
    "legal.note": "Sole proprietorship without commercial register entry.",
    "legal.title2": "Any questions?",
    "legal.p1": "Questions about the product, dosing or the retail consignment — write to us:",
    "legal.cta": "info@nostank.ch",
    "footer.line": "© 2026 NO STANK. — Odors. Simply gone. · nostank.ch",
    "footer.top": "Back to top ↑"
  };

  var META = {
    de: {
      title: "NO STANK. — Gestank. Einfach weg.",
      desc: "NO STANK. ist ein Säckchen mit 50 g Aktivkohle-Granulat aus Kokosschalen. Es bindet Gerüche in geschlossenen Räumen — nicht durch Parfüm, sondern durch Physik."
    },
    en: {
      title: "NO STANK. — Odors. Simply gone.",
      desc: "NO STANK. is a small pouch with 50 g of coconut-shell activated carbon granulate. It binds odors in enclosed spaces — not with perfume, but with physics."
    }
  };

  var currentLang = "de";
  var motionUpdaters = [];

  function captureDE() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      DE[el.getAttribute("data-i18n")] = el.innerHTML;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      DE["ph:" + el.getAttribute("data-i18n-ph")] = el.getAttribute("placeholder") || "";
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      DE[el.getAttribute("data-i18n-aria")] = el.getAttribute("aria-label") || "";
    });
  }

  function applyLang(lang) {
    currentLang = lang;
    var dict = lang === "en" ? EN : DE;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = dict[el.getAttribute("data-i18n")];
      if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var value = dict["ph:" + el.getAttribute("data-i18n-ph")];
      if (value !== undefined) el.setAttribute("placeholder", value);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var value = dict[el.getAttribute("data-i18n-aria")];
      if (value !== undefined) el.setAttribute("aria-label", value);
    });
    document.documentElement.setAttribute("lang", lang);
    document.title = META[lang].title;
    document.querySelector('meta[name="description"]').setAttribute("content", META[lang].desc);
    document.querySelectorAll(".lang-opt").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-lang") === lang);
    });
    try { localStorage.setItem("nostank-lang", lang); } catch (e) {}
    motionUpdaters.forEach(function (update) { update(); });
    updateCalc();
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem("nostank-lang"); } catch (e) {}
    var initial = saved === "en" ? "en" : "de";
    applyLang(initial);
    document.getElementById("lang-toggle").addEventListener("click", function () {
      applyLang(currentLang === "de" ? "en" : "de");
    });
  }

  var POUCH_SVG = '<svg viewBox="0 0 24 30" aria-hidden="true"><path d="M5 8Q12 5 19 8L18 26Q12 29 6 26Z" fill="#EFEAE0" stroke="#2B2723" stroke-width="1.4"/><path d="M5 6Q12 3 19 6v5Q12 13 5 11Z" fill="#C9C2B7" stroke="#2B2723" stroke-width="1.4"/><rect x="9" y="16" width="6" height="6" rx="1.5" fill="#6B645A"/><circle cx="11" cy="18" r=".7" fill="#D8FF3E"/><circle cx="13" cy="19.5" r=".7" fill="#D8FF3E"/><circle cx="11.3" cy="20.5" r=".7" fill="#D8FF3E"/></svg>';

  function parseNum(el) {
    var value = parseFloat(String(el.value).replace(",", "."));
    return isNaN(value) ? 0 : Math.max(0, value);
  }

  function updateCalc() {
    var lengthEl = document.getElementById("calc-l");
    if (!lengthEl) return;
    var volume = parseNum(lengthEl) * parseNum(document.getElementById("calc-b")) * parseNum(document.getElementById("calc-h"));
    document.getElementById("calc-vol").textContent = volume.toLocaleString(currentLang === "en" ? "en-US" : "de-CH", { maximumFractionDigits: 2 });
    var min = Math.max(1, Math.ceil(volume));
    var max = Math.max(min, Math.ceil(volume / .5));
    var row = document.getElementById("pouch-row");
    row.innerHTML = "";
    var shown = Math.min(max, 14);
    for (var i = 0; i < shown; i++) row.innerHTML += POUCH_SVG;
    if (max > shown) {
      var more = document.createElement("span");
      more.className = "pouch-more";
      more.textContent = "×" + max;
      row.appendChild(more);
    }
    var word = currentLang === "en" && max === 1 ? "pouch" : currentLang === "en" ? "pouches" : "Säckchen";
    document.getElementById("calc-count").innerHTML = min + "–" + max + " <span>" + word + "</span>";
  }

  function initCalc() {
    ["calc-l", "calc-b", "calc-h"].forEach(function (id) {
      document.getElementById(id).addEventListener("input", function () {
        document.querySelectorAll(".calc-presets .chip").forEach(function (chip) { chip.classList.remove("active"); });
        updateCalc();
      });
    });
    document.querySelectorAll(".calc-presets .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var dims = chip.getAttribute("data-preset").split(",");
        document.getElementById("calc-l").value = dims[0];
        document.getElementById("calc-b").value = dims[1];
        document.getElementById("calc-h").value = dims[2];
        document.querySelectorAll(".calc-presets .chip").forEach(function (other) { other.classList.toggle("active", other === chip); });
        updateCalc();
      });
    });
    updateCalc();
  }

  function initExplainer(root) {
    var buttons = Array.prototype.slice.call(root.querySelectorAll("[data-step]"));
    var notes = root.querySelectorAll("[data-note]");
    var counter = root.querySelector("[data-current-step]");
    var toggle = root.querySelector("[data-motion-toggle]");
    var toggleLabel = toggle.querySelector("[data-i18n]");
    var toggleIcon = toggle.querySelector(".motion-icon");
    var svg = root.querySelector(".carbon-svg, .usage-svg");
    var viewBox = svg.getAttribute("viewBox").split(/\s+/).map(Number);
    var panelWidth = viewBox[2] / 3;
    var step = 1;
    var playing = false;

    function showStep(next) {
      step = next;
      root.setAttribute("data-active", String(step));
      svg.setAttribute("viewBox", [(step - 1) * panelWidth, 0, panelWidth, viewBox[3]].join(" "));
      buttons.forEach(function (button) {
        var active = Number(button.getAttribute("data-step")) === step;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      notes.forEach(function (note) { note.classList.toggle("active", Number(note.getAttribute("data-note")) === step); });
      counter.textContent = "0" + step;
    }

    function updateToggle() {
      toggleLabel.textContent = currentLang === "en" ? (playing ? EN["explainer.pause"] : EN["explainer.play"]) : (playing ? "Pause" : "Abspielen");
      toggleIcon.textContent = playing ? "Ⅱ" : "▶";
      toggle.setAttribute("aria-pressed", String(!playing));
      toggle.setAttribute("aria-label", currentLang === "en" ? (playing ? "Pause animation" : "Play animation") : (playing ? "Animation pausieren" : "Animation abspielen"));
    }

    function syncPlayback() {
      root.classList.toggle("is-paused", !playing);
      if (svg && typeof svg.pauseAnimations === "function") {
        if (playing) svg.unpauseAnimations(); else svg.pauseAnimations();
      }
      updateToggle();
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () { showStep(Number(button.getAttribute("data-step"))); });
    });
    toggle.addEventListener("click", function () { playing = !playing; syncPlayback(); });
    motionUpdaters.push(updateToggle);
    showStep(1);
    syncPlayback();
  }

  document.addEventListener("DOMContentLoaded", function () {
    captureDE();
    initLang();
    initCalc();
    document.querySelectorAll("[data-explainer]").forEach(initExplainer);
  });
})();
