function setup() {
  createCanvas(600, 600);
  head = {x: 100, y: 200, vx: 1, vy: 1, th: 0}
  body = {x: -30, y: 0, th: 0}
  rectMode(CENTER)  
  counter = 0;  // 'counter' is the value passed to the trig functions to cause the running-gait
  prev = [0, 0, 0, 0] // This array holds the pervious angle of the dog's head
  // if prev.length = 4 then the dog's body takes the fourth previous angle of the dog's head.  
  // This is done so that the head and body don't turn simultaneously
  framesFromStart = 0; // We don't want to start assigning body.th to previous head.th until we have populated prev.th with non-zero values

  dogSpeed = 8;
}

function draw() {
  counter += 0.8;
  
  background(143, 194, 89);
  strokeWeight(2)

  // Draw the head
  push()
  translate(head.x, head.y)
  rotate(head.th)
  fill(245)
  stroke(0)
  rect(0,0,20,20)
  pop()
  
  // Calculate the dog's head velocity - follows the mouse!
  head.vx = abs(mouseX-head.x) > 10 ? (mouseX-head.x)/20 : 0;
  head.vy = abs(mouseY-head.y) > 10 ? (mouseY-head.y)/20 : 0;

  // Shift the prev array which deletes the first index and then push the current head.th to the end of the array
  prev.shift();
  prev.push(head.th)

  // We don't want to start assigning body.th to previous head.th until we have populated prev.th with non-zero values
  if(framesFromStart > prev.length) {
    body.th = prev[0]
  } else {
    framesFromStart += 1;
  }
  
  // Calculate the dog's head angle
  head.th = atan2(mouseY-head.y, mouseX-head.x)

  // Cap the magnitude of the dog's speed to dogSpeed - defined in setup()
  if(mag(head.vx, head.vy) > dogSpeed) {
    head.vx = dogSpeed * cos(head.th)
    head.vy = dogSpeed * sin(head.th)
  }

  let speed = mag(head.vx, head.vy); // calculate the magnitude of the speedVector - it may be less than dogSpeed

  // Remember, the speed is proportional to the distance to the mouse = (mouseX-head.x)/20
  // so when the dog gets close to the mouse he slows down 
  // and when he is going slow enough we want to stop the running gait effect
  if(speed > 2) {
    head.x += head.vx + speed * cos(head.th) * sin(counter);
    head.y += head.vy + speed * sin(head.th) * sin(counter);
  } else {
    head.x += head.vx;
    head.y += head.vy;
  }

  // Update the body position
  body.x = head.x - 25 * cos(body.th);
  body.y = head.y - 25 * sin(body.th)

  // Draw the body
  push()
  translate(body.x + speed * cos(body.th) * sin(counter), body.y + speed * sin(body.th) * sin(counter))
  rotate(body.th)
  fill('#C86C2D')
  rect(0,0, 30, 22)
  pop()

  // Draw the tail
  push()
  translate(body.x - 15 * cos(body.th), body.y - 15 * sin(body.th))
  rotate(body.th + PI + sin(counter / 3) / 3)
  rectMode(CORNER)
  fill(200, 120, 45)
  rect(0, -4, 20, 8)
  pop()
}

function sign(x) {
  let s = x > 0 ? 1 : -1;
  return s;
}