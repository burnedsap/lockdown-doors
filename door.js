class Door {
  constructor(caption1, caption2, x, y) {
    this.x = x;
    this.y = y;
    this.caption1 = caption1;
    this.caption2 = caption2;
  }
  display() {
    push();
    translate(this.x, this.y);
    push();
    scale(0.09);
    image(doorClose, 0, 0);
    // animation(this.doorStatic, 0, 0);
    pop();
    pop();
  }
  move() {
    push();
    translate(this.x, this.y);
    push();
    scale(0.09);
    image(doorOpen, 0, 0);
    // animation(this.door, 0, 0);
    pop();
    textAlign(CENTER);
    noStroke();
    textSize(9);
    fill(0);
    text(this.caption1, 0, 0 + 30);
    text(this.caption2, 0, 0 - 30);
    pop();
  }
}
