/**
 * elevenOne AI Services – Hex-Grid Canvas Animation
 * Atmosphärisches Hintergrundbild für die Landing Page
 */

class HexGrid {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.hexes = [];
    this.pulses = [];
    this.animFrame = null;
    this.lastTime = 0;
    this.hexSize = 28;
    this.isMobile = window.innerWidth < 768;

    this.colors = {
      gridLine:   'rgba(200, 168, 75, 0.06)',
      gridLineBright: 'rgba(200, 168, 75, 0.12)',
      pulse:      'rgba(0, 229, 204, 0.7)',
      pulseFade:  'rgba(0, 229, 204, 0)',
      dot:        'rgba(200, 168, 75, 0.3)',
      dotBright:  'rgba(200, 168, 75, 0.8)'
    };

    this.resize();
    this.buildGrid();
    this.startPulseScheduler();
    this.animate(0);

    // Größenänderungen
    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
      this.buildGrid();
    });
    this.resizeObserver.observe(canvas.parentElement || document.body);

    // Pause bei Hintergrund-Tab
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(this.animFrame);
        this.animFrame = null;
      } else {
        this.lastTime = 0;
        this.animate(0);
      }
    });
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.width  = parent ? parent.offsetWidth  : window.innerWidth;
    this.height = parent ? parent.offsetHeight : window.innerHeight;
    this.canvas.width  = this.width;
    this.canvas.height = this.height;
    this.isMobile = this.width < 768;
    this.hexSize = this.isMobile ? 22 : 28;
  }

  // Hex-Gitter aufbauen
  buildGrid() {
    this.hexes = [];

    const size = this.hexSize;
    const w = size * Math.sqrt(3);
    const h = size * 2;
    const cols = Math.ceil(this.width  / w) + 2;
    const rows = Math.ceil(this.height / (h * 0.75)) + 2;

    // Weniger Hexagone auf Mobile
    const densityFactor = this.isMobile ? 2 : 1;

    for (let row = -1; row < rows; row += densityFactor) {
      for (let col = -1; col < cols; col += densityFactor) {
        const x = col * w + (row % 2 === 0 ? 0 : w / 2);
        const y = row * (h * 0.75);
        this.hexes.push({ x, y, brightness: 0, targetBrightness: 0 });
      }
    }
  }

  // Hex-Vertices berechnen
  hexVertices(cx, cy) {
    const size = this.hexSize;
    const vertices = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      vertices.push({
        x: cx + size * Math.cos(angle),
        y: cy + size * Math.sin(angle)
      });
    }
    return vertices;
  }

  // Einzelnes Hexagon zeichnen
  drawHex(hex) {
    const ctx = this.ctx;
    const verts = this.hexVertices(hex.x, hex.y);

    ctx.beginPath();
    ctx.moveTo(verts[0].x, verts[0].y);
    for (let i = 1; i < 6; i++) {
      ctx.lineTo(verts[i].x, verts[i].y);
    }
    ctx.closePath();

    // Linienfarbe basierend auf Helligkeit
    const b = hex.brightness;
    if (b > 0.01) {
      ctx.strokeStyle = `rgba(200, 168, 75, ${0.06 + b * 0.3})`;
    } else {
      ctx.strokeStyle = this.colors.gridLine;
    }
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Ecken-Punkte
    if (!this.isMobile) {
      verts.forEach(v => {
        ctx.beginPath();
        ctx.arc(v.x, v.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = b > 0.1
          ? `rgba(200, 168, 75, ${0.2 + b * 0.6})`
          : this.colors.dot;
        ctx.fill();
      });
    }
  }

  // Pulse-Partikel
  startPulseScheduler() {
    const spawnPulse = () => {
      if (this.hexes.length > 0) {
        const startHex = this.hexes[Math.floor(Math.random() * this.hexes.length)];
        this.pulses.push({
          x: startHex.x,
          y: startHex.y,
          radius: 0,
          maxRadius: 60 + Math.random() * 80,
          alpha: 0.6,
          speed: 1.5 + Math.random() * 1.5,
          type: Math.random() > 0.5 ? 'cyan' : 'gold'
        });
      }
      setTimeout(spawnPulse, 800 + Math.random() * 1200);
    };
    setTimeout(spawnPulse, 500);
  }

  // Pulse-Welle auf Hexagone anwenden
  updateHexBrightness(pulse) {
    this.hexes.forEach(hex => {
      const dist = Math.hypot(hex.x - pulse.x, hex.y - pulse.y);
      const waveFront = pulse.radius;
      const waveWidth = 40;
      const diff = Math.abs(dist - waveFront);

      if (diff < waveWidth) {
        const intensity = (1 - diff / waveWidth) * pulse.alpha;
        hex.brightness = Math.max(hex.brightness, intensity * 0.6);
      }
    });
  }

  drawPulse(pulse) {
    const ctx = this.ctx;

    // Äußerer Kreis
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);

    const color = pulse.type === 'cyan' ? '0, 229, 204' : '200, 168, 75';
    ctx.strokeStyle = `rgba(${color}, ${pulse.alpha * 0.4})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Innerer Glow
    if (pulse.radius < 20) {
      const grad = ctx.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, 20);
      grad.addColorStop(0, `rgba(${color}, ${pulse.alpha * 0.3})`);
      grad.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  // Hauptanimationsschleife
  animate(timestamp) {
    if (!document.hidden) {
      this.animFrame = requestAnimationFrame(t => this.animate(t));
    }

    // Frame-Rate auf ~30fps begrenzen
    const delta = timestamp - this.lastTime;
    if (delta < 32) return; // ~30fps
    this.lastTime = timestamp;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Hexagone abdunkeln (langsam)
    this.hexes.forEach(hex => {
      hex.brightness *= 0.96;
    });

    // Pulse aktualisieren
    this.pulses = this.pulses.filter(p => p.alpha > 0.01);
    this.pulses.forEach(pulse => {
      pulse.radius += pulse.speed;
      pulse.alpha  *= 0.97;

      this.updateHexBrightness(pulse);
      this.drawPulse(pulse);
    });

    // Hexagone zeichnen
    this.hexes.forEach(hex => this.drawHex(hex));
  }

  destroy() {
    cancelAnimationFrame(this.animFrame);
    this.resizeObserver?.disconnect();
  }
}

// ── Initialisierung ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  // Canvas-Instanz erstellen
  const hexGrid = new HexGrid(canvas);

  // Fade-in nach kurzer Verzögerung
  setTimeout(() => {
    canvas.classList.add('loaded');
  }, 300);

  // Cleanup beim Verlassen
  window.addEventListener('beforeunload', () => hexGrid.destroy());
});
