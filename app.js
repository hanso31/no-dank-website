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
    "nav.bezug": "Availability",
    "hero.kicker": "Activated-carbon pouch · 50 g · coconut shells",
    "hero.title": '<span>Odors.</span><span>Simply</span><span class="hero-highlight">gone.</span>',
    "hero.sub": "Keine Chemie. Nur Physik.",
    "hero.price": "per pouch (50 g)",
    "hero.cta": "How it works",
    "hero.cta2": "How to use it",
    "hero.doodle": "little pouch.<br>big impact.",
    "hero.fact1": "Activated-carbon granulate",
    "hero.fact2": "Perfume & fragrances",
    "hero.fact3": "Keine Chemie. Nur Physik.",
    "model.aria": "Interactive 3D model of the NO STANK. pouch; rotate it with a mouse, finger or the arrow keys",
    "model.hint": "↔ Drag to rotate",
    "wirkung.eyebrow": "How does activated carbon work?",
    "wirkung.title": "Keine Chemie.<br>Nur Physik.",
    "wirkung.intro": "From odors in the air to the very inside of a carbon granule: see exactly where the molecules end up.",
    "ak.aria": "Interactive visualization: how activated carbon works",
    "ak.tabsAria": "Select chapter",
    "ak.stageAria": "Visualization. Use the mouse wheel, swipe or the arrow keys to move between chapters.",
    "ak.hint": "Scroll or swipe to browse",
    "ak.legendPollutant": "Pollutants",
    "ak.legendMedium": "Water / air",
    "ak.legendCarbon": "Activated carbon",
    "ak.kicker1": "Chapter 01 · Overview",
    "ak.heading1": "It starts at the surface.",
    "ak.text1": "Water or air carries pollutant and odor molecules to the activated-carbon granule. Blue molecules represent the medium; brown and gray particles represent dissolved or suspended compounds.",
    "ak.factLabel1": "The key difference",
    "ak.factTitle1": "Adsorption, not absorption",
    "ak.factText1": "During adsorption, substances attach to a surface rather than being distributed throughout the interior like water in a sponge.",
    "ak.kicker2": "Chapter 02 · Pore structure",
    "ak.heading2": "One granule. A vast interior.",
    "ak.text2": "The zoom reveals a branching network: macropores lead inside, mesopores distribute the flow and micropores provide countless binding sites. Pore sizes are shown at a schematic scale.",
    "ak.factLabel2": "Internal surface area",
    "ak.factText2": "The highly porous structure creates an enormous contact area, depending on the type of activated carbon and the measurement method.",
    "ak.kicker3": "Chapter 03 · Adsorption",
    "ak.heading3": "Attract. Dock. Hold.",
    "ak.text3": "Pollutant molecules approach the pore walls and are attracted by van der Waals forces. They dock and remain attached. Blue water or air molecules pass through the channels largely unhindered.",
    "ak.factLabel3": "Physical attraction",
    "ak.factText3": "The schematic connecting lines mark the moment a molecule reaches an available binding site.",
    "ak.kicker4": "Chapter 04 · Result & saturation",
    "ak.heading4": "Clean, but not unlimited.",
    "ak.text4": "The concentration of the depicted pollutants is significantly reduced at the outlet. Over time, molecules occupy more and more available sites on the pore walls. Once the carbon is saturated, its binding capacity declines.",
    "ak.saturation": "Occupied binding sites",
    "ak.factLabel4": "Important for use",
    "ak.factTitle4": "Replace or regenerate in time",
    "ak.factText4": "The right time depends on the pollutant load, medium and application. Replace saturated activated carbon properly or have it regenerated.",
    "ak.tab1": "Overview",
    "ak.tab2": "Pores",
    "ak.tab3": "Adsorption",
    "ak.tab4": "Saturation",
    "ak.reset": "Reset",
    "ak.resetAria": "Reset visualization",
    "explainer.pause": "Pause",
    "explainer.play": "Play",
    "wirkung.p1": 'Activated carbon has a vast internal surface area — a single gram has roughly the surface of a tennis court. Odor molecules adhere to this surface (<strong>adsorption</strong>) and stay there. Nothing is masked, nothing is covered up: the odor disappears because it is bound.',
    "wirkung.diff": "<strong>The difference from air fresheners:</strong> sprays add a new smell. Activated carbon removes the old one.",
    "wirkung.compare1": "activated carbon — tiny, unremarkable",
    "wirkung.compare2": "of internal surface area, binding odors",
    "wirkung.compareNum1": "1 g",
    "wirkung.compareNum2": "≈ 1 tennis court",
    "coconut.aria": "Air flows through a pouch while odor molecules adhere to activated-carbon granulate made from coconut shells",
    "coconut.caption": "Air flows through. Odors stay attached.",
    "coconut.eyebrow": "Made from coconut shells",
    "coconut.title": "Naturally porous.<br>More than just a filler.",
    "coconut.text": "Coconut shells become activated carbon with countless tiny pores. This natural carrier material buffers moisture, prevents clumping and supports even airflow through the granulate.",
    "coconut.point1": "Buffer moisture",
    "coconut.point2": "Keep the granulate loose and permeable to air",
    "coconut.point3": "Bind odors across a vast internal surface",
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
    "scenario.growTitle": "In the grow box",
    "scenario.growText": "Hang freely so air can flow around it from every side.",
    "scenario.growAmount": "60×60 cm: 1–2 pouches",
    "scenario.binTitle": "By the bin",
    "scenario.binText": "Place next to the bin or by the lid without opening the pouch.",
    "scenario.binAmount": "Small area: 1 pouch",
    "scenario.cabinetTitle": "In a cabinet",
    "scenario.cabinetText": "Place on a shelf or hang by the drawstring; leave it uncovered.",
    "scenario.cabinetAmount": "Up to approx. 1 m³: 1 pouch",
    "scenario.check": "Check every 4–8 weeks",
    "scenario.interval": "<strong>Care interval:</strong> Replace as needed or place in direct sunlight for several hours approx. every 3–6 months.",
    "dosis.eyebrow": "Dosing",
    "dosis.title": "The rule of thumb:<br>50–100 g per m³.",
    "dosis.p1": "One pouch (50&nbsp;g) is ideal for small, enclosed spaces up to approx. 1&nbsp;m³ — e.g. cabinets, bin areas, bathrooms — or the room where your tomatoes spend the winter.",
    "dosis.multi": "<strong>For larger spaces:</strong> distribute several pouches (multi-pouch strategy). This keeps the contact surface per volume high.",
    "dosis.calcKicker": "The pouch calculator",
    "dosis.calcTitle": "How many does your space need?",
    "dosis.presetGrow": "Herb garden 60×60",
    "dosis.presetCab": "Cabinet",
    "dosis.presetWc": "Bathroom",
    "dosis.presetBin": "Bin area",
    "dosis.sliderAria": "Set the room size in cubic metres",
    "dosis.volume": "Room size",
    "dosis.pouches": "pouches",
    "dosis.hint": "The higher the odor load, the closer to the upper end of the range you should dose.",
    "care.eyebrow": "Care & replacement",
    "care.title": "One carbon,<br>many lives.",
    "care.p1": "Well maintained, the pouch lasts considerably longer than a disposable product — and you'll notice in time when it's due.",
    "care.s1t": "Store airtight",
    "care.s1p": "Keep the pouch sealed in its zip bag until use — <strong>open only before use.</strong>",
    "care.s2t": "Check every 4–8 weeks",
    "care.s2p": "After weeks to months (depending on odor load) the surface is full — check regularly under heavy load.",
    "care.s3t": "Regenerate: several hours of direct sunlight (approx. every 3–6 months)",
    "care.s3p": "UV + heat drive out moisture and light odors.",
    "care.s4t": "Or replace",
    "care.s4p": "If a grease or moisture layer has built up, regeneration is limited — then replacing it is the honest solution.",
    "purchase.eyebrow": "Availability & price",
    "purchase.title": "Fresh air.<br>One small price.",
    "purchase.intro": "Coconut activated carbon, packed in Switzerland. One pouch for small, enclosed spaces.",
    "purchase.cardKicker": "NO STANK. · Activated-carbon pouch",
    "purchase.price": "<strong>7.90 CHF</strong><span>per pouch (50 g)</span>",
    "purchase.cta": "Ask about availability ↗",
    "dealer.eyebrow": "For retailers",
    "dealer.title": "Become a retailer",
    "dealer.text": "Would you like to stock NO STANK.? We offer consignment sales: you settle sold items and return unsold stock. Contact us for terms and a sample.",
    "safety.eyebrow": "Good to know",
    "safety.title": "Safety information",
    "safety.item1": "Not for consumption",
    "safety.item2": "Do not open",
    "safety.item3": "Keep away from children, animals and open flames",
    "safety.item4": "Do not place near food.",
    "form.name": "Name",
    "form.email": "Email",
    "form.quantity": "Desired quantity (optional)",
    "form.message": "Message",
    "form.submit": "Send request ↗",
    "form.sending": "Sending your request …",
    "form.success": "Thank you! Your request has been sent. We will reply by email.",
    "form.error": "Sending failed. Please try again or write to info@nostank.ch.",
    "footer.quicklinks": "Quick links",
    "footer.imprint": "Legal notice",
    "footer.language": "Language"
  };

  var META = {
    de: {
      title: "NO STANK. — Gestank. Einfach weg.",
      desc: "Aktivkohle-Säckchen gegen Gerüche — ohne Chemie, nur Physik. 50 g Kokosnuss-Aktivkohle, in der Schweiz abgefüllt."
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
    if (!document.body.hasAttribute("data-static-meta")) {
      document.title = META[lang].title;
      document.querySelector('meta[name="description"]').setAttribute("content", META[lang].desc);
    }
    document.querySelectorAll(".lang-opt").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (el) {
      var active = el.getAttribute("data-set-lang") === lang;
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-pressed", String(active));
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
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.addEventListener("click", function () { applyLang(button.getAttribute("data-set-lang")); });
    });
  }

  var POUCH_SVG = '<svg viewBox="0 0 24 30" aria-hidden="true"><path d="M5 8Q12 5 19 8L18 26Q12 29 6 26Z" fill="#EFEAE0" stroke="#2B2723" stroke-width="1.4"/><path d="M5 6Q12 3 19 6v5Q12 13 5 11Z" fill="#C9C2B7" stroke="#2B2723" stroke-width="1.4"/><rect x="9" y="16" width="6" height="6" rx="1.5" fill="#6B645A"/><circle cx="11" cy="18" r=".7" fill="#D8FF3E"/><circle cx="13" cy="19.5" r=".7" fill="#D8FF3E"/><circle cx="11.3" cy="20.5" r=".7" fill="#D8FF3E"/></svg>';

  function parseNum(el) {
    var value = parseFloat(String(el.value).replace(",", "."));
    return isNaN(value) ? 0 : Math.max(0, value);
  }

  function updateCalc() {
    var slider = document.getElementById("calc-size-input");
    if (!slider) return;
    var volume = parseNum(slider);
    document.getElementById("calc-size").textContent = volume.toLocaleString(currentLang === "en" ? "en-US" : "de-CH", { maximumFractionDigits: 1 });
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
    var slider = document.getElementById("calc-size-input");
    if (!slider) return;
    slider.addEventListener("input", function () {
      document.querySelectorAll(".calc-presets .chip").forEach(function (chip) { chip.classList.remove("active"); });
      updateCalc();
    });
    document.querySelectorAll(".calc-presets .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        slider.value = chip.getAttribute("data-preset");
        document.querySelectorAll(".calc-presets .chip").forEach(function (other) { other.classList.toggle("active", other === chip); });
        updateCalc();
      });
    });
    updateCalc();
  }

  function initNavigation() {
    var progress = document.querySelector("[data-scroll-progress]");
    var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a[href^='#']"));
    var sections = links.map(function (link) { return document.querySelector(link.getAttribute("href")); }).filter(Boolean);
    var scheduled = false;
    var activeLink = null;

    function update() {
      var root = document.documentElement;
      var max = Math.max(1, root.scrollHeight - window.innerHeight);
      if (progress) progress.style.transform = "scaleX(" + Math.min(1, Math.max(0, window.scrollY / max)) + ")";
      var current = "";
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.38) current = section.id;
      });
      links.forEach(function (link) {
        var active = link.getAttribute("href") === "#" + current;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      var nextActive = links.find(function (link) { return link.classList.contains("is-active"); }) || null;
      if (nextActive && nextActive !== activeLink) {
        var nav = nextActive.parentElement;
        nav.scrollLeft = nextActive.offsetLeft - (nav.clientWidth - nextActive.offsetWidth) / 2;
      }
      activeLink = nextActive;
      scheduled = false;
    }

    function schedule() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
  }

  function initAirflow() {
    var demos = document.querySelectorAll("[data-airflow]");
    if (!("IntersectionObserver" in window)) {
      demos.forEach(function (demo) { demo.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { entry.target.classList.toggle("is-visible", entry.isIntersecting); });
    }, { threshold: 0.2 });
    demos.forEach(function (demo) { observer.observe(demo); });
  }

  function initExplainer(root) {
    var buttons = Array.prototype.slice.call(root.querySelectorAll("[data-step]"));
    var notes = root.querySelectorAll("[data-note]");
    var counter = root.querySelector("[data-current-step]");
    var toggle = root.querySelector("[data-motion-toggle]");
    var toggleLabel = toggle.querySelector("[data-i18n]");
    var toggleIcon = toggle.querySelector(".motion-icon");
    var svg = root.querySelector(".usage-svg");
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
      root.classList.add("is-switching");
      clearTimeout(root._transitionTimer);
      root._transitionTimer = setTimeout(function () { root.classList.remove("is-switching"); }, 140);
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

  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = form.querySelector("[data-form-status]");
    var button = form.querySelector("[type='submit']");
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.className = "form-status";
      if (form.elements._honey.value) {
        form.reset();
        status.textContent = currentLang === "en" ? EN["form.success"] : "Danke! Deine Anfrage wurde gesendet. Wir melden uns per E-Mail.";
        status.classList.add("is-success");
        return;
      }
      button.disabled = true;
      status.textContent = currentLang === "en" ? EN["form.sending"] : "Deine Anfrage wird gesendet …";
      try {
        var response = await fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
          method: "POST",
          body: new FormData(form),
          headers: { "Accept": "application/json" }
        });
        var result = await response.json();
        if (!response.ok || !(result.success === true || result.success === "true")) throw new Error("Form submission failed");
        form.reset();
        status.textContent = currentLang === "en" ? EN["form.success"] : "Danke! Deine Anfrage wurde gesendet. Wir melden uns per E-Mail.";
        status.classList.add("is-success");
      } catch (error) {
        status.textContent = currentLang === "en" ? EN["form.error"] : "Senden fehlgeschlagen. Versuche es erneut oder schreib an info@nostank.ch.";
        status.classList.add("is-error");
      } finally {
        button.disabled = false;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    captureDE();
    initLang();
    initCalc();
    initNavigation();
    initAirflow();
    initForm();
    document.querySelectorAll("[data-explainer]").forEach(initExplainer);
  });
})();
