export default class Collision{

  constructor(obj, obj2)
  {
    this.obj = {
      x : 5,
      y : 8,
      height : 2,
      width : 4
    };

    this.obj2 = {
      x : 7,
      y : 5,
      height : 3,
      width : 2
    };
  }

  formatPlayerPositionAndSize(player) {
    return {
      x: player.position.x,
      y: player.position.y,
      height: player.height,
      width: player.width
    }
  }

  formatBulletPositionAndSize(bullet) {
    return {
      x: bullet.position.x,
      y: bullet.position.y,
      height: bullet.height,
      width: bullet.width
    }
  }

  checkForCollision(a, b)
  {
    this.obj = a;
    this.obj2 = b;
    this.xCollision = false;
    this.xWindow1 = this.obj.x + this.obj.width;
    this.xWindow2 = this.obj2.x + this.obj2.width;
    if (this.obj2.x >= this.obj.x && this.obj2.x <= this.xWindow1)
    {
      this.xCollision = true;
    }
    if (this.xWindow2 >= this.obj.x && this.xWindow2 <= this.xWindow1)
    {
      this.xCollision = true;
    }
    
    this.yCollision = false;
    this.yWindow1 = this.obj.y + this.obj.height;
    this.yWindow2 = this.obj2.y + this.obj2.height;
    if ((this.obj.y <= this.yWindow2 && this.obj.y >= this.obj2.y)  ||      // Is top of object 1 within object 2
        (this.yWindow1 <= this.yWindow2  && this.yWindow1 >= this.obj2.y))   // or Is bottom of object 1 within object 2
    {
      this.yCollision = true;
    }

    if (this.xCollision == true && this.yCollision == true)
    {
      return true;
    }
    return false;
  }

}
