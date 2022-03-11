import Player from '/src/player.js';
import InputHandler from '/src/input.js'
import Bullet from '/src/bullet.js'
import HealthBar from '/src/healthBar.js'
import BossWeapon from '/src/bossweapon.js'
import BossAttack from '/src/bossattack.js'

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');
let myImg = new Image();
myImg.src = "./images/backgroundart.jpg";


const GAME_WIDTH = 1200;
const GAME_HEIGHT = 600;
//COMMENT OUT, THIS IS FOR TESTING
let a = new BossWeapon(69,true,9000+1);
console.log("i am range "+a.getRange()+" with melee "+a.getMelee()+" and damage "+a.getDamage()+".");

// Health Bar
// To Use call healthBar.setHealthPercent(SOME_NUMBER);
const HEALTH_BAR_WIDTH = 200;
const healthBar = new HealthBar(GAME_WIDTH - (HEALTH_BAR_WIDTH + 5), 5, HEALTH_BAR_WIDTH, 40);

ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

let player = new Player(GAME_WIDTH,GAME_HEIGHT);

//testing code
let b = new BossAttack();
b.setPosition(player.position);
b.movementAttack(a);

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

  ctx.drawImage(myImg, 0,0);

  player.draw(ctx);
  player.bullets.forEach((bullet) => {
    bullet.update();
    bullet.draw(ctx);

  });

  // Draw health bar last
  healthBar.draw(ctx);
}
//gameLoop();

let af = new AnimationFrame(gameLoop);
af.start();
