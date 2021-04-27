function Ball() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 15;
    this.direction = createVector(1, 1);
    this.vel = createVector(1, 1).mult(8);

    this.display(){
        stroke(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.r, this.r * 2);
    }
}