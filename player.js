class Player extends Entity {
    constructor(settings) {
      super(settings)
      this.frame = 0
    }
    update() {
      this.draw()
      this.keyCheck()
      this.wrap()
      this.location.add(this.speed)
      this.speed.mult(0.8)
    }
    draw() {
      this.frame += this.speed.mag() * 0.05
      let frame = frames[0]
      if (round(this.frame) % 2 === 1) frame = frames[1]
      push()
      translate(this.location.x, this.location.y)
      if (this.speed.x > 0) scale(-1, 1)
      image(frame, 0, 0)
      pop()
    }
    keyCheck() {
      let acc = 1.1
      if (keyIsDown(38)) this.speed.y -= acc
      if (keyIsDown(40)) this.speed.y += acc
      if (keyIsDown(37)) this.speed.x -= acc
      if (keyIsDown(39)) this.speed.x += acc
    }
    wrap() {
      if (this.location.y > height) this.location.y = 0
      if (this.location.y < 0) this.location.y = height
      if (this.location.x > width) this.location.x = 0
      if (this.location.x < 0) this.location.x = width
    }
  }