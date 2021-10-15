class Entity {
    constructor(settings) {
      settings.color = settings.color || 'chartreuse'
      Object.assign(this, settings)
      game.entities.push(this)
      this.width = settings.width || 20
      this.height = settings.height || 20
    }
    update() {
      this.draw()
    }
    draw() {
      push()
      fill(this.color)
      noStroke()
      rectMode(CENTER)
      rect(this.location.x, this.location.y, this.width, this.height)
      pop()
    }
  }