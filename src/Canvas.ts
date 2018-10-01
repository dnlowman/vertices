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

    public getVertices(): Vertex[] {
        return this.vertices;
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

        this.context.beginPath();
        this.context.rect(0, 0, window.innerWidth, window.innerHeight);
        this.context.fillStyle = 'black';
        this.context.fill();
        this.context.restore();

        this.rotation += 10;
        if(this.rotation === 360) {
            this.rotation = 0;
        }

        this.vertices.forEach((vertex, i) => {
            this.context.restore();
            this.context.save();
            this.context.beginPath();
            this.context.arc(vertex.getX(), vertex.getY(), 2, 0, 2 * Math.PI);
            this.context.fillStyle = 'white';
            this.context.fill();
            this.context.restore();

            const xPos = vertex.getX();
            const yPos = vertex.getY();

            if(xPos >= window.innerWidth) {
                vertex.setXVelocity(vertex.getXVelocity() * -1)
            }
            if(xPos <= 0) {
                vertex.setXVelocity(vertex.getXVelocity() * -1)
            }
            if(yPos >= window.innerHeight) {
                vertex.setYVelocity(vertex.getYVelocity() * -1)
            }
            if(yPos <= 0) {
                vertex.setYVelocity(vertex.getYVelocity() * -1)
            }

            const x = vertex.getX() + (vertex.getXVelocity() * Math.cos(vertex.getRotation() * Math.PI / 180));
            const y = vertex.getY() + (vertex.getYVelocity() * Math.sin(vertex.getRotation() * Math.PI / 180));

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
                this.context.strokeStyle = 'white';
                this.context.stroke();
                this.context.restore();
            });
        });

        window.requestAnimationFrame(this.draw.bind(this));
    }
}
