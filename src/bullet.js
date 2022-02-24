export default class Bullet{
constructor(){
  this.width = 10;
    this.height = 10;
    this.speedX = 0;
    this.speedY = 0;
    this.velX = 0;
    this.velY = 0;
    this.bulletImage = new Image();
    this.bulletImage.src = "/images/bullet.png";
}
    fireBullet(ctx){
      ctx.drawImage(this.bulletImage, 0, 0, 100, 100);
    }
}
