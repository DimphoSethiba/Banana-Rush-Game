  class startlevel extends Phaser.Scene{
    constructor(){
      super({key:"startlevel"});
    }

    preload(){


    }

    create(){
      var testText = this.add.text(100,250,'Click to start the game.',{
        fontSize: '32px',
        fill: '#FFF'
      });

      testText.setInteractive();
      testText.on('pointerdown',startPlay);

    }

    update(delta){

    }

  }

  function startPlay() {
    game.scene.stop('startlevel');
    game.scene.start('level1');
  }
