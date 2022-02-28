export default class Bullet{

  constructor(x, y, orientation, orientations){
    this.width = 10;
    this.height = 10;
    this.speedX = 0;
    this.speedY = 0;
    this.velX = 0;
    this.velY = 0;
    this.orientation = orientation;
    this.orientations = orientations;
    this.bulletSpeed = 10;
    this.bulletImage = new Image();
    this.bulletImage.src = "/images/bullet.png";
    this.needsDelete = false;
    this.position = {
      x:x,
      y:y,
    };
  }
  setVelocity(){
    switch(this.orientation){
      case this.orientations.left:
        this.velX=-1*this.bulletSpeed;
        break;
      case this.orientations.right:
        this.velX=this.bulletSpeed;
        break;
      case this.orientations.down:
        this.velY=-1*this.bulletSpeed;
        break;
      case this.orientations.up:
        this.velY=this.bulletSpeed;
        break;
      case this.orientations.upLeft:
        this.velX=-1*this.bulletSpeed/1.4;
        this.velY=this.bulletSpeed/1.4;
        break;
      case this.orientations.upRight:
        this.velX=this.bulletSpeed/1.4;
        this.velY=this.bulletSpeed/1.4;
        break;
      case this.orientations.downLeft:
        this.velX=-1*this.bulletSpeed/1.4;
        this.velY=-1*this.bulletSpeed/1.4;
        break;
      case this.orientations.downRight:
        this.velX=this.bulletSpeed/1.4;
        this.velY=-1*this.bulletSpeed/1.4;
        break;
      }
  }

  draw(ctx){
    ctx.drawImage(this.bulletImage, 0, 0, 8, 8,this.position.x, this.position.y, this.width, this.height);
  }
  update(){
    if(this.velX==0&&this.velY==0)
    {
        this.setVelocity();
    }
    this.position.x+=this.velX;
    this.position.y-=this.velY;

    if(this.position.y+this.height>=this.gameHeight-10)
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
    if(this.position.x+this.width>=this.gameWidth)
    {
      this.needsDelete = true;
    }
  }
}
