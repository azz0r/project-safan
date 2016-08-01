var game = new Phaser.Game(800, 600, Phaser.CANVAS, '',
  {
    preload: preload,
    create: create,
    update: update,
    render: render
  }
);

function preload() {
  game.load.tilemap('desert', 'assets/desert.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap('sewers', 'assets/sewers.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('desert', 'assets/desert.png');
  game.load.image('sewers', 'assets/sewers.png');
  game.load.image('car', 'assets/player.png');
}

var map;
var layer;

var cursors;
var sprite;
var level = 1;

function create() {
  if (level === 1) {
    map = game.add.tilemap('desert');
    map.addTilesetImage('Desert', 'desert');
    layer = map.createLayer('Ground');
  } else {
    map = game.add.tilemap('sewers');
    map.addTilesetImage('Sewers', 'sewers');
    layer = map.createLayer('Ground');
  }

  layer.resizeWorld();

  // player character
  sprite = game.add.sprite(450, 80, 'car');
  sprite.anchor.setTo(0.5, 0.5);

  // standard per game
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.enable(sprite);
  game.camera.follow(sprite);
  cursors = game.input.keyboard.createCursorKeys();
}

function randomiseTiles() {

  map.random(layer.getTileX(sprite.x), layer.getTileY(sprite.y), 6, 6);

}

function update() {
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    sprite.x -= 4;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    sprite.x += 4;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
  {
      sprite.y -= 4;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
  {
      sprite.y += 4;
  }
}

function render() {

  game.debug.text('Tile X: ' + layer.getTileX(sprite.x), 32, 48, 'rgb(0,0,0)');
  game.debug.text('Tile Y: ' + layer.getTileY(sprite.y), 32, 64, 'rgb(0,0,0)');

}
