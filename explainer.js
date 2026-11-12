/* ==========================================================================
   no dank. — explainer.js
   Erklärende Ablauf-Animation: Adsorption (nicht interaktiv, nahtloser Loop)
   Farbiger Flat-Stil: Zitrus-Ramp (Lime/Gold/Orange), weiche Blobs, Swosh-Pfade
   ========================================================================== */
(function () {
  "use strict";

  var canvas = document.getElementById("explain-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Welt ---------- */
  var LW = 1000, LH = 560, DUR = 14000;
  var C_LIME = "216,255,62", C_GOLD = "255,197,62", C_ORANGE = "255,138,62";

  /* Glow-Sprites je Farbe */
  function makeSprite(rgb) {
    var c = document.createElement("canvas");
    c.width = c.height = 48;
    var g = c.getContext("2d");
    var grad = g.createRadialGradient(24, 24, 2, 24, 24, 22);
    grad.addColorStop(0, "rgba(" + rgb + ",1)");
    grad.addColorStop(0.4, "rgba(" + rgb + ",.55)");
    grad.addColorStop(1, "rgba(" + rgb + ",0)");
    g.fillStyle = grad;
    g.beginPath(); g.arc(24, 24, 22, 0, 7); g.fill();
    return c;
  }
  var SPRITES = [makeSprite(C_LIME), makeSprite(C_GOLD), makeSprite(C_ORANGE)];
  var SOLID = ["#" + C_LIME.split(",").map(function (v) { return (+v).toString(16).padStart(2, "0"); }).join(""),
               "#FFC53E", "#FF8A3E"];

  /* Quelle + Säckchen */
  var SRC = { x: 150, y: 372 };
  var POUCH = { hemY: 196, bodyTop: 226, bodyBot: 432, xL: 620, xR: 836 };

  var pores = [];
  (function () {
    var spots = [
      [668, 292], [742, 282], [800, 300], [700, 338], [768, 346],
      [652, 372], [726, 388], [796, 380], [686, 414], [762, 420]
    ];
    for (var i = 0; i < spots.length; i++) pores.push({ x: spots[i][0], y: spots[i][1] });
  })();

  /* Moleküle auf Swosh-Pfaden (Kubisch-Bezier), Farbe aus der Ramp */
  var molecules = [];
  (function () {
    for (var i = 0; i < pores.length; i++) {
      molecules.push({
        p0: { x: SRC.x + (i % 3) * 16 - 16, y: SRC.y - 54 - (i % 4) * 12 },
        p1: { x: 280 + (i % 3) * 60, y: 110 + ((i * 41) % 90) },
        p2: { x: 540 + ((i * 67) % 80), y: 470 - ((i * 29) % 60) },
        p3: pores[i],
        start: 1500 + i * 300,
        dur: 2700,
        r: 4.8 + (i % 3) * 1.2,
        ci: i % 3,
        wob: i * 1.9
      });
    }
  })();

  /* Granulat-Specks (mehrtönig) */
  var specks = [];
  (function () {
    var tones = ["#6B645A", "#8A8175", "#4A443C", "#FFC53E"];
    for (var i = 0; i < 30; i++) {
      specks.push({
        x: POUCH.xL + 20 + ((i * 53) % (POUCH.xR - POUCH.xL - 40)),
        y: POUCH.bodyBot - 12 - ((i * 29) % 56),
        r: 1.8 + (i % 3) * 0.8,
        c: tones[i % 4]
      });
    }
  })();

  /* ---------- Helfer ---------- */
  function seg(t, a, b) { return Math.min(1, Math.max(0, (t - a) / (b - a))); }
  function ease(u) { return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; }
  function back(u) { var c = 1.70158; return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); }
  function cbez(p0, p1, p2, p3, u) {
    var v = 1 - u;
    return {
      x: v * v * v * p0.x + 3 * v * v * u * p1.x + 3 * v * u * u * p2.x + u * u * u * p3.x,
      y: v * v * v * p0.y + 3 * v * v * u * p1.y + 3 * v * u * u * p2.y + u * u * u * p3.y
    };
  }

  var W = 0, H = 0, dpr = 1, s = 1, ox = 0, oy = 0;
  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    W = Math.max(280, rect.width);
    H = W * (LH / LW);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.height = H + "px";
    s = Math.min(W / LW, H / LH);
    ox = (W - LW * s) / 2; oy = (H - LH * s) / 2;
    if (REDUCED) draw(8600);
  }
  function X(x) { return x * s + ox; }
  function Y(y) { return y * s + oy; }
  function R(r) { return r * s; }

  /* ---------- Szenen-Elemente ---------- */
  function drawBlobs() {
    var g1 = ctx.createRadialGradient(X(170), Y(110), 10, X(170), Y(110), R(280));
    g1.addColorStop(0, "rgba(255,197,62,.30)");
    g1.addColorStop(1, "rgba(255,197,62,0)");
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, W, H);
    var g2 = ctx.createRadialGradient(X(850), Y(430), 10, X(850), Y(430), R(320));
    g2.addColorStop(0, "rgba(216,255,62,.32)");
    g2.addColorStop(1, "rgba(216,255,62,0)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);
    var g3 = ctx.createRadialGradient(X(520), Y(60), 10, X(520), Y(60), R(240));
    g3.addColorStop(0, "rgba(255,138,62,.16)");
    g3.addColorStop(1, "rgba(255,138,62,0)");
    ctx.fillStyle = g3;
    ctx.fillRect(0, 0, W, H);
  }

  function drawSource(t) {
    ctx.lineCap = "round";
    /* Korpus */
    ctx.strokeStyle = "#948B7E";
    ctx.lineWidth = R(3);
    ctx.beginPath();
    ctx.moveTo(X(SRC.x - 34), Y(SRC.y - 40));
    ctx.lineTo(X(SRC.x - 27), Y(SRC.y + 42));
    ctx.lineTo(X(SRC.x + 27), Y(SRC.y + 42));
    ctx.lineTo(X(SRC.x + 34), Y(SRC.y - 40));
    ctx.stroke();
    /* Deckel in Gold */
    ctx.strokeStyle = "#E8A020";
    ctx.lineWidth = R(3.4);
    ctx.beginPath();
    ctx.moveTo(X(SRC.x - 44), Y(SRC.y - 40));
    ctx.lineTo(X(SRC.x + 44), Y(SRC.y - 40));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(X(SRC.x - 8), Y(SRC.y - 52));
    ctx.lineTo(X(SRC.x + 8), Y(SRC.y - 52));
    ctx.lineTo(X(SRC.x + 11), Y(SRC.y - 40));
    ctx.lineTo(X(SRC.x - 11), Y(SRC.y - 40));
    ctx.closePath();
    ctx.stroke();

    /* Aufsteigende Gestank-Puffs (Phase 1) */
    for (var k = 0; k < 3; k++) {
      var u = seg(t, 260 + k * 460, 260 + k * 460 + 1200);
      if (u <= 0 || u >= 1) continue;
      var px = SRC.x - 18 + k * 18, py = SRC.y - 64 - u * 52;
      ctx.globalAlpha = 0.75 * (1 - u);
      ctx.drawImage(SPRITES[k], X(px) - R(10), Y(py) - R(10), R(20), R(20));
      ctx.globalAlpha = 1;
    }
    /* Pulsringe */
    for (k = 0; k < 2; k++) {
      var w = seg(t, 600 + k * 1500, 600 + k * 1500 + 1100);
      if (w > 0 && w < 1) {
        ctx.beginPath();
        ctx.arc(X(SRC.x), Y(SRC.y - 70), R(12 + w * 46), 0, 7);
        ctx.strokeStyle = "rgba(255,197,62," + (0.5 * (1 - w)) + ")";
        ctx.lineWidth = R(2);
        ctx.stroke();
      }
    }
  }

  function rr(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawPouch() {
    /* Kordeln */
    ctx.strokeStyle = "#6B645A";
    ctx.lineWidth = R(3.4);
    ctx.beginPath();
    ctx.moveTo(X(POUCH.xL + 26), Y(POUCH.hemY + 6));
    ctx.quadraticCurveTo(X(POUCH.xL - 16), Y(POUCH.hemY - 66), X(POUCH.xL + 6), Y(POUCH.hemY - 86));
    ctx.moveTo(X(POUCH.xR - 26), Y(POUCH.hemY + 6));
    ctx.quadraticCurveTo(X(POUCH.xR + 16), Y(POUCH.hemY - 66), X(POUCH.xR - 6), Y(POUCH.hemY - 86));
    ctx.stroke();
    /* Kordelknoten in Orange */
    ctx.fillStyle = "#FF8A3E";
    ctx.beginPath(); ctx.arc(X(POUCH.xL + 6), Y(POUCH.hemY - 88), R(5), 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(X(POUCH.xR - 6), Y(POUCH.hemY - 88), R(5), 0, 7); ctx.fill();

    /* Körper */
    ctx.beginPath();
    ctx.moveTo(X(POUCH.xL), Y(POUCH.bodyTop));
    ctx.lineTo(X(POUCH.xR), Y(POUCH.bodyTop));
    ctx.lineTo(X(POUCH.xR - 14), Y(POUCH.bodyBot));
    ctx.quadraticCurveTo(X((POUCH.xL + POUCH.xR) / 2), Y(POUCH.bodyBot + 16), X(POUCH.xL + 14), Y(POUCH.bodyBot));
    ctx.closePath();
    ctx.fillStyle = "#948B7E";
    ctx.fill();

    /* Granulat-Zone in Sand + mehrtönige Specks */
    ctx.save();
    ctx.clip();
    ctx.fillStyle = "rgba(242,234,214,.55)";
    ctx.fillRect(X(POUCH.xL), Y(POUCH.bodyBot - 74), X(POUCH.xR) - X(POUCH.xL), R(90));
    for (var i = 0; i < specks.length; i++) {
      ctx.fillStyle = specks[i].c;
      ctx.beginPath();
      ctx.arc(X(specks[i].x), Y(specks[i].y), R(specks[i].r), 0, 7);
      ctx.fill();
    }
    ctx.restore();

    /* Umschlagbund */
    ctx.beginPath();
    ctx.moveTo(X(POUCH.xL - 6), Y(POUCH.hemY));
    ctx.lineTo(X(POUCH.xR + 6), Y(POUCH.hemY));
    ctx.lineTo(X(POUCH.xR), Y(POUCH.bodyTop));
    ctx.lineTo(X(POUCH.xL), Y(POUCH.bodyTop));
    ctx.closePath();
    ctx.fillStyle = "#6B645A";
    ctx.fill();
    /* Raffung */
    ctx.strokeStyle = "rgba(239,234,224,.5)";
    ctx.lineWidth = R(1.6);
    for (var g = 0; g < 5; g++) {
      var gx = POUCH.xL + 30 + g * ((POUCH.xR - POUCH.xL - 60) / 4);
      ctx.beginPath();
      ctx.moveTo(X(gx), Y(POUCH.hemY + 2));
      ctx.lineTo(X(gx + 3), Y(POUCH.bodyTop - 2));
      ctx.stroke();
    }

    /* Logo-Stitch */
    ctx.fillStyle = "#6B645A";
    var bx = (POUCH.xL + POUCH.xR) / 2 - 22, by = 252;
    rr(X(bx), Y(by), R(44), R(44), R(10));
    ctx.fill();
    ctx.strokeStyle = "#EFEAE0";
    ctx.lineWidth = R(1.6);
    ctx.setLineDash([R(4), R(3.4)]);
    rr(X(bx + 5), Y(by + 5), R(34), R(34), R(7));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#D8FF3E";
    ctx.beginPath(); ctx.arc(X(bx + 15), Y(by + 16), R(4.6), 0, 7); ctx.fill();
    ctx.fillStyle = "#FFC53E";
    ctx.beginPath(); ctx.arc(X(bx + 28), Y(by + 27), R(4), 0, 7); ctx.fill();
    ctx.fillStyle = "#FF8A3E";
    ctx.beginPath(); ctx.arc(X(bx + 17), Y(by + 31), R(5), 0, 7); ctx.fill();
  }

  function drawWaves(t, loopFade) {
    var a = seg(t, 8900, 9900) * loopFade;
    if (a <= 0.02) return;
    ctx.lineCap = "round";
    var cols = ["rgba(107,100,90,", "rgba(216,255,62,"];
    for (var k = 0; k < 3; k++) {
      var y0 = 262 + k * 36;
      ctx.setLineDash([R(10), R(12)]);
      ctx.lineDashOffset = -((t * 0.022) + k * 8) % 22;
      ctx.strokeStyle = cols[k % 2] + (0.34 * a) + ")";
      ctx.lineWidth = R(2.4);
      ctx.beginPath();
      ctx.moveTo(X(858), Y(y0));
      ctx.bezierCurveTo(X(905), Y(y0 - 14), X(940), Y(y0 + 14), X(992), Y(y0 - 4));
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  function star(px, py, r, color, alpha) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (var i = 0; i < 8; i++) {
      var a = (Math.PI / 4) * i, rad = i % 2 === 0 ? r : r * 0.42;
      var x = px + Math.cos(a) * rad, y = py + Math.sin(a) * rad;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawMolecules(t, loopFade) {
    /* Haftende Moleküle + Einschlag-Stern */
    for (var i = 0; i < molecules.length; i++) {
      var m = molecules[i];
      var arr = m.start + m.dur;
      var p = seg(t, arr, arr + 340);
      if (p >= 1) {
        ctx.drawImage(SPRITES[m.ci], X(m.p3.x) - R(9), Y(m.p3.y) - R(9), R(18), R(18));
      } else if (p > 0) {
        var sc = Math.max(0.01, back(p));
        var r = m.r * Math.min(sc, 1.6);
        ctx.globalAlpha = Math.min(1, sc) * loopFade;
        ctx.drawImage(SPRITES[m.ci], X(m.p3.x) - R(r * 2), Y(m.p3.y) - R(r * 2), R(r * 4), R(r * 4));
        ctx.globalAlpha = 1;
        if (p < 0.75) star(X(m.p3.x), Y(m.p3.y), R(14 * (1 - p / 0.75) + 4), SOLID[m.ci], 0.8 * (1 - p / 0.75) * loopFade);
      }
    }
    /* Fliegende Moleküle mit Schweif */
    for (i = 0; i < molecules.length; i++) {
      m = molecules[i];
      var u = seg(t, m.start, m.start + m.dur);
      if (u <= 0 || u >= 1) continue;
      var e = ease(u);
      var pos = cbez(m.p0, m.p1, m.p2, m.p3, e);
      var wob = Math.sin(t * 0.006 + m.wob) * 8 * (1 - e);
      var alpha = seg(u, 0, 0.12) * (1 - seg(u, 0.88, 1)) * loopFade;
      if (alpha <= 0.02) continue;
      var px = pos.x + wob, py = pos.y;
      ctx.globalAlpha = alpha * 0.35;
      if (m.lx !== undefined) ctx.drawImage(SPRITES[m.ci], X((m.lx + px) / 2) - R(m.r * 2), Y((m.ly + py) / 2) - R(m.r * 2), R(m.r * 4), R(m.r * 4));
      ctx.globalAlpha = alpha;
      ctx.drawImage(SPRITES[m.ci], X(px) - R(m.r * 2.4), Y(py) - R(m.r * 2.4), R(m.r * 4.8), R(m.r * 4.8));
      ctx.globalAlpha = 1;
      m.lx = px; m.ly = py;
    }
  }

  /* Captions + Fortschritt */
  var caps = null, fillEl = null;
  var PHASES = [[0, 3300], [3300, 7500], [7500, 10700], [10700, 13600]];
  function syncHud(t) {
    if (!caps) caps = Array.prototype.slice.call(document.querySelectorAll(".expl-captions p"));
    for (var i = 0; i < PHASES.length && i < caps.length; i++) {
      caps[i].classList.toggle("on", t >= PHASES[i][0] && t < PHASES[i][1]);
    }
    if (fillEl) fillEl.style.width = (t / DUR * 100) + "%";
  }

  function draw(t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    var loopFade = 1 - seg(t, 13300, 13950);
    drawBlobs();
    drawWaves(t, loopFade);
    drawSource(t);
    drawPouch();
    drawMolecules(t, loopFade);
    syncHud(t);
  }

  /* ---------- Loop ---------- */
  var running = false, raf = null, t0 = 0;
  function frame(now) {
    if (!running) return;
    if (!t0) t0 = now;
    draw((now - t0) % DUR);
    raf = requestAnimationFrame(frame);
  }
  function start() { if (!running && !REDUCED) { running = true; raf = requestAnimationFrame(frame); } }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); }

  window.addEventListener("resize", resize);
  fillEl = document.getElementById("expl-fill");

  if ("IntersectionObserver" in window && !REDUCED) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
    }, { threshold: 0.15 });
    io.observe(canvas);
  }

  resize();
})();
