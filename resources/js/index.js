//NOTES FROM 'COMPLETE COURSE - PHASER 101 IN 1 HOUR'
//aka game.js

//create a new scene
let gameScene = new Phaser.Scene('Game');

//load assets
gameScene.preload = function() {
  //load images
  this.load.image('background', 'assets/generic-rpg-pack/rpg-pack/tiles/generic-rpg-Slice.png');
  this.load.spritesheet('warrior', 'assets/Warrior/SpriteSheet/Warrior_Sheet-Effect.png');
}

gameScene.create = funcation() {
  //this.add.image(100, 100, 'background');
  this.add.sprite(0, 0, 'background');

  bg.setOrigin(0, 0);
}

//set the configuration of  the game
let config = {
  type: Phaser.AUTO,
  width: 100,
  height: 100,
  scene: gameScene
};
//create a new game, pass the configuration
let game = new Phaser.Game(config);
