var gameOverState = { }

gameOverState.preload = function() {
    game.load.image("space-bg", "assets/images/space-bg.jpg");
    game.load.audio("gameover", "assets/music/gameover.mp3");
    
}

gameOverState.create = function() {
    
    game.add.sprite(0, 0, "space-bg");
    
    var textStyle = {font: "20px Arial", fill: "#ccddff", align: "center"}
    this.gameOvertitle = game.add.text(game.width * 0.5, game.height * 0.2, "GAME OVER", textStyle);
    this.gameOvertitle.fixedToCamera = true;
    this.gameOvertitle.anchor.setTo(0.5, 0.5);
    
    this.scoreTitle = game.add.text(game.width * 0.5, game.height * 0.6, "Your Score", textStyle);
    this.scoreTitle.fixedToCamera = true;
    this.scoreTitle.anchor.setTo(0.5, 0.5);
    
    this.scoreValue = game.add.text(game.width * 0.5, game.height * 0.8, 0);
    this.scoreValue.fixedToCamera = true;
    this.scoreValue.anchor.setTo(0.5, 0.5);
    
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
    
    //Music
    this.music = game.add.audio("gameover");
    this.music.play();
    this.music.volume = 0.5;
    this.music.loop = true;
   
}

gameOverState.update = function() {
   
    if (this.spaceKey.isDown) {
        game.state.start("MainGame");
    }
}