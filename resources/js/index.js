//NOTES FROM 'COMPLETE COURSE - PHASER 101 IN 1 HOUR'
//aka game.js

//create a new scene
let gameScene = new Phaser.Scene('Game');

//load assets
gameScene.preload = function() {
  //load images
  //this.load.image('background', 'assets/generic-rpg-pack/rpg-pack/tiles/generic-rpg-Slice.png');
  this.load.spritesheet('warrior', '../final-project/assets/Warrior/SpriteSheet/Warrior_Sheet-Effect.png');
  this.load.image("bkg-tiles",  '../final-project/assets/generic-rpg-pack/rpg-pack/tiles');
}

gameScene.create = function() {
  //this.add.image(100, 100, 'background');
  this.add.sprite(0, 0, 'background');

  bg.setOrigin(0, 0);
  bg.setPosition(50, 50);
  let gameWidth = this.sys.game.config.width;
  let gameHeight = this.sys.game.config.height;
  console.log(gameWidth, gameHeight);
  console.log(bg);
  console.log(this);
}

gameScene.update = function() {

}

//set the configuration of  the game
let config = {
  type: Phaser.AUTO,
  width: 100,
  height: 100,
  scene: gameScene;

  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
    update: update
  }

};
//create a new game, pass the configuration
let game = new Phaser.Game(config);
