import { CST } from "../CST";
export class LoadScene extends Phaser.Scene {
    constructor()
    {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init()
    {
    }

    loadImages()
    {
      this.load.image('assets/rose-desktop-small.png');
    }

    preload()
    {
      this.loadImages();

      let loadingBar = this.add.graphics({
          fillStyle: {
              color: 0xffffff //white
          }
      })

      this.load.on("progress", (percent: number) => {
          loadingBar.fillRect(this.game.renderer.width / 2, 0, 50, this.game.renderer.height * percent);
          console.log(percent);
      })

      this.load.on("complete", () => {
          //this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
      });

      this.load.on("load", (file: Phaser.Loader.File) => {
          console.log(file.src)
      })
  }

  create()
  {
      this.scene.start(CST.SCENES.MENU);
  }

}
