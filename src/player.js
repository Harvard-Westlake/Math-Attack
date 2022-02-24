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

    //animation vars
    this.playerImage = new Image();
    this.playerImage.src = "/images/shadow_dog.png";
    this.spriteWidth = 575; //this is the width of one frame of our animation in our spritesheet
    this.spriteHeight = 523; //this is the width of one frame of our animation in our spritesheet
    this.frameX = 0; //this denotes how many frames along we are in one animation (0 = first frame, 1 = second frame, and so on)
    this.frameY = 3; //this denotes which animation we are looking at in the spritesheet (0 = first row, 1 = second row, and so on)
    this.gameFrame = 0;
    this.staggerFrames = 5; //bigger staggerFrames = slower animation
    this.spriteAnimations = [];
    this.animationStates = [
      {
        name: "idle",
        frames: 7 //idle has 7 frames
      },
      {
        name: "jump",
        frames: 7,
      }
    ];


    this.animationStates.forEach((state, index) => {
      console.log(state);
      let frames = {
        loc: [],
      }
      for(let j = 0; j < state.frames; j++){ //calculate positionX and positionY depending on which animation you're on
        let positionX = j * this.spriteWidth;
        let positionY = index * this.spriteHeight;
        console.log(positionX);
        console.log(positionY);
        frames.loc.push({x: positionX, y: positionY}); //pushing into location array
        console.log(frames.loc);
      }


      this.spriteAnimations[state.name] = frames.loc; //create a new value in sprite animations with the name of its state and the value of its number of frames
    });

    console.log(this.spriteAnimations);


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
  dash(){
    if(this.velX<0)
    {
      this.position.x-=2*this.width;
    }
    else if(this.velX>0)
    {
      this.position.x+=2*this.width;
    }
    else
    {
        this.position.x+=2*this.width;
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

    let position = Math.floor(this.gameFrame/this.staggerFrames) % 6; //cycles between 0 and 6
    this.frameX = this.spriteWidth * position;

    //ctx.drawImage(spritesheet image, source-x, source-y, source-width, source-height, destination-x. destination-y, destination-width, destination-height)
    ctx.drawImage(this.playerImage,this.frameX,this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,this.position.x,this.position.y, this.width,this.height);

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
