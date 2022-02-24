export default class Bullet{
constructor(){
  this.width = 10;
    this.height = 10;
    this.speedX = 0;
    this.speedY = 0;
    this.velX = 0;
    this.velY = 0;
}
  this.keys = {
    "fire" : 88
  };

  document.addEventListener('keydown', (event)=>{
    case this.keys.fire:
      this.player.fireBullet();
      break;

      default:
      break;

    });

}
