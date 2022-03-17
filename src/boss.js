import BossBullet from '/src/bossBullet.js'
import HealthBar from '/src/HealthBar.js'


export default class Boss{

  constructor (bossHealth, player, gameWidth, gameHeight, weapon)
  {
    this.player=player;
    this.gameWidth=gameWidth;
    this.gameHeight=gameHeight;

    this.health = bossHealth; // Health is a certain amount of HP
    this.healthMax = bossHealth;
    this.healthPct = 100; // Integer out of 100
    this.weapon = weapon; //health as an integer percentage out of 100
    this.position = {
      x:930,
      y:540,
    };//x and y position
    this.height = 50;
    this.width = 50;
    this.velocity = {
      x:0,
      y:0,
    }
    this.maxSpeed;//maximum speed
    this.bossBullets = [];

    // Create Health Bar
    // To Use call healthBar.setHealthPercent(SOME_NUMBER);
    const HEALTH_BAR_WIDTH = 200;
    let healthBarWidthPct = 15;
    let healthBarHeightPct = 5;
    this.healthBar = new HealthBar(2, 2, healthBarWidthPct, healthBarHeightPct);

  /*  setInterval (this.updateHealthBar, 10);*///continuously ensures that health bar on screen is accurate to real health percentage
  }

  updateHealthBar()//updates the health bar displayed on screen
  {
    this.healthBar.setHealthPercent(this.healthPct);
  }

  takeDamage(damage) {
    this.health = this.health - damage;
    this.healthPct = Math.round((this.health / this.healthMax) * 100);
    this.updateHealthBar();
  }

  projectileAttack(){
    //console.log('boss attack');
    this.Xdiff=this.position.x-this.player.position.x;
    this.Ydiff=this.position.y-this.player.position.y;

    this.bossBullets.push(new BossBullet(this.position.x,this.position.y, this.Xdiff, this.Ydiff, this.gameWidth, this.gameHeight, this.player));

  }

  draw(ctx){
    ctx.fillRect(this.position.x,this.position.y,20,20);
    this.healthBar.draw(ctx);
  }

  update(deltaTime){
    if(!deltaTime)return;
    for(let i = 0;i<this.bossBullets.length;i++)
    {
      if(this.bossBullets[i].needsDelete)
      {
        this.bossBullets.splice(i,1);
        i--;
      }
    }
  }

}
//test gigalmao how the fuck did this happen
