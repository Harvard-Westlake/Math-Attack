export default class InputHandler{

  // Sets left or right view direction.  All other directions
  // are set in 'updateOrientation'
  updateUnderlyingOrientation(leftOrRight) {
    if (leftOrRight == this.keys.left) {
      this.underlyingOrientation = this.orientations.left;
    }
    if (leftOrRight == this.keys.right) {
      this.underlyingOrientation = this.orientations.right;
    }
    this.updateOrientation();
  }

  // Uses flags and underlyingOrientation to determine latest orientation
  // Can be called at any time and figures out the orientation based on
  // flag states
  updateOrientation() {
    switch (this.underlyingOrientation) {

      //
      case this.orientations.left:
        if (this.keyDown[this.keys.up]) {
          this.orientation = this.orientations.upLeft;
        } else if (this.keyDown[this.keys.down]) {
          this.orientation = this.orientations.downLeft;
        } else {
          this.orientation = this.orientations.left;
        }
        break;

      //
      case this.orientations.right:
        if (this.keyDown[this.keys.up]) {
          this.orientation = this.orientations.upRight;
        } else if (this.keyDown[this.keys.down]) {
          this.orientation = this.orientations.downRight;
        } else {
          this.orientation = this.orientations.right;
        }
        break;

      default:
        break;
    }
    console.log("Orientation:" + this.orientation);
  }

  constructor(player){
    this.player = player;
    // Kinda gross but
    this.orientations = {
      "upLeft" : "upLeft",
      "upRight" : "upRight",
      "up" : "up",
      "left" : "left",
      "right" : "right",
      "down" : "down",
      "downLeft" : "downLeft",
      "downRight" : "downRight"
    };
    this.underlyingOrientation = this.orientations.right;
    this.orientation = this.orientations.right;

    this.keys = {
      "left" : 37,
      "right" : 39,
      "up" : 38,
      "down" : 40,
      "shift" : 16,
      "space" : 32
    };
    this.keyDown = {
    };

    document.addEventListener('keydown', (event)=>{
      switch (event.keyCode) {

        // Arrow keys for orientation
        case this.keys.left:
        case this.keys.right:
          this.updateUnderlyingOrientation(event.keyCode);
          //this.move(event.keyCode);
          break;

        case this.keys.up:
        case this.keys.down:
          this.keyDown[event.keyCode] = true;
          this.updateOrientation();
          break;

        // Uses only jmp and shift
        case this.keys.jump:
        case this.keys.shift:
          //this.moveEvent(event.keyCode);
          break;

        default:
          break;
      }
    });

    document.addEventListener('keyup', (event)=>{
      switch (event.keyCode) {
        //case this.keys.shift:
          //this.player.dash();
          //break;

        case this.keys.up:
        case this.keys.down:
          this.keyDown[event.keyCode] = false;
          this.updateOrientation();
          break;

        default:
          break;
      }
    });
  }


}


  // Uncoment this out for testing
class Player {
  dash() {}
  jump() {}
  moveLeft() {}
  moveRight() {}
  stopHorizontal() {}
}

let input = new InputHandler(new Player);
document.addEventListener('keydown', (event)=>{
//console.log(event.keyCode);
});
