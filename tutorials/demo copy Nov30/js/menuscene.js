export default class MenuScene extends Phaser.Scene {
  preload()
	{
		const fonts = new WebFontFile(this.load, 'Righteous');
		this.load.addFile(fonts);
	}

  constructor()
  {
    super('menu-screen');
  }
  create(data: { title: string})
  {
    const { width, height } = this.scale;
    this.add.text(width * 0.5, height = 0.5, data.title,
  {
      //const x = this.scale.width * 0.5
  		//const y = this.scale.height * 0.5

  		this.add.text(x, y, 'The Farm of Heroes',
      {
  			fontFamily: 'Righteous',
  			fontSize: '48px',
  			color: '#50E3C2',
  			backgroundColor: '#00000000',
  			fontStyle: 'normal',
  			stroke: '#00000000',
  			shadow: { color: '#000000', fill: true, blur: 12; }
      }
    })
    .setOrigin(0.5, 0.5);
}
}
