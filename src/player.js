import Bullet from "/src/bullet.js";
export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = gameWidth * 0.03536;
    this.height = gameHeight * 0.07072;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovementEnabled = false;
    this.isJumping = false;
    this.maxSpeedX = gameWidth * 0.0042433;
    this.maxSpeedY = gameHeight * 0.01132;
    this.maxDashSpeed = gameWidth * 0.0077793;
    this.velX = 0;
    this.velY = 0;
    this.runSlidyCoef = 0.3;
    this.stopSlidyCoef = 0.4;
    this.dashVulnerabilityTime = 15;
    this.hitVulnerabilityTime = 60;
    this.vulnerableTimeLeft = 0;
    this.hasJumped = false;
    this.hasDashed = false;
    this.isDashing = false;
    this.accDown=gameHeight*0.000424328;
    this.remainingHealthHearts = 3;
    this.projectileDamage = 10; //filler value
    this.meleeDamage = 10; //filler value

    //playerHealthBar vars
    this.remainingHealthHearts = 3;
    this.playerHealthImage = new Image();
    this.playerHealthImage.src = "/images/playerhealthbar.png";

    // When the player dies, we need a few variables for death animation
    this.death = {
      isDead: false,
      timeDied: null,
      msUntilBossDefeatedTextDisplayStart: 2500,
    };
    //find length and width of playerhealthbar.png

    //animation vars
    this.playerImage = new Image();
    //this.playerImage.src = "/images/shadow_dog.png";
    //The below code helps prepare the figure for direction; it may not be necessary, but for now it is seemingly needed
    if (this.isMovementEnabled == true && this.isMovingRight == true)
    {
      this.playerImage.src = "/images/runIdleJumpSpriteSheet4_.png";
    }
    else
    {
      this.playerImage.src = "/images/runIdleJumpSpriteSheet4_.png";
      //PUT A NEW IMAGE HERE OF THE PERSON IN THE LEFT STATE
    }
    this.spriteWidth = 38; //this is the width of one frame of our animation in our spritesheet
    this.spriteHeight = 38; //this is the width of one frame of our animation in our spritesheet
    //this.frameX = 0; //this denotes how many frames we are in one animation (0 = first frame, 1 = second frame, and so on)
    //this.frameY = 3; //this denotes which animation we are looking at in the spritesheet (0 = first row, 1 = second row, and so on)
    this.gameFrame = 0;
    this.staggerFrames = 10; //bigger staggerFrames = slower animation
    this.playerState = "idle"; //this variable controls what animation runs, match it to the names in the animationStates variable
    this.spriteAnimations = [];
    this.animationStates = [
      //populate this with the diff animation cycles in the order they appear on the spritesheet top to bottom
      {
        name: "idle", //name of the animation state
        frames: 4, //idle has 7 frames
      },
      {
        name: "jump",
        frames: 7,
      },
      {
        name: "run",
        frames: 4,
      },
    ];

    this.animationStates.forEach((state, index) => {
      let frames = {
        loc: [],
      };
      for (let j = 0; j < state.frames; j++) {
        //calculate positionX and positionY depending on which animation you're on
        let positionX = j * this.spriteWidth;
        let positionY = index * this.spriteHeight;
        frames.loc.push({ x: positionX, y: positionY }); //pushing into location array
      }

      this.spriteAnimations[state.name] = frames.loc; //create a new value in sprite animations with the name of its state and the value of its number of frames
    }); //this will population spriteAnimations with each state of animation and corresponding array of each position on the spritesheet for every frame of that state's animation

    //console.log(this.spriteAnimations);

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 10,
    };
    this.bullets = [];
  }



  resetPlayer() {
    this.remainingHealthHearts = 3;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.enableMovement();
    this.velX = 0;
    this.velY = 0;
  }

  loseHealth() {
    if (this.remainingHealthHearts > 0) this.remainingHealthHearts--;
    this.vulnerableTimeLeft = this.hitVulnerabilityTime;
    if (this.remainingHealthHearts <= 0&&this.isMovementEnabled==true) this.disableMovement();
    console.log(this.remainingHealthHearts);
  }

  updateVelocityX() {
    if (this.isMovingRight == true && Math.abs(this.velX) < this.maxSpeedX) {
      this.velX += this.runSlidyCoef;
    } else if (
      this.isMovingLeft == true &&
      Math.abs(this.velX) < this.maxSpeedX
    ) {
      this.velX -= this.runSlidyCoef;
    } else if (this.velX != 0) {
      if (this.velX > 0) {
        this.velX -= this.stopSlidyCoef;
      } else if (this.velX < 0) {
        this.velX += this.stopSlidyCoef;
      }
      if (Math.abs(this.velX) <= this.stopSlidyCoef) {
        this.velX = 0;
      }
    }
  }
  moveLeft() {
    this.isMovingRight = false;
    this.isMovingLeft = true;
    this.playerImage.src = "/images/runIdleJumpSpriteSheet4LEFT_.png";
  }
  moveRight() {
    this.isMovingLeft = false;
    this.isMovingRight = true;
    this.playerImage.src = "/images/runIdleJumpSpriteSheet4_.png";
  }
  stopHorizontal() {
    this.isMovingLeft = false;
    this.isMovingRight = false;
  }
  async jump() {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    while (this.isJumping) {
      if (!this.hasJumped) {
        this.hasJumped = true;
        this.velY = this.maxSpeedY;
      }
      await timer(10);
    }
  }
  dash(orientation, orientations) {
    this.vulnerableTimeLeft = this.dashVulnerabilityTime;
    if (this.hasDashed) return;
    this.hasDashed = true;
    this.isDashing = true;
    setTimeout(() => {
      this.isDashing = false;
    }, 1000);
    switch(orientation){
      case orientations.left:
        this.velX = -1 * this.maxDashSpeed;
        break;
      case orientations.right:
        this.velX = this.maxDashSpeed;
        break;
      case orientations.down:
        this.velY = -1 * this.maxDashSpeed;
        break;
      case orientations.up:
        this.velY = this.maxDashSpeed;
        break;
      case orientations.upLeft:
        this.velX = -1 * this.maxDashSpeed;
        this.velY = this.maxDashSpeed / 1.4;
        break;
      case orientations.upRight:
        this.velX = this.maxDashSpeed;
        this.velY = this.maxDashSpeed / 1.4;
        break;
      case orientations.downLeft:
        this.velX = -1 * this.maxDashSpeed;
        this.velY = (-1 * this.maxDashSpeed) / 1.4;
        break;
      case orientations.downRight:
        this.velX = this.maxDashSpeed;
        this.velY = (-1 * this.maxDashSpeed) / 1.4;
        break;
    }
  }
  fireBullet(orientation, orientations) {
    //this switch has the purpose of changing the exit point of the bullet so that it matches up with the orientation of the shooting
    switch (orientation) {
      case orientations.left:
        this.bullets.push(
          new Bullet(
            this.position.x + 6,
            this.position.y + this.spriteHeight / 2,
            orientation,
            orientations,
            this.gameWidth,
            this.gameHeight
          )
        );
        break;
      case orientations.right:
        this.bullets.push(
          new Bullet(
            this.position.x + this.spriteWidth / 2,
            this.position.y + this.spriteHeight / 2,
            orientation,
            orientations,
            this.gameWidth,
            this.gameHeight
          )
        );
        break;
      case orientations.down:
        this.bullets.push(
          new Bullet(
            this.position.x + this.spriteWidth / 2,
            this.position.y + this.spriteHeight / 2,
            orientation,
            orientations,
            this.gameWidth,
            this.gameHeight
          )
        );
        break;
      case orientations.up:
        this.bullets.push(
          new Bullet(
            this.position.x + this.spriteWidth / 2,
            this.position.y + this.spriteHeight / 4,
            orientation,
            orientations,
            this.gameWidth,
            this.gameHeight
          )
        );
        break;
      case orientations.upLeft:
        this.bullets.push(
          new Bullet(
            this.position.x + 6,
            this.position.y + this.spriteHeight / 2,
            orientation,
            orientations,
            this.gameWidth,
            this.gameHeight
          )
        );
        break;
      case orientations.upRight:
        this.bullets.push(
          new Bullet(
            this.position.x + this.spriteWidth / 2,
            this.position.y + this.spriteHeight / 2,
            orientation,
            orientations,
            this.gameWidth,
            this.gameHeight
          )
        );
        break;
      case orientations.downLeft:
        this.bullets.push(
          new Bullet(
            this.position.x + 6,
            this.position.y + this.spriteHeight / 2,
            orientation,
            orientations,
            this.gameWidth,
            this.gameHeight
          )
        );
        break;
      case orientations.downRight:
        this.bullets.push(
          new Bullet(
            this.position.x + this.spriteWidth / 2,
            this.position.y + this.spriteHeight / 2,
            orientation,
            orientations,
            this.gameWidth,
            this.gameHeight
          )
        );
        break;
    }
    //this.bullets.push(new Bullet(this.position.x,this.position.y, orientation,orientations, this.gameWidth, this.gameHeight));
  }
  decreaseVulnerabilityTime() {
    if (this.vulnerableTimeLeft > 0) {
      this.vulnerableTimeLeft -= 1;
    }
  }

  disableMovement() {
    this.isMovementEnabled = false;
  }

  enableMovement()
  {
    this.isMovementEnabled = true;
  }

  checkIfMovementEnabled()
  {
    return this.isMovementEnabled;
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

  drawHealth(ctx) {
    ctx.drawImage(
      this.playerHealthImage,
      0,
      175 * (3 - this.remainingHealthHearts),
      525,
      175,
      5,
      5,
      210,
      70
    );
  }
  draw(ctx) {
    let positionAnimation =
      Math.floor(this.gameFrame / this.staggerFrames) %
      this.spriteAnimations[this.playerState].length; //cycles between 0 and 6
    let frameX = this.spriteWidth * positionAnimation;
    //console.log(position);
    //console.log(this.spriteAnimations[this.playerState][positionAnimation].y);
    let frameY = this.spriteAnimations[this.playerState][positionAnimation].y;
    //console.log(frameX);

    //ctx.drawImage(spritesheet image, source-x, source-y, source-width, source-height, destination-x. destination-y, destination-width, destination-height)
    ctx.drawImage(
      this.playerImage,
      frameX,
      frameY,
      this.spriteWidth,
      this.spriteHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    //draw playerhealthbar.png
    //ctx.drawImage(this.playerHealthImage, 225,75*(3-this.remainingHealthHearts),225,75,10,10);

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

  update(deltaTime) {
    if (!deltaTime) return;
    this.updateVelocityX();
    this.decreaseVulnerabilityTime();
    if (this.vulnerableTimeLeft == 0) {
    }
    if (this.vulnerableTimeLeft > 0) {
      console.log(this.vulnerableTimeLeft);
    }

    //console.log (this.velX);
    this.position.x += this.velX;
    this.position.y -= this.velY;
    this.velY -= this.accDown;

    if (this.position.y + this.height >= this.gameHeight - 10) {
      this.playerState = "idle";
      this.position.y = this.gameHeight - 10 - this.height;
      this.velY = 0;
      this.hasJumped = false;
      this.hasDashed = false;
    } else {
      this.playerState = "jump";
      this.hasJumped = true;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width >= this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].needsDelete) {
        this.bullets.splice(i, 1);
        i--;
      }
    }

    //to see the list of bullets
    //console.log(this.bullets);
  }

  isDead() {
    return this.death.isDead;
  }
}
