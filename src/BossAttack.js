import BossWeapon from '/src/bossweapon.js'
import Player from '/src/player.js'
export default class BossAttack {
  //string direction //determines direction of the attack, string that represents one of the eight cardinal directions
  //boolean hit //true if you hit the boss, false otherwise
  //int [] playerPosition //int array [x, y] position of playerc
  constructor(){

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
    //setDirection();
  //  windUp();
    let range = weapon.getRange();
    //play attack animations
    //move to near playerPosition
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
    //teleport to [playerPosition[x] + addx*Math.random()*weapon.getRange() , playerPosition[x] + addy*Math.random()*weapon.getRange() ;
    if(/*player within range by end of animation==*/true){
      //(setHP(getHP()-weapon.damage));
      console.log("yoink the hp");
    }
  }
}
