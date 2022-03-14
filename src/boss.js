import BossBullet from '/src/bossBullet.js'


export default class Boss{

  constructor (bossHealth, player)
  {
    this.player=player
    this.health;//health as an integer percentage out of 100
    this.position = {
      x:930,
      y:540,
    };//x and y position
    this.maxSpeed;//maximum speed
    this.healthBar = bossHealth;
    this.bossBullets = [];

  }

  updateHealthBar()//updates the health bar displayed on screen
  {
    this.healthBar.setHealthPercent(this.health);
  }

  setHealth(damage) //sets Health to a new percentage if it has changed
  {
    this.health = this.health - damage;
  }

  projectileAttack(){
    console.log('boss attack');
    this.Xdiff=this.Xpos-this.player.position.x;
    this.Ydiff=this.Ypos-this.player.position.y;

    this.bossBullets.push(new BossBullet(this.position.x,this.position.y, this.Xdiff, this.Ydiff, this.gameWidth, this.gameHeight));

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
