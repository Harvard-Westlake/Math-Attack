export default class StartButton{

constructor ()
{
  this.width = 60;
  this.height = 10;
  this.x = 570;
  this.y = 40;
}

draw (ctx)
{
  ctx.fillStyle = 'orange';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = this.width;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.strokeRect(this.x, this.y, this.width, this.height);
  ctx.font = "20px Georgia";
  ctx.fillText("Start Game", 550, 50);
}

}
