//import MenuScene from 'js/menuscene.js'

var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {
        // map tiles
        //this.load.image('tiles', 'assets/map/spritesheet.png');
        this.load.image('tiles', 'assets/cozyfarm/free.png');

        // map in json format
        //this.load.tilemapTiledJSON('map', 'assets/map/map.json');
        this.load.tilemapTiledJSON('map', 'assets/cozyfarm/mycozyfarm.json');

        // our two characters
        //this.load.spritesheet('player', 'assets/cozyfarm/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('player', 'assets/Hobbit/HobbitRunOnlyPublished.png', { frameWidth: 20, frameHeight: 20, margin: 1, spacing: 1 });

        //NPC quest giver
        this.load.spritesheet('npc', 'assets/Idle (38x28).png', { frameWidth: 20, frameHeight: 20, margin: 8, spacing: 6 });

        //Apple
        this.load.image('apple', 'assets/rpgitemspack/Item__64.png');
    },

    create: function ()
    {
        this.scene.start('WorldScene');
    }
}); //end BootScene

var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },

    preload: function ()
    {

    },

    create: function ()
    {

        // create the map
        var map = this.make.tilemap({ key: 'map' });

        // first parameter is the name of the tilemap in tiled
        var tiles = map.addTilesetImage('cozyassets', 'tiles');
        //Wants name given on Tiled

        // creating the layers
        var grass = map.createStaticLayer('Ground', tiles, 0, 0);
        //Wants Tiled layer names
        var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

        // make all tiles in obstacles collidable
        obstacles.setCollisionByExclusion([-1]);

        //npc.anims.play("spin"); //idle

        //Player movement
        this.anims.create({
            key: 'left',
            //frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            //frames: this.anims.generateFrameNumbers('player', { frames: [63, 64, 65, 66]}),
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            //frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            //frames: this.anims.generateFrameNumbers('player', { frames: [63, 64, 65, 66]}),
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            //frames: this.anims.generateFrameNumbers('player', { frames: [63, 64, 65, 66]}),
            //frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            //frames: this.anims.generateFrameNumbers('player', { frames: [63, 64, 65, 66]}),
            //frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });

        // our player sprite created through the phsics system
        this.player = this.physics.add.sprite(50, 100, 'player', 6);

        //NPC PHYSICS
        this.npc = this.physics.add.sprite(230, 210, 'npc', 6);

        //this.physics.add.collider(this.player, this.npc); //pushes npc off screen
        //this.physics.add.overlap(this.player, this.npc, false); //player phases through npc






        // don't go out of the map
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        // don't walk on trees
        this.physics.add.collider(this.player, obstacles);

        // limit camera to map
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true; // avoid tile bleed

        // user input
        this.cursors = this.input.keyboard.createCursorKeys();

        // where the enemies will be
        //WIll break game if commented out!
        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for(var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);
        }


        // add collider
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    },
    onMeetEnemy: function(player, zone) {
        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

        // start battle
    },
    update: function (time, delta)
    {
    //    this.controls.update(delta);

        this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        }

        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        }

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }

    }

}); //end WorldScene

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
        WorldScene
        //MenuScene
    ]
}; //end config

//import { config } from './config.js'

var game = new Phaser.Game(config);
