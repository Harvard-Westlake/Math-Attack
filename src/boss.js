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
    this.velocity = {
      x:0,
      y:0,
    }
    this.healthBar = bossHealth;
    this.bossBullets = [];

    this.maxSpeed=5;//maximum speed
    this.movementFrequency=300; //in milliseconds

    this.currVelocity;
    this.velocityDirection;
    this.isMoving;
    this.timeLastMovementChanged=0;


  /*  setInterval (this.updateHealthBar, 10);*///continuously ensures that health bar on screen is accurate to real health percentage
  }

  determineVelocityDirection()//determines the direction of the boss's velocity
  {
    if ((Date.now()-this.timeLastMovementChanged>this.movementFrequency))
    {
      if ((this.positionX>(this.gameWidth*.1))&&(this.positionX<(this.gameWidth*.9)))
      {
        //factor in current position on screen
        let randNum = Math.floor(Math.random() * 2);
        if (randNum == 0)
        {
          this.velocityDirection=-1;
        }
        else
        {
          this.velocityDirection=1;
        }
        this.timeLasteMovementChanged=Date.now();
      }
      else if (this.positionX<(this.gameWidth*.1)){
        this.velocityDirection=-1;
      }
      else {
        this.velocityDirection=1;
      }
    }
  }

  determineVelocityMagnitude()
  {
    this.currVelocity = (Math.random() * this.maxSpeed * this.velocityDirection);
  }

  updatePosition (deltaTime)
  {
    this.positionX = this.positionX + this.currVelocity*deltaTime();
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
