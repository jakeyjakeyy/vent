import { isColliding } from "@/utils/collision";
class Droplet {
  MIN_SPEED = 0.5;
  SPEED = 2;
  content: string;
  id: number;
  mass: number = 1;
  dimensions: { width: number; height: number } = { width: 0, height: 0 };
  position: { x: number; y: number } = { x: -1, y: -1 };
  velocity: { x: number; y: number } = { x: 0, y: 0 };
  containerDimensions: { width: number; height: number } = {
    width: 0,
    height: 0,
  };

  constructor(content: string, id: number, container: HTMLElement) {
    this.content = content;
    this.id = id;
    this.velocity.x = (Math.random() - 0.5) * this.SPEED;
    this.velocity.y = (Math.random() - 0.5) * this.SPEED;
    this.velocity.x =
      Math.abs(this.velocity.x) < this.MIN_SPEED
        ? this.MIN_SPEED
        : this.velocity.x;
    this.velocity.y =
      Math.abs(this.velocity.y) < this.MIN_SPEED
        ? this.MIN_SPEED
        : this.velocity.y;
    this.mass = this.content.length;
    this.containerDimensions.width = container.offsetWidth;
    this.containerDimensions.height = container.offsetHeight;
  }

  wallsCollision() {
    if (
      this.position.x + this.dimensions.width >=
        this.containerDimensions.width ||
      this.position.x <= 0
    ) {
      this.velocity.x = -this.velocity.x;
    }
    if (
      this.position.y + this.dimensions.height >=
        this.containerDimensions.height ||
      this.position.y <= 0
    ) {
      this.velocity.y = -this.velocity.y;
    }
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  collide(other: Droplet) {
    let mSum = this.mass + other.mass;
    let x1 = this.position.x + this.dimensions.width / 2;
    let y1 = this.position.y + this.dimensions.height / 2;
    let x2 = other.position.x + other.dimensions.width / 2;
    let y2 = other.position.y + other.dimensions.height / 2;
    let dSquared = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    let d = Math.sqrt(dSquared);

    let normal = {
      x: (x2 - x1) / d,
      y: (y2 - y1) / d,
    };

    let relativeVelocity = {
      x: other.velocity.x - this.velocity.x,
      y: other.velocity.y - this.velocity.y,
    };

    let velocityAlongNormal =
      relativeVelocity.x * normal.x + relativeVelocity.y * normal.y;

    // Do not resolve if velocities are separating
    if (velocityAlongNormal > 0) {
      return [this, other];
    }

    let restitution = 1;

    let impulseScalar =
      (-(1 + restitution) * velocityAlongNormal) /
      (1 / this.mass + 1 / other.mass);

    let impulse = {
      x: impulseScalar * normal.x,
      y: impulseScalar * normal.y,
    };

    this.velocity.x -= impulse.x / this.mass;
    this.velocity.y -= impulse.y / this.mass;
    other.velocity.x += impulse.x / other.mass;
    other.velocity.y += impulse.y / other.mass;

    return [this, other];
  }

  update() {
    this.wallsCollision();
    this.move();
  }
}

export default Droplet;
