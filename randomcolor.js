const goldenRatioConjugate = 0.618033988749895;
let h = Math.random();
function hue2rgb(p, q, t_) {
  let t = t_;
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslToRgb(h, s, l) {
  let r;
  let g;
  let b;
  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return `#${Math.round(r * 255).toString(16)}${Math.round(g * 255).toString(16)}${Math.round(
    b * 255,
  ).toString(16)}`;
}

export default function () {
  h += goldenRatioConjugate;
  h %= 1;
  return hslToRgb(h, 0.5, 0.6);
}
