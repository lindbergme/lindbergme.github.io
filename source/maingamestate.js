var mainGameState = { }

mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    game.load.image("space-bg", "assets/images/space-bg.jpg")
    game.load.image("player-ship", "assets/images/player-ship.png")
}

mainGameState.create = function() {
    game.add.sprite(0, 0, "space-bg");
    var x = game.width*0.5;
    var y = game.height*0.9;
    
    this.playerShip = game.add.sprite(x, y, "player-ship");
    this.playerShip.anchor.setTo(0.5, 0.5);
    
}

mainGameState.update = function() {
    
}