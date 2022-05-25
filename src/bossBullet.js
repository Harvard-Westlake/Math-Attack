export default class BossBullet{

  constructor(x, y, Xdiff, Ydiff, gameWidth,gameHeight, player){

    this.width = 0.02122*gameWidth;
    this.height = this.width;
    this.Xdiff=Xdiff;
    this.Ydiff=Ydiff;
    this.velX = 10*Math.cos(Math.atan2(Ydiff,Xdiff));
    this.velY = 23*Math.sin(Math.atan2(Ydiff,Xdiff));
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.bulletImage = new Image();
    this.bulletImage.src = "/images/bullet.png";
    this.needsDelete = false;
    this.player=player;
    this.position = {
      x:x,
      y:y,
    };

    //console.log("X: "+Xdiff);
    //console.log("Y: "+Ydiff);
    //console.log("XVel: "+this.velX);
    //console.log("YVel: "+this.velY);
    //console.log("Rad: "+Math.atan(Ydiff,Xdiff));
  }

  draw(ctx){
    ctx.drawImage(this.bulletImage, 0, 0, 8, 8,this.position.x, this.position.y, this.width, this.height);
  }

  update(){
    //if(this.Xdiff>=0 && this.Ydiff>=0){
      this.position.x-=this.velX;
      this.position.y-=this.velY;

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

  flagForDeletion() {
    this.needsDelete = true;
  }
}
