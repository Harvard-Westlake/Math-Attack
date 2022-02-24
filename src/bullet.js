export default class Bullet{
constructor(x, y){
  this.width = 10;
  this.height = 10;
  this.speedX = 0;
  this.speedY = 0;
  this.velX = 0;
  this.velY = 0;
  this.bulletImage = new Image();
  this.bulletImage.src = "/images/bullet.png";
  this.position = {
    x:x,
    y:y,
  };
}
  draw(ctx){
    ctx.drawImage(this.bulletImage, 0, 0, 8, 8,this.position.x, this.position.y, this.width, this.height);
  }
}
