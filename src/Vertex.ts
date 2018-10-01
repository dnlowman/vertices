import Point from './Point';

export default class Vertex {
    private point: Point;
    private rotation: number;
    private xVelocity: number;
    private yVelocity: number;

    public constructor(point: Point, rotation: number, xVelocity: number, yVelocity: number) {
        this.point = point;
        this.rotation = rotation;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    public setX(x: number): void {
        this.point.x = x;
    }

    public setY(y: number): void {
        this.point.y = y;
    }

    public getX(): number {
        return this.point.x;
    }

    public getY(): number {
        return this.point.y;
    }

    public getRotation(): number {
        return this.rotation;
    }

    public getXVelocity(): number {
        return this.xVelocity;
    }

    public setXVelocity(velocity: number): void {
        this.xVelocity = velocity;
    }

    public getYVelocity(): number {
        return this.yVelocity;
    }

    public setYVelocity(velocity: number): void {
        this.yVelocity = velocity;
    }
}
