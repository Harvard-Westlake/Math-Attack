import Player from '/src/player.js';
import InputHandler from '/src/input.js'
import Bullet from '/src/bullet.js'
import HealthBar from '/src/healthBar.js'
import Boss from '/src/boss.js'
import BossBullet from '/src/bossBullet.js'
import BossInputHandler from '/src/bossinputTEST.js'
import BossWeapon from '/src/bossweapon.js'
import BossAttack from '/src/bossattack.js'

const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;

let canvas = document.getElementById("gameScreen");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
let ctx = canvas.getContext('2d');
let myImg = new Image();
myImg.src = "./images/backgroundart.jpg";

//disables scrolling
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
window.addEventListener('keydown', preventDefaultForScrollKeys, false);

// Health Bar
// To Use call healthBar.setHealthPercent(SOME_NUMBER);
const HEALTH_BAR_WIDTH = 200;
const healthBar = new HealthBar(GAME_WIDTH - (HEALTH_BAR_WIDTH + 5), 5, HEALTH_BAR_WIDTH, 40);

ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

let player = new Player(GAME_WIDTH,GAME_HEIGHT);
let boss = new Boss(100,player,GAME_WIDTH, GAME_HEIGHT);

let b = new BossAttack(player,boss);
b.setPosition(player.position);
b.movementAttack(a);

new InputHandler(player);
new BossInputHandler(boss);

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
  //update gamestate
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;


  //draw
  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
  player.update(deltaTime);
  boss.update(deltaTime);

  ctx.drawImage(myImg, 0,0, GAME_WIDTH, GAME_HEIGHT);

  player.draw(ctx);
  player.bullets.forEach((bullet) => {
    bullet.update();
    bullet.draw(ctx);

  });

  boss.draw(ctx);
  boss.bossBullets.forEach((bullet) => {
    bullet.update();
    bullet.draw(ctx);
  });

  // Draw health bar last
  healthBar.draw(ctx);
}
//gameLoop();

let af = new AnimationFrame(gameLoop);
af.start();
