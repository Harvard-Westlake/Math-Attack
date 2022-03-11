export default class BossAttack {
  //string direction //determines direction of the attack, string that represents one of the eight cardinal directions
  //boolean hit //true if you hit the boss, false otherwise
  //int [] playerPosition //int array [x, y] position of playerc
  constructor(){

  }
  movementAttack(/*BossWeapon weapon*/) {
    //setDirection();
  //  windUp();
    let range = /*weapon.getRange()*/9;
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
    console.log("teleporting to ()"+addx*Math.random()*range+","+addy*Math.random()*range+")in relation to playerposition");
    //teleport to [playerPosition[x] + addx*Math.random()*weapon.getRange() , playerPosition[x] + addy*Math.random()*weapon.getRange() ;
    if(/*player within range by end of animation==*/true){
      //(setHP(getHP()/*-weapon.damage*/));
      console.log("yoink the hp");
    }
  }
}
