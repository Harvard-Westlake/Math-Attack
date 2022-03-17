export default class HealthBar{
constructor(posX, posY, pctWidth, pctHeight, gameWidth, gameHeight){
  this.pctHeight = pctHeight;
  this.pctWidth = pctWidth;
  this.gameWidth = gameWidth;
  this.gameHeight = gameHeight;

  this.updateHeight(this.pctHeight);
  this.updateWidth(this.pctWidth);
  this.position = {
    x:posX,
    y:posY,
  };
  this.healthPercent = 100;
}

setHealthPercent(latestHealthPct) {
  if (latestHealthPct < 0) {
    latestHealthPct = 0;
  }
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

updateHeight() {
  this.height = (Math.round(this.gameHeight/100) * this.pctHeight);
}
updateWidth() {
  this.width = (Math.round(this.gameWidth/100) * this.pctWidth);
}

determineLineWidth() {
  if (this.gameHeight < 300 || this.gameWidth < 500) {
    return 1;
  } else if (this.gameHeight < 600 || this.gameWidth < 1200) {
    return 2;
  }
  return 3;
}
// Draws three rectangles
  // Border
  // Background
  // Health
  draw(ctx){
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'gray';
    let lineWidth = this.determineLineWidth();
    let lineWidthOffset = (this.gameWidth - (this.width + (2*lineWidth) + this.position.x));
    ctx.lineWidth = lineWidth;
    ctx.fillRect(this.position.x + lineWidthOffset, this.position.y, this.width, this.height);
    ctx.strokeRect(this.position.x + lineWidthOffset, this.position.y, this.width, this.height);

    if (this.healthPercent != 0) {
      ctx.fillStyle = this.determineColor();
      ctx.fillRect(this.position.x + lineWidthOffset+1, this.position.y+1, this.determineWidth(), this.height-2);
    }
  }
}
