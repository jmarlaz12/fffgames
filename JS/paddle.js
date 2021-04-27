function Paddle() {
    this.w = 150;
    this.h = 20;
    this.pos = createVector(width / 2, height - 40);

    this.display = funciton(){
        stroke(255);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }
}