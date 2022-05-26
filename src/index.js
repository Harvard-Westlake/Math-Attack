import Player from '/src/player.js';
import InputHandler from '/src/input.js'
import Bullet from '/src/bullet.js'
import Boss from '/src/boss.js'
import BossBullet from '/src/bossBullet.js'
import BossInputHandler from '/src/bossinputTEST.js'
import BossWeapon from '/src/bossweapon.js'
import BossAttack from '/src/bossattack.js'
import Collision from '/src/collision.js'
import HealthBar from '/src/healthBar.js'
import StartButton from '/src/startbutton.js'

let GAME_WIDTH = 0;
let GAME_HEIGHT = 0;

if(window.innerHeight*2 < window.innerWidth)
{
  GAME_WIDTH = window.innerHeight*2;
  GAME_HEIGHT = window.innerHeight;
}
else
{
  GAME_WIDTH = window.innerWidth;
  GAME_HEIGHT = window.innerWidth/2;
}


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

function getMousePos(canvas, evt) {
   var rect = canvas.getBoundingClientRect();
   return {
     x: evt.clientX - rect.left,
     y: evt.clientY - rect.top,
   };
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



let player = new Player(GAME_WIDTH,GAME_HEIGHT);

//testing
let a = new BossWeapon(69,true,9000+1);
let boss = new Boss(10,player,GAME_WIDTH, GAME_HEIGHT,a);



let b = new BossAttack(player,boss);
console.log("i am range "+a.getRange()+" with melee "+a.getMelee()+" and damage "+a.getDamage()+".");
b.setPosition(player.position);
b.movementAttack();

// This was removed because it sets the default BOSS to a DIFFERENT position than the constructor above
/*
console.log("i am range "+a.getRange()+" with melee "+a.getMelee()+" and damage "+a.getDamage()+".");
boss.position= {x:player.position.x, y:player.position.y};
console.log("boss location ",boss.position)
player.position.x=player.position.x-10;
console.log(player.position);
b.setDirection();
player.position.x=player.position.x+20;
console.log(player.position);
*/
b.setDirection();
b.meleeAttack();

let ih = new InputHandler(player);
let bi = new BossInputHandler(boss);
canvas.addEventListener("click", function (evt) {
      var mousePos = getMousePos(canvas, evt);
      if ((mousePos.x > 650 && mousePos.x < 750) && (mousePos.y > 150 && mousePos.y < 225))
      {
        console.log (ih.getKeys());
        console.log (bi.getKeys());
        ih.writeOutKeys();
        bi.addFireToKeys();
      }
    });

let lastTime = 0;
class Game {
  constructor(fps = 60) {
    this.requestID = 0;
    this.fps = fps;
    this.collisionChecker = new Collision();
  }

  start() {
    let then = performance.now();
    const interval = 1000 / this.fps;

    const animateLoop = (now) => {
      this.requestID = requestAnimationFrame(animateLoop);
      const delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);
        this.gameLoop(delta);
      }
    };
    this.requestID = requestAnimationFrame(animateLoop);
  }

  stop() {
    cancelAnimationFrame(this.requestID);
  }

  gameLoop(timestamp){
    //update gamestate
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Update All Game Objects
    player.update(deltaTime);
    boss.update(deltaTime);
    player.bullets.forEach((bullet) => {
      bullet.update();
    });
    boss.bossBullets.forEach((bullet) => {
      bullet.update();
    });

    // Check collisions
    this.checkCollisions();

    //stuff for StartButton
    let sb = new StartButton();

    // Draw
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    ctx.drawImage(myImg, 0,0, GAME_WIDTH, GAME_HEIGHT);
    player.drawHealth(ctx);
    player.draw(ctx);
    player.bullets.forEach((bullet) => {
      bullet.draw(ctx);

    });
    sb.draw(ctx);

    boss.draw(ctx);
    boss.bossBullets.forEach((bullet) => {
      bullet.draw(ctx);
    });

    this.checkRoundOver(ctx);
  }

  checkRoundOver(ctx) {

    // Check boss death and draw boss death states
    if (boss.isDead()) {
      boss.handleDeath(this, ctx);
      bi.resetKeys();
      ih.resetKeys();
    }

    if (player.remainingHealthHearts == 0){
      alert("you are dead!! oh no :(. Press the restart button to start a new game");
      player.resetPlayer();
      player.position.x=665;
      player.position.y=665;
      boss.resetBoss();
      bi.resetKeys();
      ih.resetKeys();
      console.log (ih.getKeys());
      console.log (bi.getKeys());

    }
  }



  nextLevel() {
    boss = new Boss(10,player,GAME_WIDTH, GAME_HEIGHT,a);
    player.resetPlayer();
  }

  // Checks collisions for:
  //    player and bossBullets
  //    boss and playerBullets
  checkCollisions() {

    // Skip collision if the round is over
    if (player.isDead() || boss.isDead()) {
      return;
    }

    let self = this;

    // Check Player is hit by Boss Bullets
    let playerPositionAndSize = self.collisionChecker.formatPlayerPositionAndSize(player);
    boss.bossBullets.forEach((bullet) => {
      let bulletPositionAndSize = self.collisionChecker.formatBulletPositionAndSize(bullet);
      if (player.vulnerableTimeLeft<=0&&self.collisionChecker.checkForCollision(bulletPositionAndSize, playerPositionAndSize)) {
        bullet.flagForDeletion();
        player.loseHealth(); // Damage Player
      }
    //create health bar instance and if health bar percent is zero then lose health
    });

    // Check Boss is hit by Player Bullets
    let bossPositionAndSize = self.collisionChecker.formatPlayerPositionAndSize(boss);
    player.bullets.forEach((bullet) => {
      let bulletPositionAndSize = self.collisionChecker.formatBulletPositionAndSize(bullet);
      if (self.collisionChecker.checkForCollision(bulletPositionAndSize, bossPositionAndSize)) {
        bullet.flagForDeletion();
        boss.takeDamage(bullet.damage); // Damage Boss
      }
    });
  }
}
// Create and start game
let af = new Game();
af.start();
