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
      background(143, 194, 89);
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
      
    }
    gameState() {
      this.draw()
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
      background(143, 194, 89); // Luscious green grass!
      this.entities.forEach((entity) => {
        entity.update()
      })
    }
  }