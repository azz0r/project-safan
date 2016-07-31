function create() {
  game.add.tileSprite(0, 0, 1920, 1920, 'grid');
  game.world.setBounds(0, 0, 1920, 1920);
  game.physics.startSystem(Phaser.Physics.P2JS);
  player = game.add.sprite(game.world.centerX, game.world.centerY, 'wizard');
  game.physics.p2.enable(player);
  cursors = game.input.keyboard.createCursorKeys();
  game.camera.follow(player);
}
