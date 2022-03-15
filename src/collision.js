export default class collision{

  constructor(obj, obj2)
  {
    this.obj = {
      x : 5,
      y : 8,
      height : 2,
      width : 4;
    };

    this.obj2 = {
      x : 7,
      y : 5,
      height : 3,
      width : 2;
    };
  }

  checkForCollision()
  {
    let xCollision = false;
    let xWindow1 = this.obj.x + this.obj.width;
    let xWindow2 = thisobj2.x + this.obj2.width;
    if (this.obj2.x > this.obj.x && this.obj2.x < this.xWindow1)
    {
      this.xCollision = true;
    }
    if (this.xWindow2 > this.obj.x && this.xWindow2 < this.xWindow1)
    {
      this.xCollision = true;
    }

    let yCollision = false;
    let yWindow1 = this.obj.y + this.obj.height;
    let yWindow2 = thisobj2.y + this.obj2.height;
    if (this.obj2.y > this.obj.y && this.obj2.y < this.yWindow1)
    {
      this.yCollision = true;
    }
    if (this.yWindow2 > this.obj.y && this.yWindow2 < this.yWindow1)
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
