#!/usr/bin/env python3
"""no dank. — Storyboard-Renderer: waves (Hero-Loop) + pore (Erklaer-Zoom).
Rendert PNG-Frames via pycairo, Encodierung via ffmpeg (WebM+MP4)."""
import cairo, math, os, sys, io
from PIL import Image

W, H, FPS = 960, 540, 20
OUT = os.path.join(os.path.dirname(__file__), "..", "assets")
os.makedirs(OUT, exist_ok=True)
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

def C(h): return tuple(int(h[i:i+2], 16)/255 for i in (0, 2, 4))
KOHLE, RAUCH, STEIN = C("2B2723"), C("6B645A"), C("948B7E")
PAPIER, LIME, GOLD, ORANGE = C("EFEAE0"), C("D8FF3E"), C("FFC53E"), C("FF8A3E")
LIMESOFT, SAND, MINT = C("F4F8DC"), C("F2EAD6"), C("DDEFC9")
TRUB1, TRUB2 = C("8D8578"), C("B4AC9E")

def ease(u): u = max(0.0, min(1.0, u)); return 2*u*u if u < .5 else 1-(-2*u+2)**2/2
def easeio(u): u = max(0.0, min(1.0, u)); return u*u*(3-2*u)
def back(u): u = max(0.0, min(1.0, u)); c = 1.70158; return 1+(c+1)*(u-1)**3+c*(u-1)**2
def lerp(a, b, u): return a+(b-a)*u
def lc(c1, c2, u): return tuple(lerp(c1[i], c2[i], u) for i in range(3))
def seg(t, a, b): return max(0.0, min(1.0, (t-a)/(b-a)))

def rr(ctx, x, y, w, h, r):
    ctx.new_sub_path()
    ctx.arc(x+w-r, y+r, r, -math.pi/2, 0)
    ctx.arc(x+w-r, y+h-r, r, 0, math.pi/2)
    ctx.arc(x+r, y+h-r, r, math.pi/2, math.pi)
    ctx.arc(x+r, y+r, r, math.pi, 3*math.pi/2)
    ctx.close_path()

def glow_dot(ctx, x, y, r, col, a=1.0):
    for k, aa in ((2.6, .16), (1.9, .3), (1.0, 1.0)):
        ctx.set_source_rgba(col[0], col[1], col[2], a*aa)
        ctx.arc(x, y, r*k, 0, 7); ctx.fill()

def pouch(ctx, x, y, s=1.0, weave=False):
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    ctx.set_source_rgb(*RAUCH); ctx.set_line_width(3.4)
    ctx.move_to(-92, -120); ctx.curve_to(-128, -186, -106, -206, -86, -214)
    ctx.move_to(92, -120); ctx.curve_to(128, -186, 106, -206, 86, -214)
    ctx.stroke()
    ctx.set_source_rgb(*ORANGE)
    ctx.arc(-86, -214, 5, 0, 7); ctx.fill(); ctx.arc(86, -214, 5, 0, 7); ctx.fill()
    ctx.new_path(); ctx.move_to(-96, -118); ctx.line_to(96, -118)
    ctx.line_to(82, 96); ctx.curve_to(40, 108, -40, 108, -82, 96); ctx.close_path()
    ctx.set_source_rgb(*STEIN); ctx.fill()
    if weave:
        ctx.save(); ctx.clip()
        ctx.set_source_rgba(*SAND, .5); ctx.rectangle(-96, 20, 192, 90); ctx.fill()
        ctx.set_line_width(1.2)
        for i in range(-96, 100, 12):
            ctx.set_source_rgba(*RAUCH, .25)
            ctx.move_to(i, -118); ctx.line_to(i+10, 104); ctx.stroke()
            ctx.set_source_rgba(*PAPIER, .3)
            ctx.move_to(i+6, -118); ctx.lineTo(i+16, 104) if False else ctx.line_to(i+16, 104); ctx.stroke()
        ctx.restore()
    ctx.set_source_rgba(*KOHLE, .35)
    tones = [RAUCH, KOHLE, GOLD, LIME]
    for i in range(22):
        ctx.set_source_rgba(*tones[i % 4], .8)
        ctx.arc(-76+(i*37) % 152, 62-(i*23) % 46, 2.2+(i % 3), 0, 7); ctx.fill()
    ctx.new_path(); ctx.move_to(-102, -150); ctx.line_to(102, -150)
    ctx.line_to(96, -118); ctx.line_to(-96, -118); ctx.close_path()
    ctx.set_source_rgb(*RAUCH); ctx.fill()
    ctx.set_source_rgba(*PAPIER, .5); ctx.set_line_width(1.6)
    for g in range(5):
        gx = -70+g*35
        ctx.move_to(gx, -148); ctx.line_to(gx+3, -120); ctx.stroke()
    ctx.set_source_rgb(*RAUCH); rr(ctx, -22, -86, 44, 44, 10); ctx.fill()
    ctx.set_source_rgba(*PAPIER, .95); ctx.set_line_width(1.6)
    ctx.set_dash([4, 3.4]); rr(ctx, -17, -81, 34, 34, 7); ctx.stroke(); ctx.set_dash([])
    for (dx, dy, r, col) in ((-7, -76, 4.6, LIME), (6, -65, 4, GOLD), (-5, -61, 5, ORANGE)):
        ctx.set_source_rgb(*col); ctx.arc(dx, dy, r, 0, 7); ctx.fill()
    ctx.restore()

