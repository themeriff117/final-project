import Phaser from 'phaser';

let gameScene = new Phaser.Scene('Game');

gameScene.preload = function() {
  this.load.spritesheet('warrior', '../final-project/assets/Warrior/SpriteSheet/Warrior_Sheet-Effect.png');
  //player = this.physics.add.sprite(32, 32, "warrior");
  this.load.image('bkg-tiles', '../final-project/assets/full-bkg.json');
}

gameScene.create = function() {
  //this.add.image(100, 100, 'background');
  this.add.sprite(0, 0, 'bkg-tiles');

  bg.setOrigin(0, 0);
  bg.setPosition(50, 50);
  let gameWidth = this.sys.game.config.width;
  let gameHeight = this.sys.game.config.height;
  console.log(gameWidth, gameHeight);
  console.log(bg);
  console.log(this);

  this.anims.create({
    key: "left",
    framesL this.anims.generateFrameNumbers('warrior', {start: 0, end: 0}),
    repeat: -1
  });
  this.anims.create({
    key: "right",
    framesL this.anims.generateFrameNumbers('warrior', {start: 2, end: 2}),
  });
  this.anims.create({
    key: "up",
    framesL this.anims.generateFrameNumbers('warrior', {start: 3, end: 3}),
  });
  this.anims.create({
    key: "down",
    framesL this.anims.generateFrameNumbers('warrior', {start: 1, end: 1}),
    repeat: -1
  });

  player.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();
}

gameScene.update = function() {

}

let config = {
  type: Phaser.AUTO,
  width: 100,
  height: 100,
  scene: gameScene,
  //pixelArt: true,

  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
    update: update
  }

};
let game = new Phaser.Game(config);
