var paddle;
var ball;
var bricks = [];

function setup() {
    createCanvas(500, 500);
    paddle = new Paddle();
    ball = new Ball();

    for (let i = 0; i < 5; i++) {
        bricks.push(new Brick());
    }
}

function draw() {
    background(0);
    paddle.display();
    paddle.update();
    paddle.checkEdges();

    ball.display();
    ball.update();
    ball.checkEdges();

    if (ball.meetsPaddle(paddle) && ball.direction.y > 0) {
        ball.direction.y *= -1;
    }

    for (var i = 0; i < bricks.length; i++) {
        bricks[i].display();
    }
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