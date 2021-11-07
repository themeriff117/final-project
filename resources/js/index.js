//NOTES FROM 'COMPLETE COURSE - PHASER 101 IN 1 HOUR'
//aka game.js

//create a new scene
let gameScene = new Phaser.Scene('Game');

//load assets
gameScene.preload = funcation() {
  //load images
  this.load.image('background', 'assets/')
}

//set the configuration of  the game
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};
//create a new game, pass the configuration
let game = new Phaser.Game(config);
