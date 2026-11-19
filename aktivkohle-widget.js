(() => {
  "use strict";

  const WIDTH = 1000;
  const HEIGHT = 620;
  const DURATIONS = [9000, 11000, 14000, 12000];
  const COPY = {
    de: {
      views: ["Makro-Ansicht", "Poren-Zoom", "Adsorption live", "Ergebnis & Sättigung"],
      canvas: [
        "Verschmutztes Wasser oder Luft strömt auf ein Aktivkohlekorn zu.",
        "Der Zoom zeigt verzweigte Makro-, Meso- und Mikroporen im Aktivkohlekorn.",
        "Schadstoffmoleküle docken an Porenwänden an, während Wasser oder Luft weiterströmt.",
        "Gereinigte Moleküle verlassen die Aktivkohle; zunehmend mehr Bindungsstellen sind belegt."
      ],
      play: "Play",
      pause: "Pause",
      playAria: "Animation abspielen",
      pauseAria: "Animation pausieren",
      chapter: "Kapitel",
      paused: "Animation pausiert.",
      reset: "Visualisierung zurückgesetzt. Animation pausiert.",
      pollutantsMedium: "Schadstoffe + Medium",
      carbonGrain: "Aktivkohlekorn",
      macro: "Makropore",
      meso: "Mesopore",
      micro: "Mikroporen",
      surface: "1 g ≈ bis zu 1.500 m²",
      freeBinding: "freie Bindungsstelle",
      adsorption: "Adsorption",
      saturatedPores: "Gesättigte Poren",
      cleanMedium: "Gereinigtes Medium",
      occupied: "% belegt"
    },
    en: {
      views: ["Macro view", "Pore zoom", "Adsorption live", "Result & saturation"],
      canvas: [
        "Contaminated water or air flows toward an activated-carbon granule.",
        "The zoom reveals branching macropores, mesopores and micropores inside the activated-carbon granule.",
        "Pollutant molecules attach to pore walls while water or air continues to flow.",
        "Purified molecules leave the activated carbon as more binding sites become occupied."
      ],
      play: "Play",
      pause: "Pause",
      playAria: "Play animation",
      pauseAria: "Pause animation",
      chapter: "Chapter",
      paused: "Animation paused.",
      reset: "Visualization reset. Animation paused.",
      pollutantsMedium: "Pollutants + medium",
      carbonGrain: "Activated-carbon granule",
      macro: "Macropore",
      meso: "Mesopore",
      micro: "Micropores",
      surface: "1 g ≈ up to 1,500 m²",
      freeBinding: "available binding site",
      adsorption: "Adsorption",
      saturatedPores: "Saturated pores",
      cleanMedium: "Purified medium",
      occupied: "% occupied"
    }
  };
  const CHANNEL = [
    [{ x: 60, y: 315 }, { x: 230, y: 155 }, { x: 345, y: 465 }, { x: 510, y: 305 }],
    [{ x: 510, y: 305 }, { x: 680, y: 145 }, { x: 790, y: 455 }, { x: 955, y: 305 }]
  ];

  let instanceCount = 0;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const lerp = (from, to, amount) => from + (to - from) * amount;
  const smoothstep = (value) => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };

  function randomGenerator(seed) {
    return () => {
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      let value = Math.imul(seed ^ seed >>> 15, 1 | seed);
      value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value;
      return ((value ^ value >>> 14) >>> 0) / 4294967296;
    };
  }

  function cubic(segment, t) {
    const inverse = 1 - t;
    const a = inverse * inverse * inverse;
    const b = 3 * inverse * inverse * t;
    const c = 3 * inverse * t * t;
    const d = t * t * t;
    return {
      x: a * segment[0].x + b * segment[1].x + c * segment[2].x + d * segment[3].x,
      y: a * segment[0].y + b * segment[1].y + c * segment[2].y + d * segment[3].y
    };
  }

  function channelPoint(progress) {
    const t = clamp(progress);
    return cubic(CHANNEL[t < 0.5 ? 0 : 1], t < 0.5 ? t * 2 : (t - 0.5) * 2);
  }

  function traceChannel(context, width) {
    context.beginPath();
    context.moveTo(CHANNEL[0][0].x, CHANNEL[0][0].y);
    CHANNEL.forEach((segment) => context.bezierCurveTo(
      segment[1].x, segment[1].y, segment[2].x, segment[2].y, segment[3].x, segment[3].y
    ));
    context.lineWidth = width;
    context.lineCap = "round";
    context.lineJoin = "round";
  }

  function grainPath(context, x, y, radius, outline) {
    context.beginPath();
    outline.forEach((point, index) => {
      const px = x + Math.cos(point.angle) * radius * point.radius;
      const py = y + Math.sin(point.angle) * radius * point.radius;
      if (index === 0) context.moveTo(px, py);
      else context.lineTo(px, py);
    });
    context.closePath();
  }

  function drawWater(context, x, y, size, colors, alpha = 1) {
    context.save();
    context.globalAlpha *= alpha;
    context.strokeStyle = colors.water;
    context.fillStyle = colors.water;
    context.lineWidth = Math.max(1.2, size * 0.18);
    context.beginPath();
    context.moveTo(x - size * 0.55, y + size * 0.15);
    context.lineTo(x + size * 0.45, y - size * 0.35);
    context.stroke();
    context.beginPath();
    context.arc(x - size * 0.58, y + size * 0.18, size * 0.62, 0, Math.PI * 2);
    context.arc(x + size * 0.5, y - size * 0.38, size * 0.42, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "rgba(255,255,255,.65)";
    context.beginPath();
    context.arc(x - size * 0.75, y - size * 0.02, size * 0.17, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  function drawPollutant(context, x, y, size, colors, alpha = 1, gray = false) {
    context.save();
    context.globalAlpha *= alpha;
    context.fillStyle = gray ? colors.muted : colors.pollutant;
    context.strokeStyle = colors.text;
    context.lineWidth = Math.max(1, size * 0.12);
    context.beginPath();
    for (let index = 0; index < 8; index += 1) {
      const angle = index / 8 * Math.PI * 2;
      const radius = size * (index % 2 ? 0.82 : 1);
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (index === 0) context.moveTo(px, py);
      else context.lineTo(px, py);
    }
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }

  function drawArrow(context, fromX, fromY, toX, toY, color) {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    context.save();
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 2;
    context.setLineDash([8, 9]);
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
    context.setLineDash([]);
    context.beginPath();
    context.moveTo(toX, toY);
    context.lineTo(toX - Math.cos(angle - 0.55) * 13, toY - Math.sin(angle - 0.55) * 13);
    context.lineTo(toX - Math.cos(angle + 0.55) * 13, toY - Math.sin(angle + 0.55) * 13);
    context.closePath();
    context.fill();
    context.restore();
  }

  function label(context, text, x, y, colors, options = {}) {
    context.save();
    context.font = `${options.weight || 700} ${options.size || 20}px ${options.font || "system-ui, sans-serif"}`;
    context.textAlign = options.align || "left";
    context.textBaseline = "middle";
    context.fillStyle = options.color || colors.text;
    context.globalAlpha = options.alpha === undefined ? 1 : options.alpha;
    context.fillText(text, x, y);
    context.restore();
  }

  function pill(context, text, x, y, colors) {
    context.save();
    context.font = "800 19px system-ui, sans-serif";
    const width = context.measureText(text).width + 34;
    context.fillStyle = colors.accent;
    context.strokeStyle = colors.text;
    context.lineWidth = 2;
    context.beginPath();
    context.roundRect(x, y, width, 44, 22);
    context.fill();
    context.stroke();
    context.fillStyle = colors.text;
    context.textBaseline = "middle";
    context.fillText(text, x + 17, y + 23);
    context.restore();
  }

  function init(root) {
    if (root.dataset.akInitialized === "true") return;
    root.dataset.akInitialized = "true";

    const canvas = root.querySelector("[data-ak-canvas]");
    const context = canvas.getContext("2d");
    if (!context) return;

    const stage = root.querySelector("[data-ak-stage]");
    const tabs = Array.from(root.querySelectorAll("[data-ak-tab]"));
    const panels = Array.from(root.querySelectorAll("[data-ak-panel]"));
    const playButton = root.querySelector("[data-ak-play]");
    const playLabel = root.querySelector("[data-ak-play-label]");
    const playIcon = root.querySelector("[data-ak-play-icon]");
    const resetButton = root.querySelector("[data-ak-reset]");
    const currentLabel = root.querySelector("[data-ak-current]");
    const viewLabel = root.querySelector("[data-ak-view]");
    const liveLabel = root.querySelector("[data-ak-live]");
    const meter = root.querySelector("[data-ak-meter]");
    const meterFill = root.querySelector("[data-ak-meter-fill]");
    const saturationValue = root.querySelector("[data-ak-saturation-value]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const id = ++instanceCount;
    const random = randomGenerator(4815);
    const outline = Array.from({ length: 22 }, (_, index) => ({
      angle: index / 22 * Math.PI * 2,
      radius: 0.9 + random() * 0.14
    }));
    const grains = Array.from({ length: 18 }, () => ({
      x: 570 + random() * 340,
      y: 130 + random() * 360,
      radius: 2 + random() * 7,
      alpha: 0.12 + random() * 0.2
    }));
    const flowParticles = Array.from({ length: 30 }, (_, index) => ({
      phase: random(),
      lane: random(),
      speed: 0.07 + random() * 0.045,
      pollutant: index % 3 !== 0,
      gray: index % 5 === 0,
      size: 6 + random() * 5
    }));
    const poreParticles = Array.from({ length: 27 }, (_, index) => ({
      phase: index * 0.047 + random() * 0.05,
      speed: 0.037 + random() * 0.022,
      pollutant: index % 3 !== 0,
      gray: index % 5 === 0,
      size: 6 + random() * 4,
      dockAt: 0.36 + random() * 0.5,
      side: index % 2 ? 1 : -1
    }));
    const poreBranches = [
      { from: [325, 235], to: [260, 105], width: 34 },
      { from: [395, 385], to: [325, 535], width: 30 },
      { from: [695, 220], to: [745, 85], width: 34 },
      { from: [755, 392], to: [850, 520], width: 28 },
      { from: [275, 130], to: [180, 92], width: 15 },
      { from: [275, 130], to: [300, 42], width: 13 },
      { from: [335, 505], to: [230, 565], width: 14 },
      { from: [745, 95], to: [825, 48], width: 14 },
      { from: [845, 510], to: [940, 530], width: 14 },
      { from: [790, 240], to: [900, 160], width: 17 }
    ];

    let chapter = 0;
    let elapsed = 0;
    let playing = !reducedMotion.matches;
    let lastTime = performance.now();
    let inViewport = true;
    let width = 0;
    let height = 0;
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let lastWheel = 0;
    let touchStart = null;

    function copy() {
      return document.documentElement.lang.toLowerCase().startsWith("en") ? COPY.en : COPY.de;
    }

    function colors() {
      const styles = getComputedStyle(root);
      return {
        bg: styles.getPropertyValue("--ak-bg").trim() || "#fbf8f1",
        accent: styles.getPropertyValue("--ak-accent").trim() || "#d8ff3e",
        text: styles.getPropertyValue("--ak-text").trim() || "#2b2723",
        muted: styles.getPropertyValue("--ak-muted").trim() || "#6b645a",
        line: styles.getPropertyValue("--ak-line").trim() || "#ddd6ca",
        scene: styles.getPropertyValue("--ak-scene").trim() || "#f1ede5",
        water: styles.getPropertyValue("--ak-water").trim() || "#4b9fc9",
        pollutant: styles.getPropertyValue("--ak-pollutant").trim() || "#996249",
        carbon: styles.getPropertyValue("--ak-carbon").trim() || "#2b2723",
        font: styles.getPropertyValue("--ak-font").trim() || "system-ui, sans-serif"
      };
    }

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      scale = Math.min(width / WIDTH, height / HEIGHT);
      offsetX = (width - WIDTH * scale) / 2;
      offsetY = (height - HEIGHT * scale) / 2;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      render();
    }

    function beginScene(palette) {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = palette.scene;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.restore();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      context.setTransform(ratio * scale, 0, 0, ratio * scale, ratio * offsetX, ratio * offsetY);
      context.lineCap = "round";
      context.lineJoin = "round";
    }

    function drawGrainTexture(palette) {
      grains.forEach((grain) => {
        context.globalAlpha = grain.alpha;
        context.fillStyle = palette.bg;
        context.beginPath();
        context.arc(grain.x, grain.y, grain.radius, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
    }

    function drawOverview(time, palette) {
      context.save();
      context.fillStyle = palette.line;
      context.globalAlpha = 0.45;
      for (let y = 105; y < 555; y += 75) {
        context.beginPath();
        context.moveTo(25, y);
        context.bezierCurveTo(160, y - 18, 300, y + 18, 490, y);
        context.strokeStyle = palette.line;
        context.lineWidth = 1.5;
        context.stroke();
      }
      context.restore();

      flowParticles.forEach((particle) => {
        const travel = (particle.phase + time * particle.speed) % 1.2;
        const x = lerp(-30, 615, travel / 1.2);
        const y = 105 + particle.lane * 415 + Math.sin(time * 1.6 + particle.phase * 9) * 13;
        const fade = smoothstep((1.2 - travel) / 0.16);
        if (particle.pollutant) drawPollutant(context, x, y, particle.size, palette, fade, particle.gray);
        else drawWater(context, x, y, particle.size, palette, fade);
      });

      context.save();
      context.shadowColor = "rgba(43,39,35,.18)";
      context.shadowBlur = 28;
      context.shadowOffsetY = 16;
      grainPath(context, 730, 315, 190, outline);
      context.fillStyle = palette.carbon;
      context.fill();
      context.restore();
      grainPath(context, 730, 315, 190, outline);
      context.strokeStyle = palette.muted;
      context.lineWidth = 4;
      context.stroke();
      drawGrainTexture(palette);

      context.save();
      grainPath(context, 730, 315, 178, outline);
      context.clip();
      context.strokeStyle = palette.muted;
      context.globalAlpha = 0.55;
      [[590, 230, 745, 310, 870, 215], [605, 420, 720, 325, 885, 420], [725, 155, 745, 310, 700, 495]].forEach((points) => {
        context.beginPath();
        context.moveTo(points[0], points[1]);
        context.quadraticCurveTo(points[2], points[3], points[4], points[5]);
        context.lineWidth = 12;
        context.stroke();
      });
      context.restore();

      drawArrow(context, 350, 550, 575, 550, palette.muted);
      label(context, copy().pollutantsMedium, 55, 70, palette, { size: 22, weight: 800 });
      label(context, copy().carbonGrain, 730, 545, palette, { size: 22, weight: 800, align: "center" });
    }

    function drawPores(progress, palette, mode = "zoom") {
      const zoom = mode === "zoom" ? lerp(0.54, 1.18, smoothstep(progress * 1.3)) : 1;
      const alpha = mode === "zoom" ? smoothstep((progress - 0.12) * 3.5) : 1;

      context.save();
      context.translate(505, 310);
      context.scale(zoom, zoom);
      context.translate(-505, -310);
      grainPath(context, 505, 310, 390, outline);
      context.fillStyle = palette.carbon;
      context.fill();
      context.clip();
      context.globalAlpha = 0.22;
      drawGrainTexture(palette);
      context.globalAlpha = alpha;

      traceChannel(context, 78);
      context.strokeStyle = palette.bg;
      context.stroke();
      poreBranches.forEach((branch) => {
        context.beginPath();
        context.moveTo(branch.from[0], branch.from[1]);
        context.lineTo(branch.to[0], branch.to[1]);
        context.lineWidth = branch.width;
        context.strokeStyle = palette.bg;
        context.stroke();
      });

      traceChannel(context, 2);
      context.setLineDash([7, 12]);
      context.strokeStyle = palette.line;
      context.stroke();
      context.setLineDash([]);
      context.restore();

      if (mode === "zoom") {
        const labelAlpha = smoothstep((progress - 0.46) * 4);
        label(context, copy().macro, 110, 195, palette, { alpha: labelAlpha, size: 20, weight: 800 });
        label(context, copy().meso, 735, 110, palette, { alpha: labelAlpha, size: 20, weight: 800 });
        label(context, copy().micro, 745, 555, palette, { alpha: labelAlpha, size: 20, weight: 800 });
        if (progress > 0.35) pill(context, copy().surface, 58, 505, palette);
      }
    }

    function drawAdsorption(time, palette) {
      drawPores(1, palette, "action");
      poreParticles.forEach((particle, index) => {
        const raw = particle.phase + time * particle.speed;
        let travel = particle.pollutant ? Math.min(raw, particle.dockAt) : raw % 1.16;
        if (travel > 1) return;
        const point = channelPoint(travel);
        const next = channelPoint(Math.min(1, travel + 0.004));
        const length = Math.hypot(next.x - point.x, next.y - point.y) || 1;
        const normalX = -(next.y - point.y) / length;
        const normalY = (next.x - point.x) / length;
        const drift = Math.sin(raw * 18 + index) * 5;
        const attraction = particle.pollutant ? smoothstep((travel - (particle.dockAt - 0.17)) / 0.17) : 0;
        const offset = particle.pollutant ? lerp(drift, particle.side * 31, attraction) : drift;
        const x = point.x + normalX * offset;
        const y = point.y + normalY * offset;

        if (particle.pollutant && attraction > 0.15) {
          context.save();
          context.globalAlpha = 0.25 + attraction * 0.65;
          context.strokeStyle = palette.accent;
          context.lineWidth = 2;
          context.setLineDash([3, 5]);
          context.beginPath();
          context.moveTo(point.x + normalX * particle.side * 39, point.y + normalY * particle.side * 39);
          context.lineTo(x, y);
          context.stroke();
          context.setLineDash([]);
          context.beginPath();
          context.arc(x, y, particle.size + 6 + Math.sin(time * 4 + index) * 2, 0, Math.PI * 2);
          context.stroke();
          context.restore();
        }

        if (particle.pollutant) drawPollutant(context, x, y, particle.size, palette, 1, particle.gray);
        else drawWater(context, x, y, particle.size, palette);
      });
      label(context, copy().freeBinding, 660, 535, palette, { size: 19, weight: 750 });
      drawArrow(context, 740, 515, 790, 430, palette.accent);
      pill(context, copy().adsorption, 55, 55, palette);
    }

    function drawResult(progress, time, palette) {
      const saturation = 0.15 + smoothstep(progress) * 0.8;
      context.save();
      grainPath(context, 385, 320, 250, outline);
      context.fillStyle = palette.carbon;
      context.fill();
      context.clip();
      context.strokeStyle = palette.bg;
      context.lineWidth = 58;
      context.beginPath();
      context.moveTo(165, 210);
      context.bezierCurveTo(310, 135, 345, 495, 570, 375);
      context.moveTo(195, 430);
      context.bezierCurveTo(320, 480, 390, 185, 555, 230);
      context.stroke();
      context.restore();

      for (let index = 0; index < 34; index += 1) {
        const angle = index * 2.4;
        const radius = 75 + (index % 6) * 23;
        const x = 380 + Math.cos(angle) * radius;
        const y = 315 + Math.sin(angle) * radius * 0.78;
        if (index / 34 < saturation) drawPollutant(context, x, y, 8, palette, 1, index % 5 === 0);
      }

      drawArrow(context, 620, 310, 920, 310, palette.water);
      for (let index = 0; index < 12; index += 1) {
        const travel = (index / 12 + time * 0.09) % 1;
        const x = lerp(625, 970, travel);
        const y = 245 + (index % 4) * 42 + Math.sin(time + index) * 7;
        drawWater(context, x, y, 8, palette, smoothstep((1 - travel) * 5));
      }
      label(context, copy().saturatedPores, 375, 585, palette, { size: 21, weight: 800, align: "center" });
      label(context, copy().cleanMedium, 790, 175, palette, { size: 21, weight: 800, align: "center" });
      pill(context, `${Math.round(saturation * 100)} ${copy().occupied}`, 55, 50, palette);
    }

    function render() {
      if (!width || !height) return;
      const palette = colors();
      const seconds = elapsed / 1000;
      const progress = clamp(elapsed / DURATIONS[chapter]);
      beginScene(palette);
      if (chapter === 0) drawOverview(seconds, palette);
      if (chapter === 1) drawPores(progress, palette);
      if (chapter === 2) drawAdsorption(seconds, palette);
      if (chapter === 3) drawResult(progress, seconds, palette);
      root.style.setProperty("--ak-progress", progress.toFixed(4));
      const saturation = Math.round((0.15 + smoothstep(progress) * 0.8) * 100);
      meterFill.style.transform = `scaleX(${saturation / 100})`;
      saturationValue.textContent = `${saturation} %`;
      meter.setAttribute("aria-valuenow", String(saturation));
    }

    function setPlaying(value) {
      playing = value;
      playButton.setAttribute("aria-pressed", String(value));
      playButton.setAttribute("aria-label", value ? copy().pauseAria : copy().playAria);
      playLabel.textContent = value ? copy().pause : copy().play;
      playIcon.setAttribute("d", value ? "M6 4h3v12H6zM12 4h3v12h-3z" : "M5 3.5v13l11-6.5z");
      lastTime = performance.now();
    }

    function selectChapter(index, options = {}) {
      chapter = clamp(index, 0, tabs.length - 1);
      elapsed = options.startAt === undefined ? 0 : options.startAt;
      tabs.forEach((tab, tabIndex) => {
        const selected = tabIndex === chapter;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel, panelIndex) => {
        panel.hidden = panelIndex !== chapter;
      });
      if (currentLabel) currentLabel.textContent = String(chapter + 1).padStart(2, "0");
      viewLabel.textContent = copy().views[chapter];
      canvas.setAttribute("aria-label", copy().canvas[chapter]);
      if (options.announce) liveLabel.textContent = `${copy().chapter} ${chapter + 1}: ${copy().views[chapter]}. ${copy().paused}`;
      render();
      stage.classList.add("is-switching");
      clearTimeout(stage._transitionTimer);
      stage._transitionTimer = setTimeout(() => stage.classList.remove("is-switching"), 140);
    }

    function manualChapter(index, focusTab = false) {
      const next = clamp(index, 0, tabs.length - 1);
      const staticTimes = [2600, 7900, 4600, 6900];
      setPlaying(false);
      selectChapter(next, { startAt: staticTimes[next], announce: true });
      if (focusTab) tabs[next].focus();
    }

    tabs.forEach((tab, index) => {
      const tabId = `ak-widget-${id}-tab-${index}`;
      const panelId = `ak-widget-${id}-panel-${index}`;
      tab.id = tabId;
      tab.setAttribute("aria-controls", panelId);
      panels[index].id = panelId;
      panels[index].setAttribute("aria-labelledby", tabId);
      tab.addEventListener("click", () => manualChapter(index));
      tab.addEventListener("keydown", (event) => {
        let next = null;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next !== null) {
          event.preventDefault();
          manualChapter(next, true);
        }
      });
    });

    playButton.addEventListener("click", () => setPlaying(!playing));
    resetButton.addEventListener("click", () => {
      setPlaying(false);
      selectChapter(0, { announce: true });
      liveLabel.textContent = copy().reset;
    });

    stage.addEventListener("wheel", (event) => {
      const now = performance.now();
      if (Math.abs(event.deltaY) < 24 || now - lastWheel < 650) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      const next = chapter + direction;
      if (next < 0 || next >= tabs.length) return;
      event.preventDefault();
      lastWheel = now;
      manualChapter(next);
    }, { passive: false });

    stage.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") touchStart = { x: event.clientX, y: event.clientY };
    });
    stage.addEventListener("pointerup", (event) => {
      if (!touchStart || event.pointerType !== "touch") return;
      const deltaX = event.clientX - touchStart.x;
      const deltaY = event.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        const next = chapter + (deltaX < 0 ? 1 : -1);
        if (next >= 0 && next < tabs.length) manualChapter(next);
      }
    });
    stage.addEventListener("pointercancel", () => { touchStart = null; });
    stage.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const next = chapter + (event.key === "ArrowRight" ? 1 : -1);
      if (next >= 0 && next < tabs.length) {
        event.preventDefault();
        manualChapter(next);
      }
    });

    const languageObserver = new MutationObserver(() => {
      setPlaying(playing);
      selectChapter(chapter, { startAt: elapsed });
      liveLabel.textContent = "";
    });
    languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    if ("IntersectionObserver" in window) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        inViewport = entries[0].isIntersecting;
        lastTime = performance.now();
      }, { threshold: 0.05 });
      intersectionObserver.observe(root);
    }

    function tick(now) {
      const delta = Math.min(80, now - lastTime);
      lastTime = now;
      if (playing && inViewport && !document.hidden) {
        elapsed += delta;
        if (elapsed >= DURATIONS[chapter]) selectChapter((chapter + 1) % tabs.length);
        render();
      }
      requestAnimationFrame(tick);
    }

    setPlaying(playing);
    selectChapter(0, { startAt: reducedMotion.matches ? 2600 : 0 });
    resize();
    requestAnimationFrame(tick);
  }

  function initAll() {
    document.querySelectorAll("[data-ak-widget]").forEach(init);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAll);
  else initAll();
})();
