
import BossWeapon from '/src/bossweapon.js'
import Player from '/src/player.js'
export default class BossAttack {
  //string direction //determines direction of the attack, string that represents one of the eight cardinal directions
  //boolean hit //true if you hit the boss, false otherwise
  //int [] playerPosition //int array [x, y] position of playerc

    constructor (Player protagonist, Boss antagonist)
    {

      this.isHit = false;
      this.direction;
    }
    function setDirection ()
    {
      if ((Math.sign(antagonist.player.x - protagonist.player.x)) > 0)
      {
        this.direction  == "left";
      }
      else {
        this.direction == "right";
      }
    }

  //removable function
  setPosition(position){
    this.playerPosition = [position.x,position.y];
  }
  //required function
  setWeapon(weapon){
    this.weapon = weapon;
  }
  movementAttack(weapon) {
    this.setDirection();
  //  this.windUp();
    console.log("winding up lol");

    let range = weapon.getRange();
    //play attack animations
    //move to near playerPosition
    //i'm paid per line right
    let addx = 1;
    let addy = 1;
    let plusorminus = Math.round(Math.random());
    switch(plusorminus){
      case 1:
        addx =1;
      break;
      default:
        addx = -1;
      break;
    }
    plusorminus = Math.round(Math.random());
    switch(plusorminus){
      case 1:
        addy =1;
      break;
      default:
        addy = -1;
      break;
    }
    let tpsitex = this.playerPosition[0]+addx*Math.random()*range;
    let tpsitey = this.playerPosition[1]+addy*Math.random()*range;
    if(tpsitex < 0){
      tpsitex = 0;
    }
    if(tpsitex>self.GAME_WIDTH){
      tpsitex = self.GAME_WIDTH;
    }
    if(tpsitey < 0){
      tpsitey = 0;
    }
    if(tpsitey>self.GAME_HEIGHT){
      tpsitey = self.GAME_HEIGHT;
    }

    console.log("teleporting to ()"+tpsitex+","+tpsitey+")in relation to playerposition");

    if(this.playerIsInRange()){
      //(setHP(getHP()-weapon.damage));
      console.log("yoink the hp");
    }
  }
  playerIsInRange(){
    //require code here
    return true;
  }

}
