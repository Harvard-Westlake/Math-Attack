export default class HealthBar{
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

determineColor() {
  if (this.healthPercent > 70) {
    return 'green';
  } else if (this.healthPercent > 40) {
    return 'yellow';
  } else if (this.healthPercent > 20) {
    return 'orange';
  } else {
    return 'red';
  }
}

determineWidth() {
  return this.width * (this.healthPercent / 100) - 2;
}

// Draws three rectangles
  // Border
  // Background
  // Health
  draw(ctx){
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 3;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = this.determineColor();
    ctx.fillRect(this.position.x+1, this.position.y+1, this.determineWidth(), this.height-2);
  }
}
