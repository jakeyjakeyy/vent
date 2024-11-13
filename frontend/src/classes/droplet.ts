class Droplet {
  content: string;
  id: number;
  mass: number = 1;
  dimensions: { width: number; height: number } = { width: 0, height: 0 };
  position: { x: number; y: number } = { x: 0, y: 0 };
  velocity: { x: number; y: number } = { x: 0, y: 0 };

  constructor(content: string, id: number) {
    this.content = content;
    this.id = id;
  }
}

export default Droplet;
