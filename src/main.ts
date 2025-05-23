import p5 from 'p5';
import './style.css';

const app = document.getElementById('app')!;

/**
 * Referencias:
 * @see Obter posição do mouse {@link https://p5js.org/reference/p5/mouseX/}
 * @see Modificar frame rate {@link https://p5js.org/reference/p5/frameRate/}
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
    }

    private setup(): void {
        this.canvas = this.p5.createCanvas(this.width, this.height);

        this.canvas.parent(app);

        this.p5.background(220);

        const tilesPerRowCount = this.width / this.tileSize;
        const tilesPerColumnCount = this.height / this.tileSize;

        for (let i = 0; i < tilesPerRowCount; i++) {
            for (let j = 0; j < tilesPerColumnCount; j++) {
                this.drawSquare(i, j);
            }
        }

        this.p5.frameRate(10);
    }

    private clickedPositions: { x: number; y: number }[] = [];

    private draw(): void {
        const { mouseX, mouseY, mouseIsPressed } = this.p5;

        if (mouseIsPressed) {
            const { startX, startY } = this.pluck(mouseX, mouseY);

            this.p5.fill('red');
            this.drawSquare(startX, startY);

            this.clickedPositions.push({ x: startX, y: startY });
        }

        if (this.clickedPositions.length) {
            for (const clickedPosition of this.clickedPositions) {
                clickedPosition.y++;
                this.drawSquare(clickedPosition.x, clickedPosition.y);
            }
        }
    }

    private pluck(x: number, y: number): { startX: number; startY: number } {
        const startX = Math.floor(x / this.tileSize);
        const startY = Math.floor(y / this.tileSize);

        return { startX, startY };
    }

    private drawSquare(x: number, y: number): void {
        this.p5.square(x * this.tileSize, y * this.tileSize, this.tileSize);
    }
}

new p5((p: p5) => new Sketch(p));
