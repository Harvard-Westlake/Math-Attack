export default class Player{
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 50;
    this.height = 50;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.maxSpeedX = 6;
    this.maxSpeedY = 8;
    this.maxDashSpeed=11;
    this.velX = 0;
    this.velY = 0;
    this.runSlidyCoef = 0.3;
    this.stopSlidyCoef = 0.4;
    this.hasJumped = false;
    this.hasDashed = false;
    this.accDown=.3;

    this.playerImage = new Image();
    this.playerImage.src = "/images/PlayerDrawUp.jpg";
    this.position = {
      x: gameWidth/2-this.width/2,
      y: gameHeight-this.height-10,
    }

  }
  updateVelocityX (){
    if (this.isMovingRight == true && Math.abs(this.velX) <= (this.maxSpeedX)){
      this.velX+=this.runSlidyCoef;
    }
    else if (this.isMovingLeft == true && Math.abs(this.velX) <= (this.maxSpeedX)){
      this.velX-=this.runSlidyCoef;
    }
    else if (this.velX!=0){
      if (Math.abs(this.velX)<=this.stopSlidyCoef){
        this.velX=0;
      }
      else if (this.velX > 0){
        this.velX-=this.stopSlidyCoef;
      }
      else if (this.velX < 0){
        this.velX+=this.stopSlidyCoef;
      }
    }
  }
  moveLeft(){
    this.isMovingLeft=true;
  }
  moveRight(){
    this.isMovingRight=true;
  }
  stopHorizontal(){
    this.isMovingLeft = false;
    this.isMovingRight = false;
  }
  jump(){
    if(this.hasJumped)
      return;
    this.hasJumped=true;
    this.velY = this.maxSpeedY;
  }
  dash(orientation, orientations){
    if(this.hasDashed)
      return;
    this.hasDashed = true;
    switch(orientation){
      case orientations.left:
        this.velX=-1*this.maxDashSpeed;
        break;
      case orientations.right:
        this.velX=this.maxDashSpeed;
        break;
      case orientations.down:
        this.velY=-1*this.maxDashSpeed;
        break;
      case orientations.up:
        this.velY=this.maxDashSpeed;
        break;
      case orientations.upLeft:
        this.velX=-1*this.maxDashSpeed;
        this.velY=this.maxDashSpeed/1.4;
        break;
      case orientations.upRight:
        this.velX=this.maxDashSpeed;
        this.velY=this.maxDashSpeed/1.4;
        break;
      case orientations.downLeft:
        this.velX=-1*this.maxDashSpeed;
        this.velY=-1*this.maxDashSpeed/1.4;
        break;
      case orientations.downRight:
        this.velX=this.maxDashSpeed;
        this.velY=-1*this.maxDashSpeed/1.4;
        break;
    }




  }

  draw(ctx){
    ctx.drawImage(this.playerImage,0,0, 1046,1597,this.position.x,this.position.y,this.width,this.height);
  }

  update(deltaTime){
    if(!deltaTime)return;
    window.setTimeout(this.updateVelocityX(), 10);
    console.log (this.velX);
    this.position.x+=this.velX;
    this.position.y-=this.velY;
    this.velY-=this.accDown;

    if(this.position.y+this.height>=this.gameHeight-10)
    {
      this.position.y = this.gameHeight-10-this.height;
      this.velY=0;
      this.hasJumped= false;
      this.hasDashed = false;
    }
    else {
      this.hasJumped=true;
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
