import Player from '/src/player.js';
import InputHandler from '/src/input.js'

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 600;



ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);



let player = new Player(GAME_WIDTH,GAME_HEIGHT);

new InputHandler(player);

let lastTime = 0;

class AnimationFrame {
  constructor(animate, fps = 60) {
    this.requestID = 0;
    this.fps = fps;
    this.animate = animate;
  }

  start() {
    let then = performance.now();
    const interval = 1000 / this.fps;

    const animateLoop = (now) => {
      this.requestID = requestAnimationFrame(animateLoop);
      const delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);
        this.animate(delta);
      }
    };
    this.requestID = requestAnimationFrame(animateLoop);
  }

  stop() {
    cancelAnimationFrame(this.requestID);
  }

}

function gameLoop(timestamp){
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
  player.update(deltaTime);

  player.draw(ctx);
  //requestAnimationFrame(gameLoop);
}
//gameLoop();

let af = new AnimationFrame(gameLoop);
af.start();
