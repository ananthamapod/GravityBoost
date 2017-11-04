import Background from './src/js/Background'
import Player from './src/js/Player'
import Planet from './src/js/Planet'

(function () {
  const requestAnimationFrame = (() => {
    const w = window
    return w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame
  })()

  Math.clamp = function (num, max, min) {
    return num <= min ? min : num >= max ? max : num
  }

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.zIndex=1
  document.body.appendChild(canvas)

  const bgCanvas = document.createElement("canvas")
  const bgCtx = bgCanvas.getContext("2d")
  bgCanvas.width = window.innerWidth
  bgCanvas.height = window.innerHeight
  bgCanvas.style.zIndex=0
  document.body.appendChild(bgCanvas)

// eslint-disable-next-line no-unused-vars
  const colors = [
    "#F34235",
    "#2095F2",
    "#FEC006",
    "#6639B6",
    "#FE9700",
    "#9B26AF",
    "#4BAE4F",
    "#009587",
    "#E81D62",
    "#CCDB38"
  ]
  let then = 0

  const player = new Player(canvas.width, canvas.height, ctx)
  console.log(player)

  const gameObjects = [
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    new Planet(canvas.width, canvas.height, ctx),
    player
  ]

  let keysDown = {}
  addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true
  }, false)
  addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode]
  }, false)

  function update(modifier) {
    var directions = {}
    if (38 in keysDown) {
      directions.up = true
    }
    if (40 in keysDown) {
      directions.down = true
    }
    if (37 in keysDown) {
      directions.left = true
    }
    if (39 in keysDown) {
      directions.right = true
    }

    for (let object of gameObjects) {
      object.update(directions, modifier)
    }
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let object of gameObjects) {
      object.render(ctx)
    }
  }

  function main() {
    const now = Date.now()
    const timeDelta = now - then

    update(timeDelta/1000.0)
    render()

    then = now

    requestAnimationFrame(main)
  }

  then = Date.now()
  new Background(canvas.width, canvas.height, bgCtx)
  player.ready = true
  main()
})()
