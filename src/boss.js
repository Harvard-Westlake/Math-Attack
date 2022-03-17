import BossBullet from '/src/bossBullet.js'


export default class Boss{

  constructor (bossHealth, player, gameWidth, gameHeight)
  {
    this.gameFrame = 0;
    this.animationRate = 30;//number of frames to switch animation
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
    this.maxSpeed;//maximum speed
    this.healthBar = bossHealth;
    this.bossBullets = [];
    this.bossImage = new Image();
    this.bossImage.src = "/images/nealis.png";
    this.spriteWidth = 575; //this is the width of one frame of our animation in our spritesheet
    this.spriteHeight = 523; //this is the width of one frame of our animation in our spritesheet
    this.width = 50;
    this.height = 50;


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

//  draw(ctx){
  //  ctx.fillRect(this.position.x,this.position.y,20,20);
//  }

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

  draw(ctx){


    let frameX = 300;
    //console.log(position);
    //console.log(this.spriteAnimations[this.playerState][positionAnimation].y);

    let frameY = 100;
    let counter = this.gameFrame %(this.animationRate*2);
    if (counter > this.animationRate){
      frameY = 200;
    }
    console.log(frameY);


    //ctx.drawImage(spritesheet image, source-x, source-y, source-width, source-height, destination-x. destination-y, destination-width, destination-height)
    ctx.drawImage(this.bossImage, frameX, frameY, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height);
    //draw playerhealthbar.png
    //ctx.drawImage(this.playerHealthImage)

   //  if(this.gameFrame % this.staggerFrames == 0){ //slows down our animation
   //    if(this.frameX < 6){ //this goes through frames 0-6
   //      this.frameX++; //increments to the next frame
   //    }
   //    else{
   //      this.frameX = 0; //sets the animation back to the beginning
   //    }
   // }

   this.gameFrame++;



  }


}
//test gigalmao how the fuck did this happen
