import BossBullet from '/src/bossBullet.js'
import HealthBar from '/src/HealthBar.js'


export default class Boss{

  constructor (bossHealth, player, gameWidth, gameHeight, weapon)
  {
    this.player=player;
    this.gameWidth=gameWidth;
    this.gameHeight=gameHeight;

    this.health = bossHealth; // Health is a certain amount of HP
    this.healthMax = bossHealth;
    this.healthPct = 100; // Integer out of 100
    this.weapon = weapon; //health as an integer percentage out of 100
    this.position = {
      x:930,
      y:gameHeight - 60,
    };//x and y position
    this.height = 50;
    this.width = 50;
    this.velocity = {
      x:0,
      y:0,
    }
    this.maxSpeed;//maximum speed
    this.bossBullets = [];

    // When the boss dies, we need a few variables for death animation
    this.death = {
      isDead : false,
      timeDied : null,
      msOfDeathAnimationLength : 3000, // Settings for displaying boss killed
      msUntilStartNextRoundAfterDeath : 5000,  // Triggers
      msUntilBossDefeatedTextDisplayStart : 0  // Maybe we want 'Boss Defeated' to show after death animation
    };

    this.BossImage = new Image();
    this.BossImage.src = "/images/theissmad.png";
    this.spriteWidth = 630; //this is the width of one frame of our animation in our spritesheet
    this.spriteHeight = 951;

    // Create Health Bar
    // To Use call healthBar.setHealthPercent(SOME_NUMBER);
    const HEALTH_BAR_WIDTH = 200;
    let healthBarWidthPct = 15;
    let healthBarHeightPct = 5;
    this.healthBar = new HealthBar(2, 2, healthBarWidthPct, healthBarHeightPct, this.gameWidth,this.gameHeight);

  /*  setInterval (this.updateHealthBar, 10);*///continuously ensures that health bar on screen is accurate to real health percentage
  }

  resetBoss(){
    this.health = this.healthMax; // Health is a certain amount of HP
    this.healthPct = 100; // Integer out of 100
    this.updateHealthBar();
    this.weapon = this.weapon; //health as an integer percentage out of 100
    this.position = {
      x:930,
      y:this.gameHeight - 60,
    };//x and y position
    this.velocity = {
      x:0,
      y:0,
    }
    this.maxSpeed;//maximum speed
    this.bossBullets = [];
  }

  updateHealthBar()//updates the health bar displayed on screen
  {
    this.healthBar.setHealthPercent(this.healthPct);
  }


  takeDamage(damage)
  {
    this.health = this.health - damage/10;
    this.healthPct = Math.round((this.health / this.healthMax) * 100);
    this.updateHealthBar();

    // If the boss dies we
    // 1:Flag As Dead,
    //  Do things depending on flag like..  Show Death Animation, Move To Next Boss
    if (this.health <= 0) {
      this.death.isDead = true;
      this.death.timeDied = new Date().getTime();
    }
  }

  projectileAttack(){
    //console.log('boss attack');
    if (this.death.isDead != true) {
      this.Xdiff=this.position.x-this.player.position.x;
      this.Ydiff=this.position.y-this.player.position.y;

      this.bossBullets.push(new BossBullet(this.position.x,this.position.y, this.Xdiff, this.Ydiff, this.gameWidth, this.gameHeight, this.player));
    }
  }

  draw(ctx){
    this.healthBar.draw(ctx);
    ctx.drawImage(this.BossImage, 0, 0, this.spriteWidth, this.spriteHeight,this.position.x, this.position.y, this.width,this.height);

  }

  update(deltaTime){
    if(!deltaTime)return;
    for(let i = 0;i<this.bossBullets.length;i++)
    {
      if(this.bossBullets[i].needsDelete)
      {
        this.bossBullets.splice(i,1);
        i--;
      }
    }
  }

  isDead() {
    return this.death.isDead;
  }

  handleDeath(gameClass, drawingContext) {
    let timeNow = new Date().getTime();
    let totalTimeDead = (timeNow - this.death.timeDied);
    // Render boss defeated text
    if (totalTimeDead > this.death.msUntilBossDefeatedTextDisplayStart) {
      // Render
      drawingContext.font = "80pt Calibri";
      drawingContext.fillStyle = "gray";
      drawingContext.fillText("Boss Defeated!", this.gameWidth/2-400, this.gameHeight/2 - 100);
      drawingContext.strokeStyle = "white";
      drawingContext.strokeText("Boss Defeated!", this.gameWidth/2-400, this.gameHeight/2 - 100);
    }

    // Call next boss and next level or store
    if (totalTimeDead > this.death.msUntilStartNextRoundAfterDeath) {
      gameClass.nextLevel();
    }
  }

}
//test gigalmao how the fuck did this happen
