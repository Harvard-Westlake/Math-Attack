import BossWeapon from '/src/bossweapon.js'
import Player from '/src/player.js'
import Boss from '/src/boss.js'

//string direction //determines direction of the attack, string that represents one of the eight cardinal directions
//boolean hit //true if you hit the boss, false otherwise
//int [] playerPosition //int array [x, y] position of playerc

export default class BossAttack {
  constructor(protagonist, antagonist, lifePoints) {
    this.protagonist = protagonist;
    this.antagonist = antagonist;
    this.lifePoints = lifePoints;
    this.isHit = false;
    this.direction;
  }
  setDirection() {
    console.log("position boss", this.antagonist.position);
    console.log("position player", this.protagonist.position);
    console.log("sign",(Math.sign(this.antagonist.position.x - this.protagonist.position.x)));
    if ((Math.sign(this.antagonist.position.x - this.protagonist.position.x)> 0)) {
      console.log("left");
      this.direction = "left";
    } else {
      console.log("right");
      this.direction = "right";
    }
  }
  meleeAttack() {
    var weapon = antagonist.weapon;
    setDirection()
    //windUp()
    if (checkIfHit()) {
      this.lifePoints.setHealthPercent(this.lifePoints.healthPercent - weapon.getDamage());
    }
    //play meleeAttack animation in corresponding direction

  }
  checkIfHit() {
    if (this.direction == "left") {
      if ((this.antagonist.player.x - this.antagonist.weapon.range) <= this.protagonist.player.x) {
        return true;
      }
    } else {
      if ((this.antagonist.player.x + this.antagonist.weapon.range) >= this.protagonist.player.x) {
        return true;
      }
    }
    return false;
  }
  //removable
  setPosition(position) {
    this.playerPosition = [position.x, position.y];
  }

//required
setWeapon(weapon) {
  this.weapon = weapon;
}
movementAttack() {
  this.setDirection();
  //  this.windUp();
  console.log("winding up lol");

  let range = this.antagonist.weapon.getRange();
  //play attack animations
  //move to near playerPosition
  //i'm paid per line right
  let addx = 1;
  let addy = 1;
  let plusorminus = Math.round(Math.random());
  switch (plusorminus) {
    case 1:
      addx = 1;
      break;
    default:
      addx = -1;
      break;
  }
  plusorminus = Math.round(Math.random());
  switch (plusorminus) {
    case 1:
      addy = 1;
      break;
    default:
      addy = -1;
      break;
  }
  let tpsitex = this.playerPosition[0] + addx * Math.random() * range;
  let tpsitey = this.playerPosition[1] + addy * Math.random() * range;
  if (tpsitex < 0) {
    tpsitex = 0;
  }
  if (tpsitex > self.GAME_WIDTH) {
    tpsitex = self.GAME_WIDTH;
  }
  if (tpsitey < 0) {
    tpsitey = 0;
  }
  if (tpsitey > self.GAME_HEIGHT) {
    tpsitey = self.GAME_HEIGHT;
  }

  console.log("teleporting to ()" + tpsitex + "," + tpsitey + ")in relation to playerposition");

  if (this.playerIsInRange()) {
    //(setHP(getHP()-weapon.damage));
    console.log("yoink the hp");
  }
}
playerIsInRange() {
  //require code here
  return true;
}

}
