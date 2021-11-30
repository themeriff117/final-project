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

        //this.load.spritesheet('player', 'assets/cozyfarm/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('player', 'assets/Hobbit/HobbitRunOnlyPublished.png', { frameWidth: 20, frameHeight: 20, margin: 1, spacing: 1 });

        //NPC quest giver
        this.load.spritesheet('npc', 'assets/Idle (38x28).png', { frameWidth: 20, frameHeight: 20, margin: 8, spacing: 6 });

        //Apple
        this.load.image('apple', 'assets/rpgitemspack/Item__64.png');

        //load dialog plugin
        this.load.plugin('DialogModalPlugin', 'js/dialog_plugin.js');
    },

    create: function ()
    {
        this.scene.start('WorldScene');

        this.sys.install('DialogModalPlugin');
        console.log(this.sys.dialogModal);
        this.sys.dialogModal.init();
        this.sys.dialogModal.setText('Hi there!', true);
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

        //NPC
        this.npc = this.physics.add.sprite(230, 210, 'npc', 6);

        //this.physics.add.collider(this.player, this.npc); //pushes npc off screen
        //this.physics.add.overlap(this.player, this.npc, false); //player phases through npc

////////////
///////////
////////////
///////////
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
////////////
///////////
////////////
///////////

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






//PIZZA LEGENDS HELP!

class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
 }
  startGameLoop() {
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;
      //Update all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        })
      })
      //Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);
      //Draw Game Objects
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })
      //Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);
      requestAnimationFrame(() => {
        step();
      })
    }
    step();
 }
 bindActionInput() {
   new KeyPressListener("Enter", () => {
     //Is there a person here to talk to?
     this.map.checkForActionCutscene()
   })
 }
 bindHeroPositionCheck() {
   document.addEventListener("PersonWalkingComplete", e => {
     if (e.detail.whoId === "hero") {
       //Hero's position has changed
       this.map.checkForFootstepCutscene()
     }
   })
 }
 startMap(mapConfig) {
  this.map = new OverworldMap(mapConfig);
  this.map.overworld = this;
  this.map.mountObjects();
 }
 init() {
  this.startMap(window.OverworldMaps.DemoRoom);
  this.bindActionInput();
  this.bindHeroPositionCheck();
  this.directionInput = new DirectionInput();
  this.directionInput.init();
  this.startGameLoop();

/*
  this.map.startCutscene{[
    { type: "textMessage", text: "HI!"}
  ]}
*/

  }
} //end Overworld.js

//PizzaRPG Part 9 - TEXT MESSAGE CLASS
class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
  }
  createElement() {
    //Create the element
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");
    this.element.innerHTML = (`
      <p class="TextMessage_p">${this.text}</p>
      <button class="TextMessage_button">Next</button>
    `)
    this.element.querySelector("button").addEventListener("click", () => {
      //Close the text message
      this.done();
    });
    this.actionListener = new KeyPressListener("Enter", () => {
      this.actionListener.unbind();
      this.done();
    })
  }
  done() {
    this.element.remove();
    this.onComplete();
  }
  init(container) {
    this.createElement();
    container.appendChild(this.element)
  }
} //end TextMessage.js

class OverworldEvent {
textMessage(resolve) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
    }
    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    })
    message.init( document.querySelector(".game-container") )
  }
  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }
} //end OverworldEvent
