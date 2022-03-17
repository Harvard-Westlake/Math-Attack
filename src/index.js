import Player from '/src/player.js';
import InputHandler from '/src/input.js'
import Bullet from '/src/bullet.js'
import Boss from '/src/boss.js'
import BossBullet from '/src/bossBullet.js'
import BossInputHandler from '/src/bossinputTEST.js'
import BossWeapon from '/src/bossweapon.js'
import BossAttack from '/src/bossattack.js'
import Collision from '/src/collision.js'

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');
let myImg = new Image();
myImg.src = "./images/backgroundart.jpg";

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 600;
//COMMENT OUT, THIS IS FOR TESTING
let a = new BossWeapon(69,true,9000+1);
console.log("i am range "+a.getRange()+" with melee "+a.getMelee()+" and damage "+a.getDamage()+".");


ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

let player = new Player(GAME_WIDTH,GAME_HEIGHT);
let boss = new Boss(100,player,GAME_WIDTH, GAME_HEIGHT);

let b = new BossAttack(player,boss);
b.setPosition(player.position);
b.movementAttack(a);

new InputHandler(player);
new BossInputHandler(boss);

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

    // Draw
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    ctx.drawImage(myImg, 0,0);

    player.draw(ctx);
    player.bullets.forEach((bullet) => {
      bullet.draw(ctx);

    });

    boss.draw(ctx);
    boss.bossBullets.forEach((bullet) => {
      bullet.draw(ctx);
    });
  }

  // Checks collisions for:
  //    player and bossBullets
  //    boss and playerBullets
  checkCollisions() {
    let self = this;

    // Check Player is hit by Boss Bullets
    let playerPositionAndSize = self.collisionChecker.formatPlayerPositionAndSize(player);
    boss.bossBullets.forEach((bullet) => {
      let bulletPositionAndSize = self.collisionChecker.formatBulletPositionAndSize(bullet);
      if (self.collisionChecker.checkForCollision(bulletPositionAndSize, playerPositionAndSize)) {
        bullet.flagForDeletion();
        player.loseHealth(); // Damage Player
      }
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
