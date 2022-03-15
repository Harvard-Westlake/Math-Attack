export default class Boss {

  constructor (bossHealth)
  {
    this.health = 100;//health as an integer percentage out of 100
    this.posX;//x position
    this.posY;//y position
    this.velX;//x velocity
    this.velY;//y velocity
    this.maxSpeed;//maximum speed
    this.healthBar = bossHealth;

    setInterval (this.updateHealthBar(), 10);//continuously ensures that health bar on screen is accurate to real health percentage
  }

  updateHealthBar()//updates the health bar displayed on screen
  {
    this.healthBar.setHealthPercent(this.health);
  }

  setHealth(damage) //sets Health to a new percentage if it has changed
  {
    this.health = this.health - damage;
  }
}
