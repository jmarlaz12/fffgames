var pizzaImage;
var burgerImage;
var images = [];
var paddle;
var ball;
var bricks = [];
var playingGame = false;
var youWin = false;
var youLose = false;
var winText;
var loseText;
var instructions;

var lives = 3;

var element = document.getElementById("game");
var positionInfo = element.getBoundingClientRect();
var gwidth = positionInfo.width;
var gheight = positionInfo.height;

var percentBacteria = document.getElementById("bacteria");
var percentVirus = document.getElementById("virus");
var percentLives = document.getElementById("heart-bar");

window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


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
    images.push(pizzaImage = loadImage('/fffgames/Images/bacteria.png'));
    images.push(burgerImage = loadImage('/fffgames/Images/virus.png'));
}

function setup() {
    var myCanvas = createCanvas(gwidth - 50, gheight);
    myCanvas.parent("game");
    paddle = new Paddle();
    ball = new Ball();

    for (let i = 0; i < 10; i++) {
        bricks.push(new Brick());
    }

    createText();
}

function draw() {


    if (playingGame) {
        instructions.style('color', 'white');
        instructions.style('display', 'none');
    } else {
        instructions.style('color', 'white');
        instructions.style('display', 'block');
    }

    background(0);

    paddle.display();
    if (playingGame) paddle.update();
    if (playingGame) paddle.checkEdges();

    ball.display();
    if (playingGame) ball.update();
    if (playingGame) ball.checkEdges();

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

    if (ball.pos.y > height) {
        lives--;
        if (lives === 2) percentLives.style.width = "53.33%";
        if (lives === 1) percentLives.style.width = "26.66%";
        playingGame = false;
        ball.pos = createVector(width / 2, height / 2);
        if (lives === 0) {
            percentLives.style.width = "0%"
            youLose = true;
            bricks.splice(0, bricks.length);
        }
    }

    if (bricks.length === 0 && lives != 0) {
        youWin = true;
        playingGame = false;
    }

    winText.style('color', 'white');
    loseText.style('color', 'white');
    if (youWin) {
        winText.style('display', 'block');
    } else {
        winText.style('display', 'none');
    }

    if (youLose) {
        loseText.style('display', 'block');
    } else {
        loseText.style('display', 'none');
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
        youLose = false;
        if (bricks.length === 0) {
            lives = 3;
            for (var i = 0; i < 10; i++) {
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

function createText() {
    winText = createP("YOU WIN!!");
    winText.position(width / 2 - 50, 120);

    loseText = createP("YOU LOSE!");
    loseText.position(width / 2, 120);

    instructions = createP("S: Start");
    instructions.position(gwidth - (gwidth - 30), gheight - (gheight - 110));
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