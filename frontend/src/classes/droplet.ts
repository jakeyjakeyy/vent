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
    let impact = {
      x: this.velocity.x - other.velocity.x,
      y: this.velocity.y - other.velocity.y,
    };
    let vDiff = {
      x: other.velocity.x - this.velocity.x,
      y: other.velocity.y - this.velocity.y,
    };
    let d = Math.sqrt(
      (this.position.x - other.position.x) ** 2 +
        (this.position.y - other.position.y) ** 2
    );

    let numA = 2 * other.mass * (vDiff.x * impact.x + vDiff.y * impact.y);
    let denA = mSum * d * d;

    let deltaV = {
      x: impact.x * (numA / denA),
      y: impact.y * (numA / denA),
    };

    this.velocity.x += deltaV.x;
    this.velocity.y += deltaV.y;

    return [this, other];
  }

  update() {
    this.wallsCollision();
    this.move();
  }
}

export default Droplet;
