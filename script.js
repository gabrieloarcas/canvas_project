const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//create a circle through an object
const circle = {
  x: 500 - 50,
  y: 1000,
  speed: 10,
  size: 50,
  dx: 0,
  dy: 0
};

const drawCircle = (size, color) => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function newPosition() {
  circle.x += circle.dx;
  circle.y += circle.dy;
  wall();
}
function animate() {
  clear();
  drawCircle(50, "red"); //generate some random circles from drawCircle
  drawCircle(40, "purple");
  drawCircle(30, "white");
  drawCircle(20, "green");
  newPosition();
  requestAnimationFrame(animate);
}
function wall() {
  //Left Wall
  if (circle.x < 50) {
    circle.x = 50; // 50 is the actual size of the outer circle
  }
  // Right Wall
  if (circle.x + circle.size > canvas.width) {
    circle.x = canvas.width - circle.size;
  }
  // Top wall
  if (circle.y < 50) {
    circle.y = 50;
  }
  // Bottom Wall
  if (circle.y + circle.size > canvas.height) {
    circle.y = canvas.height - circle.size;
  }

  //circle manipulation
}
function moveUp() {
  circle.dy = -circle.speed;
}
function moveDown() {
  circle.dy = circle.speed;
}
function moveLeft() {
  circle.dx = -circle.speed;
}
function moveRight() {
  circle.dx = circle.speed;
}

// controllers

function touchDown(e) {
  if (
    e.key === "ArrowRight" ||
    (e.key === "ArrowRight" && e.key === "ArrowUp")
  ) {
    moveRight();
  } else if (e.key === "ArrowLeft") {
    moveLeft();
  } else if (e.key === "ArrowUp") {
    moveUp();
  } else if (e.key === "ArrowDown") {
    moveDown();
  }
}

function touchUp(e) {
  if (
    e.key == "Right" ||
    e.key == "ArrowRight" ||
    e.key == "Left" ||
    e.key == "ArrowLeft" ||
    e.key == "Up" ||
    e.key == "ArrowUp" ||
    e.key == "Down" ||
    e.key == "ArrowDown"
  ) {
    circle.dx = 0;
    circle.dy = 20;
  }
}

// buttons for mobile devices

document.addEventListener("click", startGame);
document.addEventListener("keydown", touchDown);
document.addEventListener("keyup", touchUp);

const upButton = document.getElementById("upButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const start = document.getElementById("start");

upButton.addEventListener("touchstart", up);
leftButton.addEventListener("touchstart", left);
rightButton.addEventListener("touchstart", right);
leftButton.addEventListener("touchend", release);
rightButton.addEventListener("touchend", release);
upButton.addEventListener("touchend", releaseUp);
start.addEventListener("click", startGame);

function startGame() {
  animate();
}
function up() {
  moveUp();
}
function left() {
  moveLeft();
}
function right() {
  moveRight();
}

//some poor gravitation

function releaseUp() {
  circle.dx = 0;
  circle.dy = 20;
}

function release() {
  circle.dx = 0;
  circle.dy = 0;
}

// Create something with a Class

class Ball {
  constructor(positionX, positionY, size, speed, dX = 0, dY = 0) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.dX = dX;
    this.dY = dY;
    this.size = size;
    this.speed = speed;
  }
  create() {
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, this.size, 0, Math.PI * 2);
    ctx.stroke();
  }
}

//Add a new feature to the existing object

class ballWithColor extends Ball {
  constructor(color, positionX, positionY, size, speed, dX, dY) {
    super(positionX, positionY, size, speed, dX, dY);
    this.color = color;
  }

  fillColor() {
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  moveBall() {
    // console.log(this.dX);
    this.positionX += this.dX;
  }
}

//Change dx to have different speed applied to the balls
let ball1 = new ballWithColor("red", 100, 100, 30, 5, 1);
let ball2 = new ballWithColor("white", 140, 100, 30, 5, 7);
let ball3 = new ballWithColor("green", 180, 100, 30, 5, 3);

//Click anywhere text
function someText() {
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Click anywhere to start this", 200, 400);
}

//Create three balls from the objects
const threeBalls = () => {
  ball1.create();
  ball1.fillColor();
  ball1.moveBall();
  ball2.create();
  ball2.fillColor();
  ball2.moveBall();
  ball3.create();
  ball3.fillColor();
  ball3.moveBall();
};

//Animate those balls

function animateBalls() {
  clear();
  threeBalls();
  requestAnimationFrame(animateBalls);
  someText();
}
animateBalls();

// Create a smiley

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

//create circle
const centerX = canvas2.width / 2;
const centerY = canvas2.height / 2;
ctx2.beginPath();
ctx2.lineWidth = 5;
ctx2.strokeStyle = "white";
ctx2.arc(centerX, centerY, 70, 0, Math.PI * 2);
ctx2.stroke();

//create mouth
ctx2.beginPath();
ctx2.arc(centerX, centerY, 50, 0, Math.PI);
ctx2.stroke();

//create eyes
const eye = (moveX, moveY) => {
  ctx2.beginPath();
  ctx2.arc(centerX + moveX, centerY + moveY, 5, 0, Math.PI * 2);
  ctx2.stroke();
};
eye(25, -30);
eye(-25, -30);

//create some frame around the smiley
ctx2.strokeRect(250, 300, 400, 300);

//trying a quadratic Bézier curve
ctx2.beginPath();
ctx2.moveTo(centerX + 50, centerY);
ctx2.quadraticCurveTo(centerX, centerY + 70, centerX - 50, centerY);
ctx2.stroke();
