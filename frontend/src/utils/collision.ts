import type { droplet } from "@/types";

const RESTITUTION = 0.8; // Bounciness factor
const MIN_VELOCITY = 0.1; // Minimum velocity threshold

function twoDimensionalCollision(r1: droplet, r2: droplet) {
  // Get the overlap on both axes
  const overlapX =
    Math.min(r1.x + r1.dropletWidth, r2.x + r2.dropletWidth) -
    Math.max(r1.x, r2.x);
  const overlapY =
    Math.min(r1.y + r1.dropletHeight, r2.y + r2.dropletHeight) -
    Math.max(r1.y, r2.y);

  // Determine collision normal
  let normalX = 0;
  let normalY = 0;

  if (overlapX < overlapY) {
    normalX = r1.x < r2.x ? -1 : 1;
  } else {
    normalY = r1.y < r2.y ? -1 : 1;
  }

  // Separate the rectangles
  const separation = normalX !== 0 ? overlapX : overlapY;
  const mass_ratio = r1.mass / (r1.mass + r2.mass);

  r1.x -= normalX * separation * (1 - mass_ratio);
  r1.y -= normalY * separation * (1 - mass_ratio);
  r2.x += normalX * separation * mass_ratio;
  r2.y += normalY * separation * mass_ratio;

  // Calculate relative velocity
  const relativeVX = r1.vx - r2.vx;
  const relativeVY = r1.vy - r2.vy;

  // Project relative velocity onto collision normal
  const velocityAlongNormal = relativeVX * normalX + relativeVY * normalY;

  // Skip collision if objects are moving apart
  if (velocityAlongNormal > -MIN_VELOCITY) {
    return [r1, r2];
  }

  // Calculate impulse
  const j = -(1 + RESTITUTION) * velocityAlongNormal;
  const impulse = j / (1 / r1.mass + 1 / r2.mass);

  // Apply impulse
  r1.vx += (impulse * normalX) / r1.mass;
  r1.vy += (impulse * normalY) / r1.mass;
  r2.vx -= (impulse * normalX) / r2.mass;
  r2.vy -= (impulse * normalY) / r2.mass;

  // Apply minimum velocity threshold
  if (Math.abs(r1.vx) < MIN_VELOCITY) r1.vx = 0;
  if (Math.abs(r1.vy) < MIN_VELOCITY) r1.vy = 0;
  if (Math.abs(r2.vx) < MIN_VELOCITY) r2.vx = 0;
  if (Math.abs(r2.vy) < MIN_VELOCITY) r2.vy = 0;

  return [r1, r2];
}

function calculateAngle(vx: number, vy: number) {
  return Math.atan2(vy, vx);
}

export { twoDimensionalCollision };
