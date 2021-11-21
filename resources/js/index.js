//BOOTSCENE
var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

//CONFIG
var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true // set to true to view zones
        }
    },
    scene: [
        BootScene,
        SceneOne
    ]
};

var game = new Phaser.Game(config);

//PRELOAD
function preload ()
{
  // spritesheet of player
  //this.load.spritesheet('warrior', '../final-project/assets/Warrior/SpriteSheet/Warrior_Sheet-Effect.png');
  this.load.spritesheet('player', 'assets/HobbitSpriteSheetPublished.png', { frameWidth: 60, frameHeight: 60 , margin: 0, spacing: 0 });

  //full background from Tiled
  //this.load.tilemapTiledJSON('bkg', '../final-project/assets/full-bkg.json');

  //map tiles
  //this.load.image('tiles', '../final-project/assets/tiles');

  //background screenshot
  this.load.image('background', 'assets/townscreenshot.png');
}

//CREATE
function create ()
{
  this.scene.start('SceneOne');

}

//UPDATE
function update ()
{
}


//SCENE ONE
var SceneOne = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function SceneOne ()
    {
        Phaser.Scene.call(this, { key: 'SceneOne' });
    },

    create: function ()
    {
        //var map = this.make.tilemap({ key: 'bkg' });
        //var tiles = map.addTilesetImage('spritesheet', 'tiles');
        // creating the layers
        //var grass = map.createStaticLayer('Grass', tiles, 0, 0);
        //var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        //obstacles.setCollisionByExclusion([-1]);
        this.add.image(400, 300, 'background');

//PLAYER KEY MOVEMENT
this.anims.create({
  key: "left",
  framesL this.anims.generateFrameNumbers('player', {start: 0, end: 0}),
  //frames: this.anims.generateFrameNumbers('player', { frames: [63, 64, 65, 66]}),
  //frameRate: 10,
  repeat: -1
});
this.anims.create({
  key: "right",
  framesL this.anims.generateFrameNumbers('player', {start: 2, end: 2}),
});
this.anims.create({
  key: "up",
  framesL this.anims.generateFrameNumbers('player', {start: 3, end: 3}),
});
this.anims.create({
  key: "down",
  framesL this.anims.generateFrameNumbers('player', {start: 1, end: 1}),
  repeat: -1
});

//PLAYER RULES
this.player = this.physics.add.sprite(50, 100, 'player', 6);
//?What method is this supposed to be in?
player.setCollideWorldBounds(true);
cursors = this.input.keyboard.createCursorKeys();
this.physics.world.bounds.width = map.widthInPixels;
this.physics.world.bounds.height = map.heightInPixels;
//haven't added obstacles yet:
//this.physics.add.collider(this.player, obstacles);

//CAMERA RULES
this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
this.cameras.main.startFollow(this.player);
this.cameras.main.roundPixels = true;

}
