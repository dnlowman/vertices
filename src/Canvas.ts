import Vertex from './Vertex';

export interface CanvasOptions {
    fullscreen: boolean;
}

export default class Canvas {
    private htmlCanvasElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private canvasOptions?: CanvasOptions;
    private vertices: Vertex[] = [];

    private rotation: number = 0;

    public constructor(htmlCanvasElement: HTMLCanvasElement, canvasOptions?: CanvasOptions) {
        this.htmlCanvasElement = htmlCanvasElement;
        this.canvasOptions = canvasOptions;
        const context = this.htmlCanvasElement.getContext('2d');
        if(context == null) {
            throw Error("Unable to initialise Canvas! Could not getContext.");
        }
        this.context = context;
        this.initialiseCanvas();
    }

    public addVertex(vertex: Vertex) {
        this.vertices.push(vertex);
    }

    private initialiseCanvas(): void {
        this.context.save();
        this.draw();
        this.initialiseCanvasBasedOnOptions();
    }

    private initialiseCanvasBasedOnOptions(): void {
        if(!this.canvasOptions) {
            return;
        }

        const { fullscreen } = this.canvasOptions;

        if(fullscreen) {
            window.onresize = this.resizeCanvas;
            this.resizeCanvas();
        }
    }

    private resizeCanvas() {
        this.htmlCanvasElement.width = window.innerWidth;
        this.htmlCanvasElement.height = window.innerHeight;
    }

    private draw() {
        this.context.clearRect(0, 0, this.htmlCanvasElement.width, this.htmlCanvasElement.height);
        this.context.save();

        const startX = 50;
        const startY = 80;

        this.context.beginPath();
        this.context.rect(startX, startY, 100, 20);
        this.context.fillStyle = 'blue';
        this.context.fill();
        this.context.restore();

        const drawRotatedRect = (x: number, y: number, width: number, height: number, degrees: number) => {
            this.context.save();
            this.context.beginPath();
            this.context.translate(x+width/2, y+height/2);
            this.context.rotate(degrees * Math.PI / 180);
            this.context.rect(-width/2, -height/2, width, height);
            this.context.fillStyle = 'gold';
            this.context.fill();
            this.context.restore();
        }

        drawRotatedRect(startX, startY, 100, 20, this.rotation);

        this.rotation += 10;
        if(this.rotation === 360) {
            this.rotation = 0;
        }

        this.vertices.forEach((vertex, i) => {
            console.log(`Index: ${i}`);
            this.context.restore();
            this.context.save();
            this.context.beginPath();
            this.context.arc(vertex.getX(), vertex.getY(), 2, 0, 2 * Math.PI);
            this.context.fillStyle = 'black';
            this.context.fill();
            this.context.restore();

            const x = vertex.getX() + (1 * Math.cos(vertex.getRotation() * Math.PI / 180));
            const y = vertex.getY() + (1 * Math.sin(vertex.getRotation() * Math.PI / 180));
            vertex.setX(x);
            vertex.setY(y);

            this.vertices.forEach((vertexB, j) => {
                if(i === j) {
                    return;
                }

                const x = vertexB.getX() - vertex.getX();
                const y = vertexB.getY() - vertex.getY();

                const distance = Math.sqrt(
                    (x * x) + (y * y)
                );

                if(distance > 100) {
                    return;
                }

                this.context.beginPath();
                this.context.moveTo(vertex.getX(), vertex.getY());
                this.context.lineTo(vertexB.getX(), vertexB.getY());
                this.context.stroke();
                this.context.restore();
            });
        });

        window.requestAnimationFrame(this.draw.bind(this));
    }
}
