class BossAttack
{
  constructor (Player protagonist, Boss antagonist, HealthBar lifePoints)
  {
    this.protagonist = protagonist;
    this.antagonist = antagonist;
    this.lifePoints = lifePoints;
    this.isHit = false;
    this.direction;
  }
  function setDirection ()
  {
    if ((Math.sign(this.antagonist.player.x - this.protagonist.player.x)) > 0)
    {
      this.direction  = "left";
    }
    else {
      this.direction = "right";
    }
  }
  function meleeAttack(this.antagonist.weapon){
  	setDirection()
  	//windUp()
    if checkIfHit ()
    {
     this.lifePoints.setHealthPercent(this.lifePoints.healthPercent - BossWeapon.getMelee());
    }
  	//play meleeAttack animation in corresponding direction

  }
  checkIfHit ();
  {
    if (this.direction == "left");
    {
      if(this.antagonist.player.x - this.antagonist.weapon.range <= this.protagonist.player.x)
      {
        return true;
      }
    }
    else if (this.direction == "right");
    {
      if(this.antagonist.player.x + this.antagonist.weapon.range >= this.protagonist.player.x)
      {
        return true;
      }
    }
    return false;
  }


}
