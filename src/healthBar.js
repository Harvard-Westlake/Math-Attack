export default class HealthBar{
constructor(posX, posY, pctWidth, pctHeight){
  this.pctHeight = pctHeight;
  this.pctWidth = pctWidth;

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
  this.height = (Math.round(window.innerHeight/100) * this.pctHeight);
}
updateWidth() {
  this.width = (Math.round(window.innerWidth/100) * this.pctWidth);
}

determineLineWidth() {
  if (window.innerHeight < 300 || window.innerWidth < 500) {
    return 1;
  } else if (window.innerHeight < 600 || window.innerWidth < 1200) {
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
    ctx.lineWidth = this.determineLineWidth();
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);

    if (this.healthPercent != 0) {
      ctx.fillStyle = this.determineColor();
      ctx.fillRect(this.position.x+1, this.position.y+1, this.determineWidth(), this.height-2);
    }
  }
}
