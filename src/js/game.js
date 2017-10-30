import Vector from './src/js/Base/Vector'
import ImageObject from './src/js/Base/ImageObject'

(function () {
  const requestAnimationFrame = (() => {
    const w = window
    return w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame
  })()


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

  class Background extends ImageObject {
    constructor() {
      super(new Vector(0, 0),
        new Vector(canvas.width, canvas.height),
        "images/background.jpg"
      )

      this.onLoad(() => {
        this.render(bgCtx)
      })
    }

    render(ctx) {
      console.log(this)
      super.render(ctx)
    }
  }

  class Player extends ImageObject {
    constructor() {
      super(
        new Vector(canvas.width/2 - 30, canvas.height/2 - 70),
        new Vector(30, 70),
        "images/player.png",
        {
          speed: 256,
          rotate: 0
        }
      )
    }

    render(ctx) {
      console.log("render player")
      ctx.save()
      ctx.rotate(this.rotate)
      super.render(ctx)
      ctx.restore()
    }

    update(directions, modifier) {
      if (Object.keys(directions).length > 0)
        console.log(directions)
      if (directions.hasOwnProperty("up")) {
        this.position.y = Math.max(0, this.position.y - this.speed * modifier)
      }
      if (directions.hasOwnProperty("down")) {
        this.position.y = Math.min(canvas.height-60, this.position.y + this.speed * modifier)
      }
      if (directions.hasOwnProperty("left")) {
        this.position.x = Math.max(0, this.position.x - this.speed * modifier)
      }
      if (directions.hasOwnProperty("right")) {
        this.position.x = Math.min(canvas.width-30, this.position.x + this.speed * modifier)
      }
    }
  }

  class Planet extends ImageObject {
    constructor() {
      let radius = Math.floor(10 + 50 * Math.random())
      super(
        new Vector(
          Math.floor((canvas.width - radius) * Math.random()),
          Math.floor((canvas.height - radius) * Math.random())
        ),
        new Vector(radius, radius),
        "images/luna.png",
        { radius }
      )

      this.onLoad(() => this.render(ctx))
    }
  }

  const player = new Player()

  const gameObjects = [
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
    new Planet(),
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

    player.update(directions, modifier)
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "blue"
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
  new Background()
  main()
})()
