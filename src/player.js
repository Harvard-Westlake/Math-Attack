export default class Player{
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 50;
    this.height = 50;
    this.speedX = 7;
    this.speedY = 40;
    this.velX = 0;
    this.velY = 0;
    this.hasJumped = false;
    this.accDown=5;

    this.playerImage = new Image();
    this.playerImage.src = "/images/PlayerDrawUp.jpg";
    this.position = {
      x: gameWidth/2-this.width/2,
      y: gameHeight-this.height-10,
    }

  }

  moveLeft(){
    this.velX = -1*this.speedX;
  }
  moveRight(){
    this.velX = this.speedX;
  }
  stopHorizontal(){
    this.velX = 0;
  }
  jump(){
    if(this.hasJumped)
      return;
    this.hasJumped=true;
    this.velY = this.speedY;
  }
  dash(orientation, orientations){
    switch(orientation){
      case orientations.left:
        this.position.x-=4*this.width;
        break;
      case orientations.right:
        this.position.x+=4*this.width;
        break;
      case orientations.down:
        this.position.y+=4*this.width;
        break;
      case orientations.up:
        this.position.y-=4*this.width;
        break;
      case orientations.upLeft:
        this.position.x-=2.8*this.width;
        this.position.y-=2.8*this.width;
        break;
      case orientations.upRight:
        this.position.x+=2.8*this.width;
        this.position.y-=2.8*this.width;
        break;
      case orientations.downLeft:
        this.position.x-=2.8*this.width;
        this.position.y+=2.8*this.width;
        break;
      case orientations.downRight:
        this.position.x+=2.8*this.width;
        this.position.y+=2.8*this.width;
        break;
    }




  }

  draw(ctx){
    ctx.drawImage(this.playerImage,0,0, 1046,1597,this.position.x,this.position.y,this.width,this.height);
  }

  update(deltaTime){
    if(!deltaTime)return;

    this.position.x+=this.velX;
    this.position.y-=this.velY;
    this.velY-=this.accDown;

    if(this.position.y+this.height>=this.gameHeight-10)
    {
      this.position.y = this.gameHeight-10-this.height;
      this.velY=0;
      this.hasJumped= false;
    }
    if(this.position.x<0)
    {
      this.position.x =0;
    }
    if(this.position.x+this.width>=this.gameWidth)
    {
      this.position.x=this.gameWidth-this.width;
    }
  }
}
