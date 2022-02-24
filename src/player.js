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

    //animation vars
    this.playerImage = new Image();
    this.playerImage.src = "/images/shadow_dog.png";
    this.spriteWidth = 575; //this is the width of one frame of our animation in our spritesheet
    this.spriteHeight = 523; //this is the width of one frame of our animation in our spritesheet
    //this.frameX = 0; //this denotes how many frames along we are in one animation (0 = first frame, 1 = second frame, and so on)
    //this.frameY = 3; //this denotes which animation we are looking at in the spritesheet (0 = first row, 1 = second row, and so on)
    this.gameFrame = 0;
    this.staggerFrames = 5; //bigger staggerFrames = slower animation
    this.playerState = "run" //this variable controls what animation runs, match it to the names in the animationStates variable
    this.spriteAnimations = [];
    this.animationStates = [ //populate this with the diff animation cycles in the order they appear on the spritesheet top to bottom
      {
        name: "idle", //name of the animation state
        frames: 7 //idle has 7 frames
      },
      {
        name: "jump",
        frames: 7,
      },
      {
        name: "fall",
        frames: 7,
      },
      {
        name: "run",
        frames: 9,
      },
      {
        name: "dizzy",
        frames: 11,
      },
      {
        name: "sit",
        frames: 5,
      },
      {
        name: "roll",
        frames: 7,
      },
      {
        name: "bite",
        frames: 7,
      },
      {
        name: "ko",
        frames: 12,
      },
      {
        name: "getHit",
        frames: 4,
      }
    ];


    this.animationStates.forEach((state, index) => {
      let frames = {
        loc: [],
      }
      for(let j = 0; j < state.frames; j++){ //calculate positionX and positionY depending on which animation you're on
        let positionX = j * this.spriteWidth;
        let positionY = index * this.spriteHeight;
        frames.loc.push({x: positionX, y: positionY}); //pushing into location array

      }


      this.spriteAnimations[state.name] = frames.loc; //create a new value in sprite animations with the name of its state and the value of its number of frames
    }); //this will population spriteAnimations with each state of animation and corresponding array of each position on the spritesheet for every frame of that state's animation

    console.log(this.spriteAnimations);


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


// spriteAnimations = [
//   "idle" = {
//     loc: [
//       {x: 0, y: 0}
//     ]
//   },
//   "jump" = {
//
//   }
//
// ]

  draw(ctx){

    let positionAnimation = Math.floor(this.gameFrame/this.staggerFrames) % this.spriteAnimations[this.playerState].length; //cycles between 0 and 6
    let frameX = this.spriteWidth * positionAnimation;
    //console.log(position);
    console.log(this.spriteAnimations[this.playerState][positionAnimation].y);
    let frameY = this.spriteAnimations[this.playerState][positionAnimation].y;
    console.log(frameX);


    //ctx.drawImage(spritesheet image, source-x, source-y, source-width, source-height, destination-x. destination-y, destination-width, destination-height)
    ctx.drawImage(this.playerImage, frameX, frameY, this.spriteWidth, this.spriteHeight,this.position.x, this.position.y, this.width,this.height);


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
