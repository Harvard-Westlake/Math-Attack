export default class BossWeapon{

  constructor(range,melee,damage){
    this.range = range;
    this.melee = melee;
    this.damage = damage;
  }
  // returns boolean true if range false otherwise
  getRange(){
    return this.range;
  }
  // returns boolean true if melee false otherwise
  getMelee(){
    return this.melee;
  }
  //
  getDamage(){
    return this.damage;
  }

}
