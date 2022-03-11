export default class BossWeapon{

  constructor(range,melee,damage){
    this.range = range;
    this.melee = melee;
    this.damage = damage;
  }
  getRange(){
    return this.range;
  }
  getMelee(){
    return this.melee;
  }

  getDamage(){
    return this.damage;
  }

}
