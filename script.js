const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//create circle
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = "white";
ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
ctx.stroke();

//create mouth
ctx.beginPath();
ctx.arc(centerX, centerY, 50, 0, Math.PI);
ctx.stroke();

//create eyes
const eye = (moveX, moveY) => {
  ctx.beginPath();
  ctx.arc(centerX + moveX, centerY + moveY, 5, 0, Math.PI * 2);
  ctx.stroke();
};
eye(25, -30);
eye(-25, -30);

//create some frame around the smiley
ctx.strokeRect(250, 300, 400, 300);

//trying a quadratic Bézier curve
ctx.beginPath();
ctx.moveTo(centerX + 50, centerY);
ctx.quadraticCurveTo(centerX, centerY + 70, centerX - 50, centerY);
ctx.stroke();

//create another circle through an object
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

//add start inside canvas

function someText() {
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Click anywhere to start this", 300, 100);
}
someText();

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
