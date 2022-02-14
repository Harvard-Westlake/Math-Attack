export default class InputHandler{

  constructor(player){
    document.addEventListener('keydown', (event)=>{
      //alert(event.keyCode);
      if(event.keyCode==16)//shift
      {
        player.dash();
      }

      if(event.keyCode==37)//left
      {
        player.moveLeft();
      }
      if(event.keyCode==39)//right
      {
        player.moveRight();
      }
      if(event.keyCode==90)//z
      {
        player.jump();
      }



    });
    document.addEventListener('keyup', (event)=>{

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
