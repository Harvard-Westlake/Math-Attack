export default class InputHandler {
  // Sets left or right view direction.  All other directions
  // are set in 'updateOrientation'
  updateUnderlyingOrientation(leftOrRight) {
    if (leftOrRight == this.keys.left) {
      this.underlyingOrientation = this.orientations.left;
      this.player.moveLeft();
    } else if (leftOrRight == this.keys.right) {
      this.underlyingOrientation = this.orientations.right;
      this.player.moveRight();
    }
    this.updateOrientation();
  }

  // Uses flags and underlyingOrientation to determine latest orientation
  // Can be called at any time and figures out the orientation based on
  // flag states
  updateOrientation() {
    switch (this.underlyingOrientation) {
      case this.orientations.left:
        if (this.keyDown[this.keys.up]) {
          if (!this.keyDown[this.keys.left]) {
            this.orientation = this.orientations.up;
          } else {
            this.orientation = this.orientations.upLeft;
          }
        } else if (this.keyDown[this.keys.down]) {
          if (!this.keyDown[this.keys.left]) {
            this.orientation = this.orientations.down;
          } else {
            this.orientation = this.orientations.downLeft;
          }
        } else {
          this.orientation = this.orientations.left;
        }
        break;

      case this.orientations.right:
        if (this.keyDown[this.keys.up]) {
          if (!this.keyDown[this.keys.right]) {
            this.orientation = this.orientations.up;
          } else {
            this.orientation = this.orientations.upRight;
          }
        } else if (this.keyDown[this.keys.down]) {
          if (!this.keyDown[this.keys.right]) {
            this.orientation = this.orientations.down;
          } else {
            this.orientation = this.orientations.downRight;
          }
        } else {
          this.orientation = this.orientations.right;
        }
        break;

      default:
        break;
    }
    // Test Orientation by uncommenting this - orientation code
    //console.log("Orientation:" + this.orientation);
  }

  manuallyKeyUpAllButtons() {
    let self = this;
    Object.keys(this.keys).forEach(function (k, v) {
      if (self.keyDown[k] == true) {
        const input = document.getElementById("gameScreen");
        this.input.dispatchEvent(new KeyboardEvent("keyup", { k: v }));
      }
    });
  }

  writeOutKeys()
  {
    this.keys = {
      "left" : 37,
      "right" : 39,
      "up" : 38,
      "down" : 40,
      "shift" : 16,
      "space" : 32,
      "fire" : 88,
      "end" : 69,
      "jump" : 90
    };
  }

  resetKeys()
  {
    this.keys = {};
  }

  getKeys()
  {
    return this.keys;
  }

  constructor(player){
    this.fireBulletSwitch = 0;
    this.player = player;
    // Kinda gross but
    this.orientations = {
      upLeft: "upLeft",
      upRight: "upRight",
      up: "up",
      left: "left",
      right: "right",
      down: "down",
      downLeft: "downLeft",
      downRight: "downRight",
    };
    this.underlyingOrientation = this.orientations.right;
    this.orientation = this.orientations.right;

    this.keyDown = {};
    this.keys = {};

    document.addEventListener('keydown', (event)=>{

      //alert(event.keyCode);
      if (this.player.isMovementEnabled == true) {
        console.log("movement is enabled");
        switch (event.keyCode) {
          // Arrow keys for orientation
          case this.keys.left: //37
          case this.keys.right: //39
            this.keyDown[event.keyCode] = true;
            this.updateUnderlyingOrientation(event.keyCode);
            break;

          case this.keys.up:
          if (this.keyDown[this.keys.jump] != true) {
            this.player.isJumping = true;
            this.player.jump();
          }
          case this.keys.down:
            this.keyDown[event.keyCode] = true;
            this.updateOrientation();
            break;
          case this.keys.fire:
            if (this.fireBulletSwitch == 0){
              this.player.fireBullet(this.orientation, this.orientations);
            }
            this.fireBulletSwitch = 1;
            break;
          // Uses only jmp and shift
          case this.keys.jump:
            if (this.keyDown[this.keys.jump] != true) {
              this.player.isJumping = true;
              this.player.jump();
            }
            this.keyDown[event.keyCode] = true;
            break;
          case this.keys.shift:
            this.player.dash(this.orientation, this.orientations);
            break;

          default:
            break;
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case this.keys.up:
        case this.keys.down:
          this.keyDown[event.keyCode] = false;
          this.updateOrientation();
          break;

        case this.keys.left:
        case this.keys.right:
          this.keyDown[event.keyCode] = false;
          if (
            event.keyCode == this.keys.right &&
            this.keyDown[this.keys.left] == true
          ) {
            this.updateUnderlyingOrientation(this.keys.left);
          } else if (
            event.keyCode == this.keys.left &&
            this.keyDown[this.keys.right] == true
          ) {
            this.updateUnderlyingOrientation(this.keys.right);
          } else {
            this.player.stopHorizontal();
          }
          this.updateOrientation();
          break;
        case this.keys.jump:
          this.player.isJumping = false;
          this.keyDown[event.keyCode] = false;
          break;
        case this.keys.up:
            this.player.isJumping = false;
            this.keyDown[event.keyCode] = false;
            break;
        case this.keys.fire:
          this.fireBulletSwitch = 0;
          break;
        default:
          break;
      }
    });
}
}
