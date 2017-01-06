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

  function Background() {
    this.ready = false
    this.image = new Image()
    this.src = "images/background.jpg",
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.render = function(ctx) {
      ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
    var self = this
    this.image.onload = function() {
      self.ready = true
      self.render(bgCtx)
    }
    this.image.src = this.src
  }

  function Player() {
    this.ready = false
    this.image = new Image()
    this.src = "images/player.png"
    this.width = 30
    this.height = 70
    this.x = canvas.width/2 - this.width
    this.y = canvas.height/2 - this.height
    this.speed = 256
    this.rotate = 0
    this.render = function(ctx) {
      ctx.save()
      ctx.rotate(this.rotate)
      ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      )
      ctx.restore()
    }
    this.image.onload = function() {
      this.ready = true
    }
    this.image.src = this.src
  }

  function Planet() {
    this.ready = false
    this.image = new Image()
    this.src = "images/luna"
    this.radius = Math.floor(10 + 50 * Math.random())
    this.x = Math.floor((canvas.width - this.radius) * Math.random())
    this.y = Math.floor((canvas.height - this.radius) * Math.random())
    self = this
    this.render = function(ctx) {
      ctx.fillRect(
        this.x,
        this.y,
        this.radius,
        this.radius
      )
    }
    this.image.onload = function() {
      self.ready = true
      self.render(bgCtx)
    }
    this.image.src = this.src
  }

  var player = new Player()

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

  var keysDown = {}
  addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true
  }, false)
  addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode]
  }, false)

  function update(modifier) {
    var rotate = 0.0
    // up
    if (38 in keysDown) {
      player.y = Math.max(0, player.y - player.speed * modifier)
    }
    // down
    if (40 in keysDown) {
      player.y = Math.min(canvas.height-60, player.y + player.speed * modifier)
    }
    // left
    if (37 in keysDown) {
      player.x = Math.max(0, player.x - player.speed * modifier)
    }
    // right
    if (39 in keysDown) {
      player.x = Math.min(canvas.width-30, player.x + player.speed * modifier)
    }
    player.rotate = rotate
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "blue"
    for (let object of gameObjects) {
      object.render(ctx)
    }
  }

  function main() {
    var now = Date.now()
    var timeDelta = now - then

    update(timeDelta/1000.0)
    render()

    then = now

    requestAnimationFrame(main)
  }

  var then = Date.now()
  new Background()
  main()
})()
