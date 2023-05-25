

// 定义常量
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "white";
const SNAKE_COLOUR = 'lightgreen';
const SNAKE_BORDER_COLOUR = 'darkgreen';
const FOOD_COLOUR = 'red';
const FOOD_BORDER_COLOUR = 'darkred';

// 获取canvas元素和绘图上下文
let gameCanvas = document.getElementById("gameCanvas");
let ctx = gameCanvas.getContext("2d");

// 定义贪吃蛇对象
let snake = {
    body: [
        {x: 50, y: 50},
        {x: 40, y: 50},
        {x: 30, y: 50},
        {x: 20, y: 50},
        {x: 10, y: 50}
    ],
    direction: 'right'
};

// 定义食物位置
let food = {
    x: 0,
    y: 0
};

// 画布宽高
const CANVAS_WIDTH = gameCanvas.width;
const CANVAS_HEIGHT = gameCanvas.height;

// 初始化游戏
function init() {
    drawCanvas();
    drawSnake();
    drawFood();
    document.addEventListener("keydown", changeDirection);
    setInterval(moveSnake, 100);
}

// 绘制游戏画布
function drawCanvas() {
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    ctx.strokestyle = CANVAS_BORDER_COLOUR;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// 绘制贪吃蛇
function drawSnake() {
    snake.body.forEach(drawSnakePart);
}

// 绘制贪吃蛇的一部分
function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_COLOUR;
    ctx.strokestyle = SNAKE_BORDER_COLOUR;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// 绘制食物
function drawFood() {
    ctx.fillStyle = FOOD_COLOUR;
    ctx.strokestyle = FOOD_BORDER_COLOUR;
    ctx.fillRect(food.x, food.y, 10, 10);
    ctx.strokeRect(food.x, food.y, 10, 10);
}

// 改变贪吃蛇移动方向
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (event.keyCode === LEFT_KEY && snake.direction !== 'right') {
        snake.direction = 'left';
    } else if (event.keyCode === UP_KEY && snake.direction !== 'down') {
        snake.direction = 'up';
    } else if (event.keyCode === RIGHT_KEY && snake.direction !== 'left') {
        snake.direction = 'right';
    } else if (event.keyCode === DOWN_KEY && snake.direction !== 'up') {
        snake.direction = 'down';
    }
}

// 移动贪吃蛇
function moveSnake() {
    let head = {x: snake.body[0].x, y: snake.body[0].y};

    // 移动贪吃蛇头部
    if (snake.direction === 'left') {
        head.x -= 10;
    } else if (snake.direction === 'up') {
        head.y -= 10;
    } else if (snake.direction === 'right') {
        head.x += 10;
    } else if (snake.direction === 'down') {
        head.y += 10;
    }

    // 将新的头部加入到贪吃蛇的身体中
    snake.body.unshift(head);

    // 如果贪吃蛇吃到食物，则增加长度并重新生成食物
    if (head.x === food.x && head.y === food.y) {
        snake.body.push({x: 0, y: 0});
        generateFood();
    }

    // 如果贪吃蛇撞到画布边缘或自己的身体，则游戏结束
    if (head.x < 0 || head.x >= CANVAS_WIDTH || head.y < 0 || head.y >= CANVAS_HEIGHT || checkCollision()) {
        clearInterval();
        alert("游戏结束");
    } else {
        // 如果游戏没有结束，则绘制新的游戏画面
        drawCanvas();
        drawSnake();
        drawFood();
    }
}

// 生成新的食物位置
function generateFood() {
    food.x = Math.floor(Math.random() * (CANVAS_WIDTH / 10))* 10;
    food.y = Math.floor(Math.random() * (CANVAS_HEIGHT / 10)) * 10;
}

// 检查贪吃蛇是否撞到了自己的身体
function checkCollision() {
    for (let i = 1; i < snake.body.length; i++) {
        if (snake.body[i].x === snake.body[0].x && snake.body[i].y === snake.body[0].y) {
            return true;
        }
    }
    return false;
}

// 初始化游戏
init();

