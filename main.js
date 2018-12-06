var config = {
  type: Phaser.AUTO,
  width:800,
  height:600,
  backgroundColor: "#93eaeb",
  physics: {
      default:'arcade',
      arcade: {
          gravity: 0
      }
  },
  scene:[startlevel, level1]
};

var game = new Phaser.Game(config);