def text(ctx, s, x, y, size, col=KOHLE, center=True):
    ctx.select_font_face(FONT, cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(size); ctx.set_source_rgb(*col)
    if center:
        x -= ctx.text_extents(s)[4]/2   # x_advance
    ctx.move_to(x, y); ctx.show_text(s)

# ================= SZENE 1: WELLEN (15 s Loop) =================
def frame_waves(t, surface):
    DUR = 15.0
    ctx = cairo.Context(surface)
    q = ease(seg(t, 3.5, 9.0)) * (1 - ease(seg(t, 12.0, 15.0)))   # Sauberkeits-Faktor, Loop -> 0
    zm = 1 + 0.06*easeio(seg(t, 5.0, 8.0)) * (1-easeio(seg(t, 9.5, 12.5)))
    ctx.translate(W/2, H/2); ctx.scale(zm, zm); ctx.translate(-W/2, -H/2)
    bg = cairo.LinearGradient(0, 0, 0, H)
    bg.add_color_stop_rgb(0, *lc(TRUB2, LIMESOFT, q))
    bg.add_color_stop_rgb(1, *lc(TRUB1, PAPIER, q))
    ctx.set_source(bg); ctx.rectangle(0, 0, W, H); ctx.fill()

    # Wellenbaender
    for wi, (base, amp, trub, saub) in enumerate([
            (300, 26, KOHLE, LIME), (385, 32, RAUCH, GOLD), (470, 26, STEIN, STEIN)]):
        a = lerp(0.5, 0.4, q)
        ctx.set_source_rgba(*lc(trub, saub, q)[:3], a)
        ctx.set_line_width(lerp(46, 30, q)); ctx.set_line_cap(cairo.LINE_CAP_ROUND)
        k, sp = 0.012, 2.1*math.pi/DUR*4   # ganzzahlige Zyklen pro Loop
        ctx.new_path()
        for x in range(-60, W+80, 16):
            y = base + amp*math.sin(k*x - sp*t + wi*1.7) + amp*0.4*math.sin(2.3*k*x + sp*t*0.7 + wi)
            (ctx.move_to if x == -60 else ctx.line_to)(x, y)
        ctx.stroke()

    # Partikel reiten auf Welle 1 und werden herausgefischt
    pouch_x, pouch_y = 640, 512
    pouch(ctx, pouch_x, pouch_y, 1.0)
    k, sp = 0.012, 2.1*math.pi/DUR*4
    for i in range(26):
        x0 = i*53.0
        x = ((x0 + 90*t) % (W+240)) - 120
        wy = 300 + 26*math.sin(k*x - sp*t) + 10.4*math.sin(2.3*k*x + sp*t*0.7)
        hit_t = 4.2 + (i % 7)*0.55
        if 4.0 < t < 10.2 and abs(x - pouch_x) < 240:
            p = ease(seg(t, hit_t, hit_t+1.3))
            if p >= 1:
                glow_dot(ctx, pouch_x-30+(i*13) % 60, pouch_y-40-(i*17) % 50, 3.2, lc(KOHLE, LIME, q), 0.9)
                continue
            tx = pouch_x + ((i*29) % 70) - 35
            ty = pouch_y - 60 - ((i*31) % 60)
            px = lerp(x, tx, p); py = lerp(wy, ty, p) - 60*math.sin(p*math.pi)
            glow_dot(ctx, px, py, lerp(6.5, 3.2, p), lc(KOHLE, LIME, p*max(q, 0.35)), 1-p*0.15)
        else:
            if t >= 10.2 and q > 0.85:
                continue  # sauber: nichts mehr reiten
            glow_dot(ctx, x, wy, 6.5, lc(KOHLE, STEIN, q*0.5), 0.95)

    # Vignette trüb
    v = cairo.RadialGradient(W/2, H/2, H*0.42, W/2, H/2, H*0.95)
    v.add_color_stop_rgba(0, 0, 0, 0, 0); v.add_color_stop_rgba(1, 0.1, 0.09, 0.08, 0.42*(1-q))
    ctx.set_source(v); ctx.rectangle(0, 0, W, H); ctx.fill()

# ================= SZENE 2: ZOOM IN DIE PORE (20 s) =================
def pore_world(ctx, t):
    """Molekularebene: leuchtendes Hoehlensystem."""
    ctx.set_source_rgb(0x24/255, 0x20/255, 0x1C/255)
    rr(ctx, -260, -170, 520, 340, 46); ctx.fill()
    # Tunnels + Tueren
    doors = [(-150, 40), (-40, 96), (80, 60), (170, -30), (-90, -80), (60, -96)]
    for i, (dx, dy) in enumerate(doors):
        closed = t > 9.4 + i*0.62
        # Gang
        ctx.set_source_rgba(*LIME, 0.10 if not closed else 0.05)
        rr(ctx, dx-46, dy-40, 92, 80, 26); ctx.fill()
        for g, aa in ((10, .12), (5, .3)):
            ctx.set_source_rgba(*LIME, aa if not closed else aa*0.4)
            ctx.set_line_width(g); rr(ctx, dx-30, dy-26, 60, 52, 18); ctx.stroke()
        if closed:
            ctx.set_source_rgba(*KOHLE, .92)
            rr(ctx, dx-30, dy-26, 60, 52, 18); ctx.fill()
            glow_dot(ctx, dx, dy, 4, LIME, .9)
    # wandernde Molekuele -> Tueren
    for i in range(10):
        d = doors[i % 6]
        arr = 8.6 + (i % 6)*0.62
        if t < arr:
            wx = math.sin(t*0.9+i*2.1)*180 + math.sin(t*0.53+i)*60
            wy = math.cos(t*0.8+i*1.3)*110 + math.sin(t*0.61+i*2)*40
            glow_dot(ctx, wx, wy, 6, [LIME, GOLD, ORANGE][i % 3], .95)
        else:
            p = ease(seg(t, arr, arr+1.6))
            if p < 1:
                wx = lerp(math.sin(arr*0.9+i*2.1)*180, d[0], p)
                wy = lerp(math.cos(arr*0.8+i*1.3)*110, d[1], p)
                glow_dot(ctx, wx, wy, lerp(6, 3.4, p), [LIME, GOLD, ORANGE][i % 3], 1)
            else:
                glow_dot(ctx, d[0]+((i*13) % 24)-12, d[1]+((i*11) % 18)-9, 3.2, LIME, .85)

def frame_pore(t, surface):
    ctx = cairo.Context(surface)
    ctx.set_source_rgb(*PAPIER); ctx.rectangle(0, 0, W, H); ctx.fill()

    # Exponentieller Zoom: langsam am Anfang, rasant in die Tiefe
    if t <= 16.6:
        z = math.exp(lerp(0.0, math.log(60.0), ease(seg(t, 3.0, 9.4))))
    else:
        z = math.exp(lerp(math.log(60.0), 0.0, ease(seg(t, 16.6, 19.6))))
    cx, cy = 820, 520
    if z > 4: cx, cy = 820, 508
    if z > 25: cx, cy = 852, 474
    def cam():
        ctx.translate(W/2, H/2); ctx.scale(z, z); ctx.translate(-cx, -cy)

    fresh = ease(seg(t, 17.6, 19.4))
    lz = math.log(max(z, 1.0), 2)
    # Ebene 1: Raum
    a_room = 1 - ease(seg(lz, 1.6, 3.0))
    if a_room > 0.01:
        ctx.save(); cam(); ctx.set_source_rgba(*RAUCH, a_room)
        ctx.set_line_width(3/z)
        ctx.move_to(60, 640); ctx.line_to(1220, 640); ctx.stroke()
        rr(ctx, 700, 300, 260, 340, 18); ctx.stroke()          # Schrank
        rr(ctx, 140, 420, 200, 220, 12); ctx.stroke()          # Kiste
        stink = a_room*(1-fresh)
        for sx, sy in ((770, 250), (960, 230), (240, 360)):
            ctx.set_source_rgba(*KOHLE, .5*stink); ctx.set_line_width(2.4/z)
            for w in range(3):
                ctx.new_path()
                for yy in range(0, 60, 6):
                    ctx.line_to(sx + 10*math.sin(yy*0.22 + t*3 + w*2) + w*16 - 16, sy - yy)
                ctx.stroke()
        ctx.restore()
    # Ebene 2: Saeckchen (mit Webung) — ab Raum-Ebene sichtbar
    a_p = ease(seg(lz, 0.15, 1.0)) * (1 - ease(seg(lz, 4.4, 5.4)))
    if a_p > 0.01:
        ctx.save(); cam(); ctx.set_source_rgba(1, 1, 1, a_p)
        pouch(ctx, 820, 520, 1.35, weave=z > 8); ctx.restore()
    # Ebene 3: Poren-Hoehle (Bildebene, waechst leicht beim «Abstieg»)
    a_c = ease(seg(lz, 4.6, 5.6))
    if a_c > 0.01:
        k = 0.55 + 0.45*ease(seg(lz, 4.6, 5.8))
        ctx.save()
        ctx.translate(W/2, H/2); ctx.scale(k, k)
        ctx.push_group()
        pore_world(ctx, t)
        ctx.pop_group_to_source()
        ctx.paint_with_alpha(a_c)
        ctx.restore()

    # Texteinblendung
    ta = back(seg(t, 14.6, 15.6)) * (1 - ease(seg(t, 18.2, 19.0)))
    if ta > 0.02:
        ctx.set_source_rgba(*LIMESOFT, min(1, ta)*0.96)
        rr(ctx, W/2-420, 74, 840, 92, 24); ctx.fill()
        ctx.set_source_rgba(*LIME, min(1, ta))
        rr(ctx, W/2-420, 74, 12, 92, 6); ctx.fill()
        text(ctx, "1 g Kohle = 1'500 m² Fläche", W/2+6, 130, 40, KOHLE)
    # Frische-Sparkles am Ende
    for i in range(8):
        sx = 200+(i*149) % 900; sy = 180+(i*97) % 320
        p = back(seg(t, 18.0+i*0.12, 18.7+i*0.12))
        if p > 0.02:
            glow_dot(ctx, sx, sy, 7*p, LIME if i % 2 else GOLD, p)

# ================= Renderer =================
def render(name, dur, fn):
    n = int(dur*FPS)
    frames = []
    for i in range(n):
        sf = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H)
        fn(i/FPS, sf)
        buf = io.BytesIO()
        sf.write_to_png(buf); buf.seek(0)
        frames.append(Image.open(buf).convert("RGB"))
        sf.finish()
        if i % 60 == 0: print(f"{name}: frame {i}/{n}", flush=True)
    frames[0].save(f"{OUT}/anim-{name}.webp", save_all=True, append_images=frames[1:],
                   duration=int(1000/FPS), loop=0, quality=78, method=4)
    frames[int(n*0.4)].save(f"{OUT}/anim-{name}-poster.jpg", quality=85)
    print(f"{name}: done -> assets/anim-{name}.webp ({os.path.getsize(OUT+'/anim-'+name+'.webp')//1024} KB)", flush=True)

if __name__ == "__main__":
    which = sys.argv[1] if len(sys.argv) > 1 else "all"
    if which in ("all", "waves"): render("waves", 15.0, frame_waves)
    if which in ("all", "pore"): render("pore", 20.0, frame_pore)
