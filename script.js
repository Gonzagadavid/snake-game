const canvas = document.getElementById('snake')
const context = canvas.getContext('2d')
const box = 32
const snake = []
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction = 'right'
const food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG () {
  context.fillStyle = 'black'
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha () {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = '#146B14'
    context.fillRect(snake[i].x, snake[i].y, box, box)
    context.strokeRect(snake[i].x, snake[i].y, box, box)
    context.strokeStyle = '#EFF609'
  }
}

function drawFood () {
  context.beginPath()
  context.fillStyle = 'red'
  context.arc(food.x + 16, food.y + 16, box / 2, 0, Math.PI * 2)
  context.fill()
}

document.addEventListener('keydown', update)

function update (event) {
  if (event.keyCode == 37 && direction != 'right') { direction = 'left' }
  if (event.keyCode == 38 && direction != 'down') { direction = 'up' }
  if (event.keyCode == 39 && direction != 'left') { direction = 'right' }
  if (event.keyCode == 40 && direction != 'up') { direction = 'down' }
}

function iniciarJogo () {
  if (snake[0].x > 15 * box && direction == 'right') { snake[0].x = 0 }
  if (snake[0].x < 0 && direction == 'left') { snake[0].x = 16 * box }
  if (snake[0].y > 15 * box && direction == 'down') { snake[0].y = 0 }
  if (snake[0].y < 0 && direction == 'up') { snake[0].y = 16 * box }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo)
      alert('Game over =(\nAperte F5 para recomeçar!!!')
    }
  }

  criarBG()
  criarCobrinha()
  drawFood()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction == 'right') { snakeX += box }
  if (direction == 'left') { snakeX -= box }
  if (direction == 'up') { snakeY -= box }
  if (direction == 'down') { snakeY += box }

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop()
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box
  }

  const newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

const jogo = setInterval(iniciarJogo, 100)
