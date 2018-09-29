import 'normalize.css';
import './style.css';
import Canvas from './Canvas';
import Vertex from './Vertex';

const element = document.getElementById('canvas') as HTMLCanvasElement;

const canvas = new Canvas(element, {
    fullscreen: true
});

setInterval(() => {
    const vertex = new Vertex({
        x: Math.floor(Math.random() * window.innerWidth) + 0,
        y: Math.floor(Math.random() * window.innerHeight) + 0
    }, Math.floor(Math.random() * 259) + 0);
    canvas.addVertex(vertex);
}, 1000);
