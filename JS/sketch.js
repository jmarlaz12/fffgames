var paddle;
var ball;

function setup() {
    createCanvas(500, 500);
    paddle = new Paddle();
    ball = new Ball();
}

function draw() {
    background(0);
    paddle.display();
    paddle.update();
    paddle.checkEdges();

    ball.display();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        paddle.isMovingLeft = true;
    } else if (keyCode === RIGHT_ARROW) {
        paddle.isMovingRight = true;
    }
}

function keyReleased() {
    paddle.isMovingLeft = false;
    paddle.isMovingRight = false;
}