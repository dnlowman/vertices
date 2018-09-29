import Point from './Point';

export default class Vertex {
    private point: Point;
    private rotation: number;

    public constructor(point: Point, rotation: number) {
        this.point = point;
        this.rotation = rotation;
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
}
