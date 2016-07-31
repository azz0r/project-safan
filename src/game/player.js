Player = function (game, x, y, idNumber) {
  Phaser.Sprite.call(this, game, x, y, 'wizard');

  this.idNumber = idNumber;

  this.leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
  this.rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
  this.upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
  this.downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);

  game.physics.arcade.enable(this);

  this.projectiles = game.add.group();
  this.projectiles.enableBody = true;
  this.projectiles.physicsBodyType = Phaser.Physics.ARCADE;

  this.projectiles.createMultiple(20, 'magic');
  this.projectiles.setAll('anchor.x', 0.5);
  this.projectiles.setAll('anchor.y', 0.5);
  this.projectiles.setAll('checkWorldBounds', true);
  this.projectiles.setAll('outOfBoundsKill', true);
  this.projectiles.fixedToCamera = false;

  this.newProjectiles = [];

  this.fireRate = 200;
  this.nextFire = 0; // updated as projectiles are fired

  this.scale.setTo(4, 4);
  this.anchor.setTo(0.5, 0.5);

  this.body.allowRotation = false;
  this.body.collideWorldBounds = true;

  game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

  game.time.events.loop(Phaser.Timer.SECOND, this.updateServer, this);

  game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.updateServer = function() {
  //var updateString = "updating server: x: " + this.x + ", y: " + this.y;
  //console.log(updateString);
  var projectileUpdates = [];
  for (var i = 0; i < this.newProjectiles.length; i++) {

  }
  var projectile = {image: 'magic', position: {}, velocity: {}, lifespan: 1000 };
  socket.emit('player-update', {idNumber: this.idNumber, position: {x: this.x, y: this.y}, projectile: projectile});
};

/**
* World.update will automatically call this
*/

Player.prototype.update = function() {
  // When keys are released, reset velocity
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;

  if (this.upButton.isDown) {
    this.body.velocity.y = -300;
  } else if (this.downButton.isDown) {
    this.body.velocity.y = 300;
  } else if (this.leftButton.isDown) {
    this.body.velocity.x = -300;
  } else if (this.rightButton.isDown) {
    this.body.velocity.x = 300;
  }
};

Player.prototype.fireProjectile = function() {
  if (game.time.now > nextFire)
  {
    this.nextFire = game.time.now + this.fireRate;

    //var bullet = game.add.sprite(100, 100, 'magic');
    var projectile = this.projectiles.getFirstDead();

    projectile.lifespan = 1000;

    projectile.reset(this.x, this.y);
    game.physics.arcade.moveToPointer(projectile, 300);
    newProjectiles.push(projectile);
  }
};
