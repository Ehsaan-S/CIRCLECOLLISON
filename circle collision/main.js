let cnv = document.getElementById("Canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;
function getRandomColour() {
  return `#` + Math.floor(Math.random() * 16777215).toString(16);
}
function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

let player = {
  x: 400,
  y: 300,
  radius: 10,
  colour: "lightblue",
  speed: 5,
};

let foods = [];

function addFood(count) {
  for (let i = 0; i < count; i++) {
    foods.push({
      x: Math.random() * cnv.width,
      y: Math.random() * cnv.height,
      radius: randomNum(5, 10),
      colour: getRandomColour(),
    });
  }
}

function drawPlayer(player) {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fillStyle = player.colour;
  ctx.fill();
  ctx.strokeStyle = "DarkBlue";
  ctx.stroke();
  ctx.closePath();
}

function drawFood() {
  for (let i = 0; i < foods.length; i++) {
    let food = foods[i];
    ctx.beginPath();
    ctx.arc(food.x, food.y, food.radius, 0, Math.PI * 2);
    ctx.fillStyle = food.colour;
    ctx.fill();
    ctx.closePath();
  }
}

function addFoodWithDelay() {
  let Delay = 250;
  addFood(1);
  setTimeout(addFoodWithDelay, Delay);
}

document.addEventListener("mousemove", movePlayer);

function movePlayer(event) {
  player.x = event.clientX - cnv.getBoundingClientRect().left;
  player.y = event.clientY - cnv.getBoundingClientRect().top;
}

function collision() {
  for (let i = 0; i < foods.length; i++) {
    let food = foods[i];
    let dist = Math.sqrt((player.x - food.x) ** 2 + (player.y - food.y) ** 2);
    if (dist < player.radius + food.radius) {
      player.radius += food.radius * 0.125;
      foods.splice(i, 1);
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  drawFood();

  drawPlayer(player);
  collision();
  requestAnimationFrame(gameLoop);
}

gameLoop();
addFoodWithDelay();
addFood(30);
