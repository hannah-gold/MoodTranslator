// Mood Translator — Particle Flow Field Casual Creator
// This system allows users to express emotional states through motion, color,
// and interaction rather than words.

// INTERACTION DESIGN:
// - Mouse MOVE = persistent ripples 
// - Mouse CLICK = persistent straight lines
// - Sliders = adjust emotional qualities of the system
// - S = save artwork as PNG
// - R = reset system

// DESIGN GOALS:
// - Calming, fluid motion
// - Immediate feedback


// Flowing particles that make up the background motion
let particles = [];

// Persistent ripple sources created by mouse movement
let ripples = [];

// Persistent straight-line marks created by mouse clicks
let lines = [];

// UI elements
let energySlider, tensionSlider, warmthSlider;
let energyValueEl, tensionValueEl, warmthValueEl;

// Canvas configuration
const CANVAS_W = 900;
const CANVAS_H = 560;

// System limits
const BASE_PARTICLES = 650;
const MAX_RIPPLES = 600;
const MAX_LINES = 200;


function setup() {
  // Create canvas and attach it to the page
  const c = createCanvas(CANVAS_W, CANVAS_H);
  c.parent("sketch-holder");
  pixelDensity(1); // keep visuals stable across displays

  buildUI();
  resetSystem(true);
}


function draw() {
  // Semi-transparent background creates motion trails
  // (used only for particles, not user marks)
  background(10, 14, 20, 18);

  // Read emotional parameters from sliders (0..1)
  const energy = energySlider.value();
  const tension = tensionSlider.value();
  const warmth = warmthSlider.value();

  updateUIReadouts(energy, tension, warmth);

  // Map emotional parameters to motion characteristics
  const speed = lerp(0.5, 3.0, easeInOut(energy));
  const noiseScale = lerp(0.002, 0.011, easeInOut(tension));
  const timeScale = lerp(0.0001, 0.0006, easeInOut(energy));
  const swirl = lerp(0.0, 0.35, easeInOut(tension));

  strokeWeight(lerp(1.1, 1.9, easeInOut(tension)));
  noFill();

  // Particle Update
  for (const p of particles) {
    const px = p.pos.x;
    const py = p.pos.y;

    // Flow direction from Perlin noise field
    let angle =
      noise(px * noiseScale, py * noiseScale, millis() * timeScale) * TAU * 2;

    // Tension introduces subtle directional instability
    angle += (noise(p.seed, millis() * 0.0005) - 0.5) * swirl;

    let vx = cos(angle) * speed;
    let vy = sin(angle) * speed;

    // Apply influence of all persistent ripples
    for (const r of ripples) {
      const dx = px - r.x;
      const dy = py - r.y;
      const d2 = dx * dx + dy * dy + 1;

      if (d2 < r.radius * r.radius) {
        const d = sqrt(d2);
        const t = 1 - d / r.radius;
        const strength = r.strength * pow(t, 3);

        // Tangential force creates circular ripple motion
        const sx = -dy / (d + 1e-6);
        const sy = dx / (d + 1e-6);

        vx += sx * strength;
        vy += sy * strength;
      }
    }

    // Move particle and wrap around edges
    p.pos.x += vx;
    p.pos.y += vy;
    wrap(p.pos);

    // Color reflects emotional warmth
    const col = moodColor(warmth, p.tint);
    col.setAlpha(lerp(20, 55, easeInOut(energy)));
    stroke(col);

    // Draw particle trail
    line(px, py, p.pos.x, p.pos.y);
  }

  // User Drawings

  // Draw persistent ripples from mouse movement
  strokeWeight(1);
  noFill();
  for (const r of ripples) {
    stroke(255, 255, 255, 35);
    circle(r.x, r.y, r.radius * 0.9);
  }

  // Draw persistent straight lines from mouse clicks
  strokeWeight(2.2);
  for (const l of lines) {
    stroke(l.col);
    line(l.x1, l.y1, l.x2, l.y2);
  }

  // Subtle frame gives exported images a finished feel
  noFill();
  stroke(230, 220, 255, 18);
  strokeWeight(10);
  rect(8, 8, width - 16, height - 16, 18);
}


// User Interaction

// Mouse movement creates persistent ripples
// Represents ongoing, ambient emotional state
function mouseMoved() {
  if (!mouseInCanvas()) return;

  ripples.push({
    x: mouseX,
    y: mouseY,
    radius: 80,
    strength: 0.6
  });

  if (ripples.length > MAX_RIPPLES) ripples.shift();
}

// Mouse clicks create persistent straight-line marks
// Represents intentional, deliberate expression
function mousePressed() {
  if (!mouseInCanvas()) return;

  const len = random(90, 220);
  const angle = random(TAU);

  lines.push({
    x1: mouseX - cos(angle) * len * 0.5,
    y1: mouseY - sin(angle) * len * 0.5,
    x2: mouseX + cos(angle) * len * 0.5,
    y2: mouseY + sin(angle) * len * 0.5,
    col: moodColor(warmthSlider.value(), random(-0.05, 0.05))
  });

  if (lines.length > MAX_LINES) lines.shift();
}

// Keyboard shortcuts
function keyPressed() {
  if (key === "r" || key === "R") resetSystem(true);
  if (key === "s" || key === "S") saveCanvas("mood_expression", "png");
}


// UI

function buildUI() {
  const controls = select("#controls");

  const add = (label, v, id) => {
    const w = createDiv().addClass("control").parent(controls);
    createElement("label", label).parent(w);
    const s = createSlider(0, 1, v, 0.001).parent(w);
    const val = createDiv("").addClass("value").id(id).parent(w);
    return { s, val };
  };

  ({ s: energySlider, val: energyValueEl } = add("Energy", 0.28, "e"));
  ({ s: tensionSlider, val: tensionValueEl } = add("Calm ↔ Tense", 0.2, "t"));
  ({ s: warmthSlider, val: warmthValueEl } = add("Warm ↔ Cool", 0.45, "w"));
}

function updateUIReadouts(e, t, w) {
  energyValueEl.html(`Energy: ${(e * 100).toFixed(0)}%`);
  tensionValueEl.html(`Tension: ${(t * 100).toFixed(0)}%`);
  warmthValueEl.html(`Warmth: ${(w * 100).toFixed(0)}%`);
}


// Helpers

// Reset everything except UI
function resetSystem(reseed) {
  particles = [];
  ripples = [];
  lines = [];
  background(10, 14, 20);

  for (let i = 0; i < BASE_PARTICLES; i++) {
    particles.push({
      pos: createVector(random(width), random(height)),
      seed: random(1000),
      tint: random(-0.12, 0.12)
    });
  }

  if (reseed) noiseSeed(floor(random(1e9)));
}

// Map emotional warmth to color
function moodColor(w, tint) {
  const t = constrain(w + tint, 0, 1);
  return lerpColor(
    lerpColor(color(40, 140, 255), color(120, 80, 255), 0.55),
    lerpColor(color(255, 140, 90), color(255, 210, 120), 0.4),
    easeInOut(t)
  );
}

// Wrap particles around screen edges
function wrap(v) {
  if (v.x < 0) v.x += width;
  if (v.x >= width) v.x -= width;
  if (v.y < 0) v.y += height;
  if (v.y >= height) v.y -= height;
}

// Ensure mouse interaction stays inside canvas
function mouseInCanvas() {
  return mouseX >= 0 && mouseY >= 0 && mouseX < width && mouseY < height;
}

// Smooth interpolation for calm transitions
function easeInOut(x) {
  return x * x * (3 - 2 * x);
}
