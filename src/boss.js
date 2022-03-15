import BossBullet from '/src/bossBullet.js'


export default class Boss{

  constructor (bossHealth, player, gameWidth, gameHeight)
  {
    this.player=player;
    this.gameWidth=gameWidth;
    this.gameHeight=gameHeight;
    this.health;//health as an integer percentage out of 100
    this.position = {
      x:930,
      y:540,
    };//x and y position
    this.maxSpeed;//maximum speed
    this.healthBar = bossHealth;
    this.bossBullets = [];

  /*  setInterval (this.updateHealthBar, 10);*///continuously ensures that health bar on screen is accurate to real health percentage
  }

  updateHealthBar()//updates the health bar displayed on screen
  {
    this.healthBar.setHealthPercent(this.health);
    console.log ('boss health bar updated');
  }

  setHealth(damage) //sets Health to a new percentage if it has changed
  {
    this.health = this.health - damage;
  }

  projectileAttack(){
    //console.log('boss attack');
    this.Xdiff=this.position.x-this.player.position.x;
    this.Ydiff=this.position.y-this.player.position.y;

    this.bossBullets.push(new BossBullet(this.position.x,this.position.y, this.Xdiff, this.Ydiff, this.gameWidth, this.gameHeight, this.player));

  }

  draw(ctx){
    ctx.fillRect(this.position.x,this.position.y,20,20);
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
