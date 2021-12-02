var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
        this.npcFound = false;
        this.pigFound = false;
        this.appleFound = false;
    },

    preload: function ()
    {
        //map tiles
        //this.load.image('tiles', 'assets/map/spritesheet.png');
        this.load.image('tiles', 'assets/cozyfarm/free.png');

        // map in json format
        //this.load.tilemapTiledJSON('map', 'assets/cozyfarm/mycozyfarm.json');
        this.load.tilemapTiledJSON('map', 'assets/cozyfarm/farm3part4.json');

        //this.load.spritesheet('player', 'assets/cozyfarm/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('player', 'assets/Hobbit/HobbitRunOnlyPublished.png', { frameWidth: 20, frameHeight: 20, margin: 1, spacing: 1 });

        //NPC quest giver
        //this.load.spritesheet('npc', 'assets/KingPig/Idle (38x28).png', { frameWidth: 20, frameHeight: 20, margin: 8, spacing: 6 });
        this.load.spritesheet('npc', 'assets/KingPig/Idle (38x28).png', { frameWidth: 38, frameHeight: 28, margin: 0, spacing: 0 });

        //mean/other pig
        this.load.spritesheet('otherpig', 'assets/Pig/Idle (34x28).png', { frameWidth: 34, frameHeight: 28, margin: 0, spacing: 0 })

        //Apple
        this.load.image('apple', 'assets/rpgitemspack/Item__64.png');

    }, //end preload?

    foundNpc : function(player, npc){
        console.log('Found Npc');
        txtX = npc.x -40;
        txtY = npc.y -20;
        if ( this.npcFound == false){
            this.npcFound = true;
            this.scoreTextNpc   = this.add.text(txtX ,txtY, 'YOU! FIND MY APPLE!', { fontSize: '8px', fill: 'white' });
            appleX = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            appleY  = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            this.apple = this.physics.add.sprite(appleX, appleY, 'apple');
            this.physics.add.overlap(this.player, this.apple, this.foundApple, false, this);
            //this.timer=setInterval(this.moveApple, 5000);
        }
    },

    foundOtherpig : function(player, otherpig) {
        console.log('Found Otherpig');
        txtX = otherpig.x -60;
        txtY = otherpig.y -20;
        if (this.pigFound == false) {
          this.pigFound = true;
          this.TextPig  = this.add.text(txtX ,txtY, 'Press SPACE to move apple!', { fontSize: '8px', fill: 'white' });
        }
    },

    foundApple : function(player, apple){
        console.log('Found Apple');
        txtX = apple.x -20;
        txtY = apple.y -20;
        if (this.appleFound == false && this.npcFound == true)
        {
            this.appleFound = true;
           // this.scoreTextApple   = this.add.text(txtX ,txtY, 'You found the Apple', { fontSize: '8px', fill: '#000' });
            this.scoreTextNpc.setText('You found my apple! YIPPEE!!');
            this.scoreTextNpc.setColor("white");
            //clearInterval(this.timer);
        }
    },

    //Trying to have the apple move in random spots around the map
      //every few seconds
    moveApple : function() {
      console.log('Move Apple');
      console.log(this.apple.x);
      console.log(this.apple.y);
      this.apple.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      this.apple.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
},

    create: function ()
    {
        //game.time.events.add(Phaser.Timer.SECOND * 4, timerApple, this);

        // create the map
        var map = this.make.tilemap({ key: 'map' });

        // first parameter is the name of the tilemap in tiled
        //var tiles = map.addTilesetImage('cozyassets', 'tiles');
        //Wants name given on Tiled
        var tiles = map.addTilesetImage('free', 'tiles');

        // creating the layers
        var grass = map.createStaticLayer('Ground', tiles, 0, 0);
        //Wants Tiled layer names
        var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

        // make all tiles in obstacles collidable
        obstacles.setCollisionByExclusion([-1]);

        // don't go out of the map
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;

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
        this.player.setCollideWorldBounds(true);
                // don't walk on trees
        this.physics.add.collider(this.player, obstacles);

        //NPC
        this.npc = this.physics.add.sprite(230, 210, 'npc', 6);

        this.otherpig = this.physics.add.sprite(400, 400, 'otherpig', 6);

        //npc idle animation:
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('npc', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}),
            //frames: this.anims.generateFrameNumbers('npc', {start: 0, end:11}),
            frameRate: 10,
            repeat: -1
        });
        this.npc.anims.play('idle');

        //otherpig walk around animation
        //all I want is otherpig to walk to point A then point B in a loop

        this.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers('otherpig', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}),
            frameRate: 20,
            repeat: -1
        });
        this.otherpig.anims.play('idle2');


        // what happens when player and npc hit
        this.physics.add.overlap(this.player, this.npc, this.foundNpc, false, this);
        this.physics.add.overlap(this.player, this.otherpig, this.foundOtherpig, false, this);

        // limit camera to map
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true; // avoid tile bleed

        // user input
        this.cursors = this.input.keyboard.createCursorKeys();
    }, //end create

/*
    function timerApple() {
    game.add.tween(picture).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    moveApple();
}
*/

    update: function (time, delta)
    {

      if (this.cursors.space.isDown) {
         this.moveApple();
        }

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
    } //end update
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
            debug: false // set to true to view zones
        }
    },
    scene: [
        WorldScene
    ]
}; //end config

var game = new Phaser.Game(config);
