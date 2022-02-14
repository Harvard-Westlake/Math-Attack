export default class InputHandler{

  constructor(player){
    this.keys = {
      "shift" : 16,
      "left" : 37,
      "right" : 39,
      "z" : 90
    };
    this.keyDown = {
      shift : null
    }
    document.addEventListener('keydown', (event)=>{

      switch (event.keyCode) {
        case keys.shift:
          this.keyDown.shift = true;
          player.dash();
          break;

        case keys.left:
          player.moveLeft();
          break;

        case keys.right:
          player.moveRight();
          break;

        case keys.jump:
          player.jump();
          break;

        default:
          break;
      }
    });
    document.addEventListener('keyup', (event)=>{
      switch (event.keyCode) {
        case keys.shift:
          this.keyDown.shift = false;
          player.dash();
          break;

        case keys.left:
        case keys.right:
          player.stopHorizontal();
          break;

        default:
          break;
      }
      if(event.keyCode==37)//left
      {
        if(player.velX<0)
        {
          player.stopHorizontal();
        }
      }
      if(event.keyCode==39)//right
      {
        if(player.velX>0)
        {
          player.stopHorizontal();
        }
      }
    });
  }
}

let input = new InputHandler(null);
document.addEventListener('keydown', (event)=>{
console.log(event.keyCode);
});
