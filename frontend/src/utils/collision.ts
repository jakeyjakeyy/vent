import Droplet from "@/classes/droplet";

const RESTITUTION = 0.8; // Bounciness factor
const MIN_VELOCITY = 0.1; // Minimum velocity threshold

function twoDimensionalCollision(r1: Droplet, r2: Droplet) {
  // Get the overlap on both axes
  const overlapX =
    Math.min(
      r1.position.x + r1.dimensions.width,
      r2.position.x + r2.dimensions.width
    ) - Math.max(r1.position.x, r2.position.x);
  const overlapY =
    Math.min(
      r1.position.y + r1.dimensions.height,
      r2.position.y + r2.dimensions.height
    ) - Math.max(r1.position.y, r2.position.y);

  // Determine collision normal
  let normalX = 0;
  let normalY = 0;

  if (overlapX < overlapY) {
    normalX = r1.position.x < r2.position.x ? -1 : 1;
  } else {
    normalY = r1.position.y < r2.position.y ? -1 : 1;
  }

  // Separate the rectangles
  const separation = normalX !== 0 ? overlapX : overlapY;
  const mass_ratio = r1.mass / (r1.mass + r2.mass);

  r1.position.x -= normalX * separation * (1 - mass_ratio);
  r1.position.y -= normalY * separation * (1 - mass_ratio);
  r2.position.x += normalX * separation * mass_ratio;
  r2.position.y += normalY * separation * mass_ratio;

  // Calculate relative velocity
  const relativeVX = r1.velocity.x - r2.velocity.x;
  const relativeVY = r1.velocity.y - r2.velocity.y;

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
  r1.velocity.x += (impulse * normalX) / r1.mass;
  r1.velocity.y += (impulse * normalY) / r1.mass;
  r2.velocity.x -= (impulse * normalX) / r2.mass;
  r2.velocity.y -= (impulse * normalY) / r2.mass;

  // Apply minimum velocity threshold
  if (Math.abs(r1.velocity.x) < MIN_VELOCITY) r1.velocity.x = 0;
  if (Math.abs(r1.velocity.y) < MIN_VELOCITY) r1.velocity.y = 0;
  if (Math.abs(r2.velocity.x) < MIN_VELOCITY) r2.velocity.x = 0;
  if (Math.abs(r2.velocity.y) < MIN_VELOCITY) r2.velocity.y = 0;

  return [r1, r2];
}

function calculateAngle(vx: number, vy: number) {
  return Math.atan2(vy, vx);
}

function isColliding(r1: Droplet, r2: Droplet) {
  if (r1.position.x === -1 || r2.position.x === -1) return false;
  return (
    r1.position.x < r2.position.x + r2.dimensions.width &&
    r1.position.x + r1.dimensions.width > r2.position.x &&
    r1.position.y < r2.position.y + r2.dimensions.height &&
    r1.position.y + r1.dimensions.height > r2.position.y
  );
}
export { twoDimensionalCollision, isColliding };
