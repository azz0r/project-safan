var game = new Phaser.Game(
  1024,
  900,
  Phaser.AUTO,
  'game',
  {
    init: init,
    create: create,
    update: update,
    preload: preload,
    render: render
  },
  true
);
