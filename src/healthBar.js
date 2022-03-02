export class HealthBar{
constructor(posX, posY,width, height){
  this.width = width;
  this.height = height;
  this.position = {
    x:posX,
    y:posY,
  };
  this.healthPercent = 100;
}

setHealthPercent(latestHealthPct) {
  this.healthPercent = latestHealthPct;
}

// Draws three rectangles
  // Border
  // Background
  // Health
  draw(ctx){
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 3;
    ctx.fillRect(this.position.x, this.position.y, this.width, .this.height);
    ctx.strokeRect(this.position.x, this.position.y, this.width, .this.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(this.position.x+1, this.position.y+1, this.width-2, this.height-2);
  }
}

const hb = new HealthBar(5,5, 100, 40);
hb.setHealthPercent(75);
