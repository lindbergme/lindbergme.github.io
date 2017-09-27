var mainGameState = { }

mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    game.load.image("space-bg", "assets/images/space-bg.jpg")
    game.load.image("player-ship", "assets/images/player-ship.png")
    game.load.audio("gameover", "assets/music/gameover.mp3")
    game.load.audio("maingame", "assets/music/maingame.mp3")
    game.load.audio("titlescreen", "assets/music/titlescreen.mp3")
    game.load.image("asteroid-medium-01", "assets/images/asteroid-medium-01.png")
    game.load.image("player-bullet", "assets/images/bullet-fire.png");
}

mainGameState.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.sprite(0, 0, "space-bg");
    
    var x = game.width*0.5;
    var y = game.height*0.9;
    
    //PlayerShip
    this.playerShip = game.add.sprite(x, y, "player-ship");
    this.playerShip.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.playerShip);
    
    this.cursors = game.input.keyboard.createCursorKeys();
    
    //Asteroids
    this.asteroidTimer = 2.0;
    this.asteroids = game.add.group();
    
    //Player Bullets
    this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.playerBullets = game.add.group();
    this.fireTimer = 0.4;
    
    //Music
    this.music = game.add.audio("gameover");
    this.music = game.add.audio("maingame");
    this.music = game.add.audio("titlescreen");
    this.music.play();
    this.music.volume = 0.5;
    this.music.loop = true;
    
};

mainGameState.update = function() {
   
    //Movement right - left
    if (this.cursors.right.isDown) {
        console.log("RIGHT PRESSED");
        this.playerShip.body.velocity.x = 300;
    } else if (this.cursors.left.isDown) {
        console.log("LEFT PRESSED");
        this.playerShip.body.velocity.x = -300;
    } else {
        this.playerShip.body.velocity.x = 0;
    };
   
    //Movement up - down
    if (this.cursors.up.isDown) {
        console.log("UP PRESSED");
        this.playerShip.body.velocity.y = -300;
    } else if (this.cursors.down.isDown) {
        console.log("DOWN PRESSED");
        this.playerShip.body.velocity.y = 300;
    } else {
        this.playerShip.body.velocity.y = 0;
    }
    
   //AsteroidTimer 
    this.asteroidTimer -= game.time.physicsElapsed;
    if ( this.asteroidTimer <= 0.0) {
        this.spawnAsteroid();
        this.asteroidTimer = 2.0;
        
    //Clean up Asteroids
    for( var i = 0; i < this.asteroids.children.length; i++ ) {
        if ( this.asteroids.children[i].y > (game.height + 200) ) {
            this.asteroids.children[i].destroy();
        }
    }
}
    
    //Player Bullets
    if ( this.fireKey.isDown ) {
        this.spawnPlayerBullet();
    }
    
    this.fireTimer -= game.time.physicsElapsed;
    
    for (var i = 0; i < this.playerBullets.children.length; i++) {
        if ( this.playerBullets.children[i].y < -200 ) {
            this.playerBullets.children[i].destroy();
        }
    }
};

mainGameState.spawnAsteroid = function() {
//Setup and create our Asteroid
    var x = game.rnd.integerInRange(0, game.width);
    var asteroid = game.add.sprite(x, 0, "asteroid-medium-01");
    asteroid.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(asteroid);
    asteroid.body.velocity.setTo(0, 100);
    
//Add to the group
    this.asteroids.add(asteroid);
};

mainGameState.spawnPlayerBullet = function() {
    if ( this.fireTimer < 0 ) {
        this.fireTimer = 0.4;
    
    var bullet = game.add.sprite(this.player.x, this.player.y, "player-bullet");
    bullet.anchor.setTo(0.5, 0.5);
    
    game.physics.arcade.enable(bullet);
    bullet.body.velocity.setTo(0, -200);
    
    this.playerBullets.add(bullet);
    }
}