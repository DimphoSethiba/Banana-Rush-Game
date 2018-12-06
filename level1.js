// declare variable
let player;
let enemy;

let bananaGroup;
let txtPlayerLife;
let txtBananaCollected;

let currentBanana = 0;
let allBananas  = 20;

let playerLives = 0;
let playerHealth = 100;
let arrowControls;

let gameOver = false;
let gameWon = false;

class level1 extends Phaser.Scene{
    constructor(){
      super({key:"level1"});
    }

    preload(){

     this.load.image('player','assets/lady.png');
     this.load.image('banana','assets/banana.png');
     this.load.image('monkey','assets/monkey.png');

    }

    create(){
      //declare arrow keys as player controller
      arrowControls = this.input.keyboard.createCursorKeys();

      player = this.physics.add.image(400, 300, 'player');
      player.setScale(0.25);

      enemy = this.physics.add.image(100,100,'monkey');
      enemy.setScale(0.25);

      this.physics.world.enable([enemy]);

      enemy.body.setVelocity(100, 200).setBounce(1,1).setCollideWorldBounds(true);

      player.setCollideWorldBounds(true);

      bananaGroup = this.physics.add.staticGroup({
        key: 'banana',
        frameQuantity:20,
        immovable: true
      });

      let bananaChildren = bananaGroup.getChildren();

      for(let a = 0; a < bananaChildren.length; a++){
          //declare the co-ordinate ,set the min and max of  y and x
          let x = Phaser.Math.Between(50,790);
          let y = Phaser.Math.Between(50,550);
          bananaChildren[a].setPosition(x,y);
        }

      bananaGroup.refresh();

      //display the banana playerCollected and player's lives
      txtBananaCollected = this.add.text(10, 10, 'Level 1', { font: '16px Courier', fill: '#000000' });
      txtBananaCollected = this.add.text(10, 30, 'Bananas Collected: 0', { font: '16px Courier', fill: '#000000' });
      txtPlayerLife = this.add.text(10, 50, 'Player Health: 3', { font: '16px Courier', fill: '#000000' });
      gameOver = this.add.text(250, 300, ' ', { font: '50px Courier', fill: '#000000' });
      gameWon = this.add.text(80, 300, ' ', { font: '50px Courier', fill: '#000000' });



    this.physics.add.overlap(player,bananaGroup,playerCollectsBananas,null,this);

    this.physics.add.collider(player,enemy,playerEnemyCol,null,this);
  }

    update(){

    txtBananaCollected.setText('Bananas Collected: ' + currentBanana);
    txtPlayerLife.setText('Player Health: ' + playerHealth);

      if (arrowControls.left.isDown)
      {
          player.setVelocityX(-200);
      }
      else if (arrowControls.right.isDown)
      {
          player.setVelocityX(200);
      }

      if (arrowControls.up.isDown)
      {
          player.setVelocityY(-200);
      }
      else if (arrowControls.down.isDown)
      {
          player.setVelocityY(200);
      }
  }

  /*if(currentBanana == 20  && playerHealth > 0)
    {
       console.log("collide");
       this.physics.pause();
       currentBanana = 20;

       //player.setTint(0xff0000);
       gameOver.setText('You have won');
      // gameOver = true;
    }*/


}



function playerCollectsBananas(player, banana){
  //destory banana
    bananaGroup.killAndHide(banana);

  //disable body of the destoried banana
    banana.body.enable  = false;

    currentBanana = Phaser.Math.MaxAdd(currentBanana, 1, allBananas);

    if(currentBanana == 20 && playerHealth > 0){
        this.physics.pause();
        gameWon.setText('You have won level 1!');
        gameWon = true; 
    }
   

}

 function playerEnemyCol(player, enemy){
   console.log("collide");
   this.physics.pause();
   playerHealth = 0;

   player.setTint(0xff0000);
   gameOver.setText('Game Over');
   gameOver = true; 

   

}
