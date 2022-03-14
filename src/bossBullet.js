export default class BossBullet{

  constructor(x, y, Xdiff, Ydiff, gameWidth,gameHeight){

    this.width = 20;
    this.height = 20;
    this.velX = 10;//20*Math.cos(Math.atan(Ydiff,Xdiff));
    this.velY = 0;//20*Math.sin(Math.atan(Ydiff,Xdiff));
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.bulletImage = new Image();
    this.bulletImage.src = "/images/bullet.png";
    this.needsDelete = false;
    this.position = {
      x:x,
      y:y,
    };
  }

  draw(ctx){
    ctx.drawImage(this.bulletImage, 0, 0, 8, 8,this.position.x, this.position.y, this.width, this.height);
  }

  update(){
    this.position.x-=this.velX;
    this.position.y-=this.velY;

    console.log(this.position.x);

    if(this.position.y>=this.gameHeight)
    {
      this.needsDelete = true;
    }
    if(this.position.y<0)
    {
      this.needsDelete = true;
    }
    if(this.position.x<0)
    {
      this.needsDelete = true;
    }
    if(this.position.x>=this.gameWidth)
    {
      this.needsDelete = true;
    }
  }
}
