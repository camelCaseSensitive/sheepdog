let game

function preload() {
  head = loadImage("head.png")
  body = loadImage("body.png")
  tail = loadImage("tail.png")
}

function setup() {
  createCanvas(1200, 700).parent('game');
  game = new Game({})
  game.player = new Player({})
  rectMode(CENTER) 
  imageMode(CENTER)
  draw = game.update.bind(game)

  head.resize(39, 50)
  body.resize(55, 30)
  tail.resize(18, 33)
}

function sign(x) {
  let s = x > 0 ? 1 : -1;
  return s;
}