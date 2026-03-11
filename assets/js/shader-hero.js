/**
 * elevenOne AI Services – WebGL Shader Hero Background
 * "Precision Noir" Farbpalette: Gold #C8A84B + Cyan #00E5CC auf Void-Schwarz
 * Shader-Basis: Matthias Hurrle (@atzedent), adaptiert für das Brand-Design.
 */

const VERT = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

const FRAG = `#version 300 es
/*
 * Adapted for elevenOne AI Services – Precision Noir Theme
 * Based on fractal-noise nebula by Matthias Hurrle (@atzedent)
 */
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 touch;
uniform vec2 move;
#define FC  gl_FragCoord.xy
#define T   time
#define R   resolution
#define MN  min(R.x, R.y)

float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  return mix(
    mix(rnd(i),           rnd(i + vec2(1,0)), u.x),
    mix(rnd(i + vec2(0,1)), rnd(i + 1.),       u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float t = 0., a = 1.;
  mat2 m = mat2(1., -.5, .2, 1.2);
  for (int i = 0; i < 5; i++) { t += a * noise(p); p *= 2. * m; a *= .5; }
  return t;
}

float clouds(vec2 p) {
  float d = 1., t = 0.;
  for (float i = 0.; i < 3.; i++) {
    float a = d * fbm(i * 10. + p.x * .2 + .2 * (1. + i) * p.y + d + i * i + p);
    t = mix(t, d, a);
    d = a;
    p *= 2. / (i + 1.);
  }
  return t;
}

void main() {
  vec2 uv = (FC - .5 * R) / MN;
  vec2 st = uv * vec2(2., 1.);
  vec3 col = vec3(0.);

  float bg = clouds(vec2(st.x + T * .28, -st.y));
  uv *= 1. - .3 * (sin(T * .18) * .5 + .5);

  for (float i = 1.; i < 12.; i++) {
    uv += .1 * cos(i * vec2(.1 + .01 * i, .8) + i * i + T * .35 + .1 * uv.x);
    vec2 p = uv;
    float d = length(p);

    // Precision Noir-Palette: Gold (#C8A84B) mit Cyan-Akzent (#00E5CC) auf späten Iterationen
    vec3 gold = vec3(0.78, 0.62, 0.25);
    vec3 cyan = vec3(0.00, 0.85, 0.78);
    vec3 tint = mix(gold, cyan, step(9., i) * 0.40);

    col += .00125 / d * (cos(sin(i) * vec3(1.5, 1.2, 0.4)) + 1.) * tint;

    float b = noise(i + p + bg * 1.731);
    col += .002 * b / length(max(p, vec2(b * p.x * .02, p.y))) * vec3(0.76, 0.60, 0.22);

    // Tiefes Void-Schwarz als Hintergrund (sehr dunkle Warm-Tönung)
    col = mix(col, vec3(bg * .042, bg * .036, bg * .010), d);
  }

  O = vec4(col, 1.);
}`;

/* ── WebGL-Renderer ────────────────────────────────────────── */
class ShaderHero {
  constructor(canvas) {
    this.canvas  = canvas;
    this.gl      = canvas.getContext('webgl2');
    if (!this.gl) { console.warn('WebGL2 not supported'); return; }

    this.program   = null;
    this.uniforms  = {};
    this.animFrame = null;
    this.mouse     = [0, 0];
    this.mouseMove = [0, 0];
    this.dpr       = Math.max(1, 0.5 * window.devicePixelRatio);
    this.vertices  = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);

    this._setup();
    this._resize();
    this._bindEvents();
    this._loop(0);
  }

  _setup() {
    const gl = this.gl;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vs, VERT);
    gl.compileShader(vs);
    gl.shaderSource(fs, FRAG);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('[ShaderHero] Fragment shader error:', gl.getShaderInfoLog(fs));
      return;
    }

    this.program = gl.createProgram();
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('[ShaderHero] Program link error:', gl.getProgramInfoLog(this.program));
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    this.uniforms = {
      resolution: gl.getUniformLocation(this.program, 'resolution'),
      time:       gl.getUniformLocation(this.program, 'time'),
      touch:      gl.getUniformLocation(this.program, 'touch'),
      move:       gl.getUniformLocation(this.program, 'move'),
    };
  }

  _resize() {
    const c = this.canvas;
    c.width  = c.offsetWidth  * this.dpr;
    c.height = c.offsetHeight * this.dpr;
    this.gl.viewport(0, 0, c.width, c.height);
  }

  _bindEvents() {
    this._onResize = () => this._resize();
    window.addEventListener('resize', this._onResize);

    // Maus-Interaktion
    this.canvas.addEventListener('mousemove', e => {
      const r = this.canvas.getBoundingClientRect();
      this.mouse     = [(e.clientX - r.left) * this.dpr, this.canvas.height - (e.clientY - r.top) * this.dpr];
      this.mouseMove = [e.movementX, e.movementY];
    });

    // Pause bei Hintergrund-Tab
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(this.animFrame);
        this.animFrame = null;
      } else {
        this._loop(0);
      }
    });
  }

  _loop(now) {
    if (!this.program || !this.gl) return;
    const gl = this.gl;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.program);
    gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.uniforms.time, now * 1e-3);
    gl.uniform2f(this.uniforms.touch, ...this.mouse);
    gl.uniform2f(this.uniforms.move,  ...this.mouseMove);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    this.mouseMove = [0, 0];
    this.animFrame = requestAnimationFrame(t => this._loop(t));
  }

  destroy() {
    cancelAnimationFrame(this.animFrame);
    window.removeEventListener('resize', this._onResize);
    if (this.program && this.gl) this.gl.deleteProgram(this.program);
  }
}

/* ── Auto-Initialisierung ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-shader]').forEach(canvas => {
    const hero = new ShaderHero(canvas);
    // Fade-in nach kurzem Delay
    setTimeout(() => canvas.classList.add('loaded'), 200);
    // Cleanup beim Verlassen
    window.addEventListener('beforeunload', () => hero.destroy(), { once: true });
  });
});
