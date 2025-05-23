import p5 from 'p5';
import './style.css';

const app = document.getElementById('app')!;

/**
 * Referencias:
 * @see Obter posição do mouse {@link https://p5js.org/reference/p5/mouseX/}
 */

class Sketch {
    p5: p5;

    canvas: p5.Renderer | null;

    width: number;
    height: number;

    constructor(p: p5) {
        this.p5 = p;

        this.canvas = null;

        this.width = 600;
        this.height = 400;

        p.setup = this.setup.bind(this);
        p.draw = this.draw.bind(this);
        p.mousePressed = this.mousePressed.bind(this);
    }

    setup() {
        this.canvas = this.p5.createCanvas(this.width, this.height);

        this.canvas.parent(app);

        this.p5.background(220);

        const tileSize = 25;

        const tilesPerRow = this.width / tileSize;
        const tilesPerColumn = this.height / tileSize;

        for (let i = 0; i < tilesPerRow; i++) {
            for (let j = 0; j < tilesPerColumn; j++) {
                this.p5.square(i * tileSize, j * tileSize, tileSize);
            }
        }
    }

    draw() {}

    mousePressed() {
        const { mouseX, mouseY } = this.p5;

        const { startX, startY } = this.pluck(mouseX, mouseY);

        this.p5.fill('red');
        this.p5.square(startX * 25, startY * 25, 25);
    }

    pluck(x: number, y: number) {
        const startX = Math.floor(x / 25);
        const startY = Math.floor(y / 25);

        return { startX, startY };
    }
}

new p5((p: p5) => new Sketch(p));
