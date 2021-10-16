class Player extends Entity {
    constructor(settings) {
      super(settings)
      this.head = {x: 100, y: 200, vx: 1, vy: 1, th: 0}
      this.body = {x: -30, y: 0, th: 0}
      this.counter = 0;  // 'counter' is the value passed to the trig functions to cause the running-gait
      this.prev = [0, 0, 0, 0, 0, 0, 0] // This array holds the pervious angle of the dog's head
      // if prev.length = 4 then the dog's body takes the fourth previous angle of the dog's head.  
      // This is done so that the head and body don't turn simultaneously
      this.framesFromStart = 0; // We don't want to start assigning body.th to previous this.head.th until we have populated prev.th with non-zero values
      this.dogSpeed = 6;
    }
    update() {
      this.draw()
    }

    draw() {
      this.counter += 0.8;  // Increment the counter (gait effect)
    
      
      strokeWeight(2)

      
      
      // Calculate the dog's head velocity - follows the mouse!
      this.head.vx = abs(mouseX-this.head.x) > 10 ? (mouseX-this.head.x)/20 : 0;
      this.head.vy = abs(mouseY-this.head.y) > 10 ? (mouseY-this.head.y)/20 : 0;

      // Shift the prev array which deletes the first index and then push the current this.head.th to the end of the array
      this.prev.shift();
      this.prev.push(this.head.th)

      // We don't want to start assigning body.th to previous this.head.th until we have populated prev.th with non-zero values
      if(this.framesFromStart > this.prev.length) {
        this.body.th = this.prev[0]
      } else {
        this.framesFromStart += 1;
      }
      
      // Calculate the dog's head angle
      this.head.th = atan2(mouseY-this.head.y, mouseX-this.head.x)

      // Cap the magnitude of the dog's speed to dogSpeed - defined in setup()
      if(mag(this.head.vx, this.head.vy) > this.dogSpeed) {
        this.head.vx = this.dogSpeed * cos(this.head.th)
        this.head.vy = this.dogSpeed * sin(this.head.th)
      }

      let speed = mag(this.head.vx, this.head.vy); // calculate the magnitude of the speedVector - it may be less than dogSpeed

      // Remember, the speed is proportional to the distance to the mouse = (mouseX-head.x)/20
      // so when the dog gets close to the mouse he slows down 
      // and when he is going slow enough we want to stop the running gait effect
      if(speed > 2) {
        this.head.x += this.head.vx - speed * cos(this.head.th) * sin(this.counter);
        this.head.y += this.head.vy - speed * sin(this.head.th) * sin(this.counter);
      } else {
        this.head.x += this.head.vx;
        this.head.y += this.head.vy;
      }

      // Update the body position
      this.body.x = this.head.x - 25 * cos(this.body.th);
      this.body.y = this.head.y - 25 * sin(this.body.th)

      // Draw the body
      push()
      translate(this.body.x + speed * cos(this.body.th) * sin(this.counter), this.body.y + speed * sin(this.body.th) * sin(this.counter))
      rotate(this.body.th)
      fill('#C86C2D')
      // rect(0,0, 30, 22)
      image(body, 0, 0)
      pop()

      // Draw the tail
      push()
      translate(this.body.x - 15 * cos(this.body.th), this.body.y - 15 * sin(this.body.th))
      rotate(this.body.th  + sin(this.counter / 3) / 3)
      rectMode(CORNER)
      fill(200, 120, 45)
      // rect(0, -4, 20, 8)
      image(tail, -20, 10)
      pop()

      // Draw the head
      push()
      translate(this.head.x, this.head.y)
      rotate(this.head.th)
      fill(245)
      stroke(0)
      // rect(0,0,20,20)
      image(head, 20, 0)
      pop()
    }
  }