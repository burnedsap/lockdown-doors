class Vehicle {
  constructor(tX, tY) {
    this.loc = {
      x: tX,
      y: tY
    }
    this.arrList = [];
    this.speed = 2;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    let newX = this.loc.x + this.speed;
    let newY = this.loc.y + random(-1, 1);
    let newPos = {
      x: newX,
      y: newY
    }
    let arr = this.arrList;
    arr.push(newPos)
    this.arrList = arr;
    this.loc = newPos;
  }

  display() {
    push();
    strokeWeight(2);
    stroke(0);
    translate(this.loc.x, this.loc.y);
    point(0, 0);
    pop();
    strokeWeight(1);
    noFill();
    beginShape();
    stroke(200);
    for (let i = 0; i < this.arrList.length; i++) {
      vertex(this.arrList[i].x, this.arrList[i].y)
    }
    endShape();
  }
}