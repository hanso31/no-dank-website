/* ==========================================================================
   no dank. — sim.js
   Interaktive Adsorptions-Simulation (Canvas 2D, kein Dependency)
   Phasen: absorb → full → regen (Loop). Klick tippt Geruch ein.
   ========================================================================== */
(function () {
  "use strict";

  var canvas = document.getElementById("adsorption-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Welt ---------- */
  var LW = 1000, LH = 620, BED_TOP = 400;

  function surfaceY(x) { return BED_TOP + 10 * Math.sin(x * 0.017) + 6 * Math.sin(x * 0.043 + 2); }

  /* Granulat: gefülltes Bett mit Poren */
  var granules = [], totalPores = 0;
  (function buildBed() {
    var y, x, row = 0;
    for (y = BED_TOP - 14; y < LH + 50; y += 34, row++) {
      for (x = -30 + (row % 2) * 21; x < LW + 60; x += 42) {
        var r = 26 + Math.random() * 12;
        var pores = [];
        var n = 4 + Math.floor(Math.random() * 3);
        for (var i = 0; i < n; i++) {
          var a = Math.random() * Math.PI * 2, d = Math.random() * r * 0.52;
          pores.push({ dx: Math.cos(a) * d, dy: Math.sin(a) * d, pr: 3.4 + Math.random() * 2.8, occ: false });
        }
        totalPores += n;
        granules.push({ x: x + (Math.random() * 12 - 6), y: y + (Math.random() * 8 - 4), r: r, pores: pores });
      }
    }
  })();

  var focus = granules.reduce(function (best, g) {
    var db = Math.abs(best.x - LW / 2) + Math.abs(best.y - (BED_TOP + 30));
    var dg = Math.abs(g.x - LW / 2) + Math.abs(g.y - (BED_TOP + 30));
    return dg < db ? g : best;
  }, granules[0]);

  /* ---------- Moleküle ---------- */
  var molecules = [], occCount = 0;

  function spawn(x, y, n) {
    for (var i = 0; i < n; i++) {
      if (molecules.length > 240) return;
      molecules.push({
        x: x + (Math.random() * 50 - 25),
        y: y + (Math.random() * 30 - 15),
        vx: Math.random() * 1.6 - 0.8, vy: Math.random() * 0.8,
        st: 0, /* 0 frei, 1 zielt, 2 haftet */
        pore: null, gran: null, fade: 1
      });
    }
  }

  /* Sprite weichzeichnen (Glow) */
  var sprite = document.createElement("canvas");
  sprite.width = sprite.height = 48;
  (function () {
    var g = sprite.getContext("2d");
    var grad = g.createRadialGradient(24, 24, 2, 24, 24, 22);
    grad.addColorStop(0, "rgba(216,255,62,1)");
    grad.addColorStop(0.35, "rgba(216,255,62,.55)");
    grad.addColorStop(1, "rgba(216,255,62,0)");
    g.fillStyle = grad;
    g.beginPath(); g.arc(24, 24, 22, 0, 7); g.fill();
  })();

  /* ---------- Kamera ---------- */
  var W = 0, H = 0, dpr = 1;
  var cam = { s: 1, x: 0, y: 0, ts: 1, tx: 0, ty: 0, zoomed: false };

  function baseFit() {
    var s = Math.min(W / LW, H / LH);
    return { s: s, x: (W - LW * s) / 2, y: (H - LH * s) / 2 };
  }
  function setCamTarget() {
    if (cam.zoomed) {
      var f = focus, s = baseFit().s * 2.5;
      cam.ts = s; cam.tx = W / 2 - f.x * s; cam.ty = H * 0.52 - f.y * s;
    } else {
      var b = baseFit();
      cam.ts = b.s; cam.tx = b.x; cam.ty = b.y;
    }
  }
  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    W = Math.max(280, rect.width);
    H = W * (LH / LW);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.height = H + "px";
    setCamTarget();
    if (REDUCED) drawStatic();
  }

  /* ---------- Phasen ---------- */
  var phase = "absorb", phaseT = 0, regenWave = 0;

  function setPhase(p) {
    phase = p; phaseT = 0;
    var map = { absorb: "sim-status-abs", full: "sim-status-full", regen: "sim-status-regen" };
    ["sim-status-abs", "sim-status-full", "sim-status-regen"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.classList.toggle("on", id === map[p]);
    });
  }

  /* ---------- Update ---------- */
  function findPore(mx) {
    var best = null, bd = 1e9;
    for (var i = 0; i < granules.length; i++) {
      var g = granules[i];
      if (g.y + g.r < BED_TOP - 20 || g.y - g.r > BED_TOP + 160) continue;
      for (var j = 0; j < g.pores.length; j++) {
        var p = g.pores[j];
        if (p.occ) continue;
        var px = g.x + p.dx, d = Math.abs(px - mx);
        if (d < bd) { bd = d; best = { g: g, p: p }; }
      }
    }
    return best;
  }

  function update(dt) {
    phaseT += dt;
    cam.s += (cam.ts - cam.s) * 0.09;
    cam.x += (cam.tx - cam.x) * 0.09;
    cam.y += (cam.ty - cam.y) * 0.09;
    regenWave = Math.max(0, regenWave - dt * 0.02);

    if (phase === "full" && phaseT > 2200) startRegen();
    if (phase === "regen" && phaseT > 1900) setPhase("absorb");

    var full = occCount >= totalPores * 0.55;

    /* Ambient-Nachschub */
    if (!REDUCED && phase === "absorb" && Math.random() < 0.07) {
      var free = 0;
      for (var k = 0; k < molecules.length; k++) if (molecules[k].st === 0) free++;
      if (free < 70) spawn(Math.random() * LW, -10, 1);
    }

    for (var i = molecules.length - 1; i >= 0; i--) {
      var m = molecules[i];

      if (m.st === 2) { /* haftet */
        if (phase === "regen") { /* freiwerden */
          m.st = 0; m.pore.occ = false; m.pore = null; m.gran = null;
          occCount = Math.max(0, occCount - 1);
          m.vy = -(1.2 + Math.random() * 1.4); m.vx = Math.random() * 1 - 0.5;
        }
        continue;
      }

      if (m.st === 1) { /* steuert Pore an */
        var tx = m.gran.x + m.pore.dx, ty = m.gran.y + m.pore.dy;
        var dx = tx - m.x, dy = ty - m.y, d2 = dx * dx + dy * dy;
        if (d2 < 9) {
          m.st = 2; m.x = tx; m.y = ty; m.pore.occ = true; occCount++;
          if (occCount >= totalPores * 0.55 && phase === "absorb") setPhase("full");
        } else {
          var sp = 0.09 * dt / 16;
          m.vx = dx * sp; m.vy = dy * sp;
          m.x += m.vx; m.y += m.vy;
        }
        continue;
      }

      /* frei: Brown'sche Bewegung + Anziehung an der Oberfläche */
      m.vx += (Math.random() - 0.5) * 0.22;
      m.vy += (Math.random() - 0.5) * 0.16 + 0.012;
      var sy = surfaceY(m.x);
      if (m.y > sy - 110) m.vy += 0.05;
      m.vx *= 0.985; m.vy *= 0.99;
      m.x += m.vx * (dt / 16); m.y += m.vy * (dt / 16);

      if (m.y >= sy - 4) {
        if (phase === "regen" || full) { m.vy = -Math.abs(m.vy) * 0.55 - 0.3; m.y = sy - 5; }
        else {
          var t = findPore(m.x);
          if (t) { m.st = 1; m.pore = t.p; m.gran = t.g; }
          else { m.vy = -Math.abs(m.vy) * 0.5; }
        }
      }
      if (m.y < -60 || m.x < -80 || m.x > LW + 80) molecules.splice(i, 1);
    }

    /* HUD */
    var pct = Math.round(occCount / totalPores * 100);
    var fillEl = document.getElementById("sim-fill");
    var pctEl = document.getElementById("sim-pct");
    if (fillEl) fillEl.style.width = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";
  }

  function startRegen() {
    setPhase("regen");
    regenWave = 1;
  }

  /* ---------- Zeichnen ---------- */
  function drawGranule(g) {
    var sx = g.x * cam.s + cam.x, sy = g.y * cam.s + cam.y, sr = g.r * cam.s;
    if (sx < -sr || sx > W + sr) return;

    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, 7);
    var grad = ctx.createRadialGradient(sx - sr * 0.35, sy - sr * 0.4, sr * 0.15, sx, sy, sr);
    grad.addColorStop(0, "#A79E90");
    grad.addColorStop(0.65, "#948B7E");
    grad.addColorStop(1, "#7C7468");
    ctx.fillStyle = grad;
    ctx.fill();

    if (sr > 12) {
      for (var i = 0; i < g.pores.length; i++) {
        var p = g.pores[i];
        var px = sx + p.dx * cam.s, py = sy + p.dy * cam.s, pr = Math.max(1.6, p.pr * cam.s * 0.9);
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, 7);
        ctx.fillStyle = "#3B362F";
        ctx.fill();
        if (p.occ) {
          ctx.drawImage(sprite, px - pr * 2.4, py - pr * 2.4, pr * 4.8, pr * 4.8);
        }
      }
    }
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    /* Regenerations-Puls */
    if (regenWave > 0) {
      ctx.fillStyle = "rgba(216,255,62," + (regenWave * 0.12) + ")";
      ctx.fillRect(0, 0, W, H);
      var rw = (1 - regenWave) * Math.max(W, H) * 1.2;
      ctx.beginPath();
      ctx.arc(W / 2, H * 0.72, rw, 0, 7);
      ctx.strokeStyle = "rgba(216,255,62," + (regenWave * 0.5) + ")";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    /* Bett */
    ctx.beginPath();
    ctx.moveTo(0, surfaceY(0) * 0 + BED_TOP * cam.s + cam.y - 14 * cam.s);
    for (var x = 0; x <= LW; x += 24) {
      ctx.lineTo(x * cam.s + cam.x, surfaceY(x) * cam.s + cam.y);
    }
    ctx.lineTo(LW * cam.s + cam.x, LH * cam.s + cam.y + 4);
    ctx.lineTo(0, LH * cam.s + cam.y + 4);
    ctx.closePath();
    ctx.fillStyle = "#E7E1D6";
    ctx.fill();

    for (var i = 0; i < granules.length; i++) drawGranule(granules[i]);

    /* freie Moleküle */
    for (i = 0; i < molecules.length; i++) {
      var m = molecules[i];
      if (m.st !== 0) continue;
      var mx = m.x * cam.s + cam.x, my = m.y * cam.s + cam.y;
      if (my < -20 || my > H + 20) continue;
      var r = Math.max(2.4, 4.6 * cam.s);
      ctx.drawImage(sprite, mx - r * 2.6, my - r * 2.6, r * 5.2, r * 5.2);
    }
  }

  function drawStatic() {
    /* Reduzierte Bewegung: ein aussagekräftiges Standbild */
    setPhase("absorb");
    for (var i = 0; i < Math.floor(totalPores * 0.35); i++) {
      var g = granules[Math.floor(Math.random() * granules.length)];
      var free = g.pores.filter(function (p) { return !p.occ; });
      if (free.length) { free[0].occ = true; occCount++; }
    }
    spawn(LW * 0.3, 140, 10); spawn(LW * 0.7, 100, 8);
    for (i = 0; i < molecules.length; i++) {
      var m = molecules[i], t = findPore(m.x);
      if (t && Math.random() < 0.6) { m.st = 2; m.pore = t.p; m.gran = t.g; t.p.occ = true; }
    }
    var b = baseFit();
    cam.s = b.s; cam.x = b.x; cam.y = b.y;
    var fillEl = document.getElementById("sim-fill");
    var pctEl = document.getElementById("sim-pct");
    if (fillEl) fillEl.style.width = Math.round(occCount / totalPores * 100) + "%";
    if (pctEl) pctEl.textContent = Math.round(occCount / totalPores * 100) + "%";
    draw();
  }

  /* ---------- Loop ---------- */
  var running = false, raf = null, last = 0, started = false;

  function frame(t) {
    if (!running) return;
    var dt = Math.min(50, t - last || 16);
    last = t;
    update(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }
  function start() {
    if (running || REDUCED) return;
    running = true; last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
  }

  /* ---------- Events ---------- */
  function toWorld(cx, cy) {
    var rect = canvas.getBoundingClientRect();
    return { x: ((cx - rect.left) - cam.x) / cam.s, y: ((cy - rect.top) - cam.y) / cam.s };
  }
  canvas.addEventListener("pointerdown", function (e) {
    var w = toWorld(e.clientX, e.clientY);
    spawn(Math.min(LW, Math.max(0, w.x)), Math.min(BED_TOP - 30, Math.max(0, w.y)), 20);
  });

  var burstBtn = document.getElementById("sim-burst");
  if (burstBtn) burstBtn.addEventListener("click", function () {
    spawn(LW * (0.2 + Math.random() * 0.6), 40 + Math.random() * 120, 30);
  });

  var zoomBtn = document.getElementById("sim-zoom");
  if (zoomBtn) zoomBtn.addEventListener("click", function () {
    cam.zoomed = !cam.zoomed;
    setCamTarget();
    var spans = zoomBtn.querySelectorAll("span");
    for (var i = 0; i < spans.length; i++) spans[i].hidden = !spans[i].hidden;
  });

  window.addEventListener("resize", resize);

  if ("IntersectionObserver" in window && !REDUCED) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (!started) { started = true; setPhase("absorb"); spawn(LW * 0.5, 60, 26); }
          start();
        } else stop();
      });
    }, { threshold: 0.15 });
    io.observe(canvas);
  }

  /* ---------- Init ---------- */
  resize();
  if (REDUCED) {
    drawStatic();
  } else {
    setPhase("absorb");
  }
})();
