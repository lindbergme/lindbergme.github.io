var mainGameState = { }

mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    game.load.image("space-bg", "assets/images/space-bg.jpg")
    game.load.image("player-ship", "assets/images/player-ship.png")
    game.load.audio("maingame", "assets/music/maingame.mp3")
    game.load.audio("titlescreen", "assets/music/titlescreen.mp3")
    game.load.image("asteroid-medium-01", "assets/images/asteroid-medium-01.png")
    game.load.image("player-bullet", "assets/images/bullet-fire.png");
    game.load.audio("player_fire_01", "assets/audio/player_fire_01.mp3");
    game.load.audio("player_fire_02", "assets/audio/player_fire_02.mp3");
    game.load.audio("player_fire_03", "assets/audio/player_fire_03.mp3");
    game.load.audio("player_fire_04", "assets/audio/player_fire_04.mp3");
    game.load.audio("player_fire_05", "assets/audio/player_fire_05.mp3");
    game.load.audio("player_fire_06", "assets/audio/player_fire_06.mp3");
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
    this.playerFireSfx = [];
    this.playerFireSfx.push(game.add.audio("player_fire_01"));
    this.playerFireSfx.push(game.add.audio("player_fire_02"));
    this.playerFireSfx.push(game.add.audio("player_fire_03"));
    this.playerFireSfx.push(game.add.audio("player_fire_04"));
    this.playerFireSfx.push(game.add.audio("player_fire_05"));
    this.playerFireSfx.push(game.add.audio("player_fire_06"));
    
    //Score
    var textStyle = {font: "12px Arial", fill: "#ccddff", align: "center"}
    
    this.scoreTitle = game.add.text(game.width * 0.85, 30, "SCORE", textStyle);
    this.scoreTitle.fixedToCamera = true;
    this.scoreTitle.anchor.setTo(0.5, 0.5);
    
    this.scoreValue = game.add.text(game.width * 0.75, 30, "0", textStyle);
    this.scoreValue.fixedToCamera = true;
    this.scoreValue.anchor.setTo(0.5, 0.5);
    
    this.playerScore = 0;
    
    //Lives
    var textStyle = {font: "12px Arial", fill: "#ccddff", align: "center"}
    
    this.livesTitle = game.add.text(game.width * 0.15, 30, "LIVES", textStyle);
    this.livesTitle.fixedToCamera = true;
    this.livesTitle.anchor.setTo(0.5, 0.5);
    
    this.livesValue = game.add.text(game.width * 0.25, 30, "0", textStyle);
    this.livesValue.fixedToCamera = true;
    this.livesValue.anchor.setTo(0.5, 0.5);
    
    this.playerLives = 3;
    
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
    if ( this.asteroidTimer <= 0.0 ) {
        this.spawnAsteroid();
        this.asteroidTimer = 2.0;
    }
    
    //Clean up Asteroids
    for( var i = 0; i < this.asteroids.children.length; i++ ) {
        if ( this.asteroids.children[i].y > (game.height + 200) ) {
            this.asteroids.children[i].destroy();
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
    
    //Collision
    game.physics.arcade.collide(this.asteroids, this.playerBullets, this.onAsteroidBulletCollision, null, this);
    
    //Lives
    this.livesValue.setText(this.playerLives);

    //Score
    this.scoreValue.setText(this.playerScore);
    
    //Game Over
    if ( this.playerLives <= 0 ) {
        game.state.start("GameOver");
    }
};

mainGameState.spawnAsteroid = function() {
//Setup and create our Asteroid
    var x = game.rnd.integerInRange(0, game.width);
    var asteroid = game.add.sprite(x, 0, "asteroid-medium-01");
    asteroid.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(asteroid);
    asteroid.body.velocity.setTo(0, 100);
    asteroid.body.angularVelocity = 50;
    
//Add to the group
    this.asteroids.add(asteroid);
};

mainGameState.spawnPlayerBullet = function() {
    if ( this.fireTimer < 0 ) {
        this.fireTimer = 0.4;
    
    var bullet = game.add.sprite(this.playerShip.x, this.playerShip.y, "player-bullet");
    bullet.anchor.setTo(0.5, 0.5);
    
    game.physics.arcade.enable(bullet);
    bullet.body.velocity.setTo(0, -200);
    
    this.playerBullets.add(bullet);
    
    var index = game.rnd.integerInRange(0, this.playerFireSfx.length - 1);
    this.playerFireSfx[index].play();    
        //console.log(this.playerFireSfx[index].key);
    }
}

mainGameState.onAsteroidBulletCollision = function(object1, object2) {
   if ( object1.key.includes("asteroid") ) {
    object1.pendingDestroy = true;
   } else { 
    object2.pendingDestroy = true;
   }
    this.playerLives -= 1;
    this.playerScore += 50;
}
