import p5 from 'p5';
import './style.css';

const app = document.getElementById('app')!;

/**
 * Referencias:
 * @see Obter posição do mouse {@link https://p5js.org/reference/p5/mouseX/}
 */

class Sketch {
    private readonly p5: p5;

    private canvas: p5.Renderer | null;

    private readonly width: number;
    private readonly height: number;

    private readonly tileSize: number;

    public constructor(p: p5) {
        this.p5 = p;

        this.canvas = null;

        this.width = 600;
        this.height = 400;

        this.tileSize = 25;

        p.setup = this.setup.bind(this);
        p.draw = this.draw.bind(this);
        p.mousePressed = this.mousePressed.bind(this);
    }

    private setup(): void {
        this.canvas = this.p5.createCanvas(this.width, this.height);

        this.canvas.parent(app);

        this.p5.background(220);

        const tilesPerRowCount = this.width / this.tileSize;
        const tilesPerColumnCount = this.height / this.tileSize;

        for (let i = 0; i < tilesPerRowCount; i++) {
            for (let j = 0; j < tilesPerColumnCount; j++) {
                this.p5.square(
                    i * this.tileSize,
                    j * this.tileSize,
                    this.tileSize
                );
            }
        }
    }

    private draw(): void {}

    private mousePressed(): void {
        const { mouseX, mouseY } = this.p5;

        const { startX, startY } = this.pluck(mouseX, mouseY);

        this.p5.fill('red');
        this.p5.square(
            startX * this.tileSize,
            startY * this.tileSize,
            this.tileSize
        );
    }

    private pluck(x: number, y: number): { startX: number; startY: number } {
        const startX = Math.floor(x / this.tileSize);
        const startY = Math.floor(y / this.tileSize);

        return { startX, startY };
    }
}

new p5((p: p5) => new Sketch(p));
