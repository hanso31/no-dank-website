/* ==========================================================================
   no dank. — app.js
   Sprachumschaltung DE/EN, Dosierungsrechner, Scroll-Reveals
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- i18n ---------- */
  // Deutsch = Ausgangszustand des HTML (wird beim Start eingelesen)
  var DE = {};
  var EN = {
    "a11y.skip": "Skip to content",
    "nav.wirkung": "How it works",
    "nav.dosierung": "Dosing",
    "nav.pflege": "Care",
    "nav.haendler": "Retailers",

    "hero.kicker": "Activated-carbon odor filter · 50 g · coconut shells",
    "hero.title": 'Odors.<br>Simply <span class="lime-dot-end">gone</span>.',
    "hero.sub": "„no dank.” is a small pouch with 50&nbsp;g of coconut-shell activated carbon granulate. It binds odors in enclosed spaces — not with perfume, but with physics.",
    "hero.cta": "How it works",
    "hero.cta2": "Calculate your dosing",

    "wirkung.eyebrow": "How it works",
    "wirkung.title": "Physics, not perfume.",
    "wirkung.p1": 'Activated carbon has a vast internal surface area — a single gram has roughly the surface of a tennis court. Odor molecules adhere to this surface (<strong>adsorption</strong>) and stay there. Nothing is masked, nothing is covered up: the odor disappears because it is bound.',
    "wirkung.diff": "<strong>The difference from air fresheners:</strong> sprays add a new smell. Activated carbon removes the old one.",
    "wirkung.svgOdors": "Odor molecules",
    "wirkung.svgCarbon": "Activated carbon granulate",
    "wirkung.caption": "Adsorption: molecules adhere to the inner surface of the carbon — permanently, without fragrances.",
    "wirkung.compare1": "activated carbon — tiny, unremarkable",
    "wirkung.compare2": "of internal surface area, binding odors",
    "wirkung.compareNum1": "1 g",
    "wirkung.compareNum2": "≈ 1 tennis court",

    "dosis.eyebrow": "Dosing",
    "dosis.title": "The rule of thumb: 50–100&nbsp;g per m³.",
    "dosis.p1": "One pouch (50&nbsp;g) is ideal for small, enclosed spaces up to approx. 1&nbsp;m³ — e.g. cabinets, bin areas, bathrooms, grow tents up to 60×60&nbsp;cm.",
    "dosis.multi": "<strong>For larger spaces:</strong> distribute several pouches (multi-pouch strategy) instead of buying one large product. This keeps contact surface per volume high.",
    "dosis.calcTitle": "How many pouches does your space need?",
    "dosis.presetGrow": "Grow tent 60×60",
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

    "fan.eyebrow": "Pro tip",
    "fan.svgFan": "Fan",
    "fan.svgPouch": "Pouch in the airstream",
    "fan.svgOut": "purified air",
    "fan.title": "Hang it in the airflow.",
    "fan.p1": "In active spaces (e.g. a grow tent with air circulation), the pouch works best in the airflow: hang it in the path of the fan. Continuous air movement keeps bringing new odor molecules to the carbon — performance increases significantly compared to still air.",
    "fan.li1": "Hang it directly in the airflow, don't hide it in a corner",
    "fan.li2": "The drawstring makes the pouch easy to hang",
    "fan.li3": "Air exchange in the room further increases contact area",

    "care.eyebrow": "Care & replacement",
    "care.title": "One carbon, many lives.",
    "care.p1": "Well maintained, the pouch lasts considerably longer than a disposable product — and you'll notice in time when it's due.",
    "care.s1t": "Store airtight",
    "care.s1p": "Keep the pouch sealed in its zip bag until use — <strong>open only before use.</strong>",
    "care.s2t": "Check every 4–8 weeks",
    "care.s2p": "After weeks to months (depending on odor load) the surface is full — check regularly under heavy load.",
    "care.s3t": "Regenerate: 120&nbsp;°C, 2–3&nbsp;h",
    "care.s3p": "Heat the pouch at 120&nbsp;°C for 2–3 hours in an oven — bound molecules are released and the carbon works again.",
    "care.s4t": "Or replace",
    "care.s4p": "If a grease or moisture layer has built up, regeneration is limited — then replacing it is the honest solution.",

    "safety.eyebrow": "Safety",
    "safety.title": "Unspectacular. On purpose.",
    "safety.c1": "Not for consumption",
    "safety.c2": "Keep away from children & pets",
    "safety.c3": "Do not inhale dust",
    "safety.c4": "Enclosed spaces only",
    "safety.note": "Declaration on the packaging in German, French and Italian. No health claims, no additives.",

    "dealer.eyebrow": "For retailers",
    "dealer.title": "Sell without risk.",
    "dealer.p1": "Running a grow shop, CBD store or kiosk? „no dank.” runs on consignment — you carry nothing, we carry the rest.",
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
    "shops.title": "Soon in your store.",
    "shops.p1": '„no dank.” is available in selected stores — the list is growing. <a href="#haendler">Your store doesn’t stock it yet? Join here.</a>',

    "legal.eyebrow": "Contact & legal notice",
    "legal.title": "Legal notice",
    "legal.badge": "Placeholder — address to follow",
    "legal.note": "Sole proprietorship without commercial register entry.",
    "legal.title2": "Contact",
    "legal.p1": "Questions about the product, dosing or the retail consignment — write to us:",
    "legal.cta": "kontakt@nodank.ch",

    "footer.line": "© 2026 „no dank.” — Odors. Simply gone. · nodank.ch"
  };

  var META = {
    de: {
      title: "no dank. — Gerüche. Einfach weg.",
      desc: "„no dank.” ist ein Säckchen mit 50 g Aktivkohle-Granulat aus Kokosschalen. Es bindet Gerüche in geschlossenen Räumen — nicht durch Parfüm, sondern durch Physik."
    },
    en: {
      title: "no dank. — Odors. Simply gone.",
      desc: "„no dank.” is a small pouch with 50 g of coconut-shell activated carbon granulate. It binds odors in enclosed spaces — not with perfume, but with physics."
    }
  };

  var currentLang = null;

  function captureDE() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      DE[el.getAttribute("data-i18n")] = el.innerHTML;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      DE["ph:" + el.getAttribute("data-i18n-ph")] = el.getAttribute("placeholder") || "";
    });
  }

  function applyLang(lang) {
    currentLang = lang;
    var dict = lang === "en" ? EN : DE;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = dict["ph:" + el.getAttribute("data-i18n-ph")];
      if (v !== undefined) el.setAttribute("placeholder", v);
    });
    document.documentElement.setAttribute("lang", lang);
    document.title = META[lang].title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", META[lang].desc);
    document.querySelectorAll(".lang-opt").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-lang") === lang);
    });
    try { localStorage.setItem("nodank-lang", lang); } catch (e) {}
    updateCalc();
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem("nodank-lang"); } catch (e) {}
    var nav = (navigator.language || "de").toLowerCase();
    var initial = saved || (nav.indexOf("de") === 0 ? "de" : "en");
    applyLang(initial === "en" ? "en" : "de");
    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        applyLang(currentLang === "de" ? "en" : "de");
      });
    }
  }

  /* ---------- Dosierungsrechner ---------- */
  var POUCH_SVG =
    '<svg viewBox="0 0 22 28" aria-hidden="true"><path d="M4 7 L18 7 L16.6 24 Q11 26.6 5.4 24 Z" fill="#948B7E"/>' +
    '<path d="M4 7 Q11 9.3 18 7" stroke="#6B645A" stroke-width="1.3" fill="none"/>' +
    '<path d="M5.4 4.6 L16.6 4.6 L18 7 L4 7 Z" fill="#F1EDE4" stroke="#948B7E" stroke-width=".8"/></svg>';

  function parseNum(el) {
    var v = parseFloat(String(el.value).replace(",", "."));
    return isNaN(v) ? 0 : v;
  }

  function updateCalc() {
    var lEl = document.getElementById("calc-l");
    if (!lEl) return;
    var l = parseNum(lEl), b = parseNum(document.getElementById("calc-b")), h = parseNum(document.getElementById("calc-h"));
    var vol = l * b * h;
    document.getElementById("calc-vol").textContent =
      vol.toLocaleString(currentLang === "en" ? "en-US" : "de-CH", { maximumFractionDigits: 2 });

    var min = Math.max(1, Math.ceil(vol / 1));
    var max = Math.max(min, Math.ceil(vol / 0.5));

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

    var word;
    if (currentLang === "en") {
      word = max === 1 ? "pouch" : "pouches";
    } else {
      word = "Säckchen";
    }
    document.getElementById("calc-count").innerHTML = min + "–" + max + " <span>" + word + "</span>";
  }

  function initCalc() {
    ["calc-l", "calc-b", "calc-h"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener("input", updateCalc);
    });
    document.querySelectorAll(".calc-presets .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var dims = chip.getAttribute("data-preset").split(",");
        document.getElementById("calc-l").value = dims[0];
        document.getElementById("calc-b").value = dims[1];
        document.getElementById("calc-h").value = dims[2];
        document.querySelectorAll(".calc-presets .chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        updateCalc();
      });
    });
    updateCalc();
  }

  /* ---------- Scroll-Reveals ---------- */
  function initReveals() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Header-Schatten ---------- */
  function initHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Start ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    captureDE();
    initLang();
    initCalc();
    initReveals();
    initHeader();
  });
})();
