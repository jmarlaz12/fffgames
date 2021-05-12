var pizzaImage;
var burgerImage;
var images = [];
var paddle;
var ball;
var bricks = [];

function Paddle() {
    this.w = 150;
    this.h = 20;
    this.pos = createVector(width / 2, height - 40);

    this.isMovingLeft = false;
    this.isMovingRight = false;

    this.display = function () {
        stroke(255);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    this.move = function (step) {
        this.pos.x += step;
    }

    this.update = function () {
        if (this.isMovingRight) {
            this.move(20);
        } else if (this.isMovingLeft) {
            this.move(-20);
        }
    }

    this.checkEdges = function () {
        if (this.pos.x < 0) {
            this.pos.x = 0;
        } else if (this.pos.x > width - this.w) {
            this.pos.x = width - this.w;
        }
    }
}

function Ball() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 15;
    this.direction = createVector(1, 1);
    this.vel = createVector(1, 1).mult(6);

    this.display = function () {
        stroke(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    this.update = function () {
        this.pos.x += this.vel.x * this.direction.x;
        this.pos.y += this.vel.y * this.direction.y;
    }

    this.checkEdges = function () {
        if (this.pos.y < this.r && this.direction.y < 0) {
            this.direction.y *= -1;
        } else if (this.pos.x < this.r && this.direction.x < 0) {
            this.direction.x *= -1;
        } else if (this.pos.x > width - this.r && this.direction.x > 0) {
            this.direction.x *= -1;
        }
    }

    this.meets = function (paddle) {
        if (this.pos.y < paddle.pos.y &&
            this.pos.y > paddle.pos.y - this.r &&
            this.pos.x > paddle.pos.x - this.r &&
            this.pos.x < paddle.pos.x + paddle.w + this.r) {
            return true
        } else return false;
    }

    this.hits = function (brick) {
        var distance = dist(this.pos.x, this.pos.y, brick.pos.x / 2, brick.pos.y / 2);
        if (this.pos.x + this.r > brick.pos.x &&
            this.pos.x + this.r < brick.pos.x + brick.r &&
            this.pos.y + this.r > brick.pos.y &&
            this.pos.y + this.r < brick.pos.y + brick.r) return true;
        else return false;
    }
}

function preload() {
    images.push(pizzaImage = loadImage('/Images/brick.png'));
    images.push(burgerImage = loadImage('/Images/burger.png'));
}

function setup() {
    createCanvas(700, 700);
    paddle = new Paddle();
    ball = new Ball();

    for (let i = 0; i < 10; i++) {
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

    for (let i = 0; i < bricks.length; i++) {
        bricks[i].display();
    }

    if (ball.meets(paddle) && ball.direction.y > 0) {
        ball.direction.y *= -1;
    }

    for (let j = 0; j < bricks.length; j++) {
        if (ball.hits(bricks[j])) {
            if (bricks[j].r > 65) {
                console.log("the image is larger than half");
                bricks[j].r = bricks[j].r / 2;
            } else {
                bricks.splice(j, 1);
            }
            ball.direction.y *= -1;
        }
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        paddle.isMovingLeft = true;
    } else if (keyCode === RIGHT_ARROW) {
        paddle.isMovingRight = true;
    } else if (key === 's' || key === 'S') {
        playingGame = true;
        youWin = false;
        if (bricks.length === 0) {
            for (var i = 0; i < 20; i++) {
                bricks.push(new Brick());
            }
            ball.pos.x = width / 2;
            ball.pos.y = height / 2;
        }
    }
}

function keyReleased() {
    paddle.isMovingLeft = false;
    paddle.isMovingRight = false;
}


function Brick() {
    var num = int(random(0, 2));
    this.r = random(50, 80);
    this.pos = createVector(random(100, width - 100), random(100, height - 400));

    this.display = function () {
        imageMode(CENTER);
        image(images[num], this.pos.x, this.pos.y, this.r, this.r);
    }
}