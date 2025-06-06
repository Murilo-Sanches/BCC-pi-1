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
    private readonly tilesPerRowCount: number;
    private readonly tilesPerColumnCount: number;

    private grid: number[][];

    public constructor(p: p5) {
        this.p5 = p;

        this.canvas = null;

        this.width = 100;
        this.height = 50;

        this.tileSize = 10;
        this.tilesPerRowCount = this.width / this.tileSize;
        this.tilesPerColumnCount = this.height / this.tileSize;
        this.grid = [];

        p.setup = this.setup.bind(this);
        p.draw = this.draw.bind(this);
    }

    private setup(): void {
        this.canvas = this.p5.createCanvas(this.width, this.height);

        this.canvas.parent(app);

        this.p5.background(220);

        for (let i = 0; i < this.tilesPerRowCount; i++) {
            this.grid.push([]);

            for (let j = 0; j < this.tilesPerColumnCount; j++) {
                this.grid[i][j] = 0;

                if (i === 1 && j === 1) {
                    this.grid[i][j] = 1;
                }
            }
        }

        this.p5.frameRate(10);
    }

    private draw(): void {
        this.p5.background(220);

        const { mouseX, mouseY } = this.p5;

        for (let i = 0; i < this.grid.length; i++) {
            const row = this.grid[i];

            for (let j = 0; j < row.length; j++) {
                const cell = row[j];

                if (cell && this.grid[i][j] < this.tilesPerColumnCount - 1) {
                    this.grid[i][j] = this.grid[i][j] + 1;
                    console.log(this.grid);

                    this.p5.fill('lightgreen');
                    this.drawSquare(i, this.grid[i][j]);

                    continue;
                }

                if (cell) {
                    this.p5.fill('red');
                    this.drawSquare(i, this.grid[i][j]);
                }
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
