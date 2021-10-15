class Game {
    constructor(settings) {
      Object.assign(this, settings)
      this.entities = []
      this.mainLoop()
    }
    async mainLoop() {
      if (!this.runOnce) await this.stateChange('title')
      this.initGame()
      await this.stateChange('game')
      await this.stateChange('end')
      this.mainLoop()
    }
    stateChange(state) {
      return new Promise((resolve) => {
        this.keyCleared = false
        this.state = state
        this.stateResolve = resolve
        console.log(this.state)
      })
    }
    update() {
      this[this.state + 'State']()
    }
    titleState() {
      push()
      background(0)
      textAlign(CENTER)
      textSize(20)
      fill(255)
      text("Sheep Dog", width / 2, height * 0.4)
      text("-space to start-", width / 2, height * 0.6)
      pop()
      if (keyIsDown(32) && this.keyCleared) this.stateResolve()
      else if (!keyIsDown(32)) this.keyCleared = true
    }
    initGame() {
      this.timeLeft = 60
      this.player.score = 0
      this.player.location = createVector(width / 2, height / 2)
      this.player.speed = createVector()
      this.player.score = 0
      this.target.location = this.randomLocation
      this.runOnce = true
    }
    gameState() {
      this.draw()
      this.collision()
      this.info()
    }
    endState() {
      push()
      background(0)
      textAlign(CENTER)
      textSize(20)
      fill(255)
      text("GAME OVER", width / 2, height * 0.4)
      text("YOUR SCORE: " + this.player.score, width / 2, height * 0.6)
      text("-space to replay-", width / 2, height * 0.8)
      pop()
      if (keyIsDown(32) && this.keyCleared) this.stateResolve()
      else if (!keyIsDown(32)) this.keyCleared = true
    }
    draw() {
      image(bg, width / 2, height / 2, width, height)
      this.entities.forEach((entity) => {
        entity.update()
      })
    }
    collision() {
      if (this.target.colliding(this.player)) {
        while (this.target.colliding(this.player)) this.target.location = this.randomLocation
        this.player.score++
        sound.play()
      }
    }
    info() {
      fill("white")
      text(this.player.score, 10, 20)
      text(this.timeLeft, width - 20, 20)
      if (frameCount % 60 === 0) this.timeLeft--
      if (this.timeLeft < 0) {
        this.stateResolve()
      }
    }
    get randomLocation() {
      let x = random(width)
      let y = random(height)
      return createVector(x, y)
    }
  }