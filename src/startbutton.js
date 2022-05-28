export default class StartButton{

constructor ()
{
  this.width = 100;
  this.height = 75;
  this.x = 650;
  this.y = 150;
}

draw (ctx)
{
  ctx.fillStyle = 'orange';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = this.width;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.strokeRect(this.x, this.y, this.width, this.height);
  ctx.font = "20px Georgia";
  ctx.fillText("Start Game", 650, 185);
}

}
