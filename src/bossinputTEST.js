export default class BossInputHandler{

  constructor(boss){
    this.boss = boss;

    this.keyDown = {};
    this.keys = {};

    document.addEventListener('keydown', (event)=>{

      //alert(event.keyCode);
      switch (event.keyCode) {
        case this.keys.bossfire:
          this.boss.projectileAttack();

        default:
          break;
      }
    });
}

addFireToKeys()
{
  this.keys = {
    "bossfire": 80
  };
}

}
