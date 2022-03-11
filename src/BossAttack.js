class BossAttack
{
  constructor (Player protagonist, Boss antagonist)
  {

    this.isHit = false;
    this.direction;
  }
  function setDirection ()
  {
    if ((Math.sign(antagonist.player.x - protagonist.player.x)) > 0)
    {
      this.direction  == "left";
    }
    else {
      this.direction == "right";
    }
  }


}
