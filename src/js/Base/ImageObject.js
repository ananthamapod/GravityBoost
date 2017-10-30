import Vector from './Vector'
import GameObject from './GameObject'

class ImageObject extends GameObject {
  constructor(position = new Vector(0,0), size = new Vector(0,0), src = undefined, options = {}) {
    super(position, size, options)
    if (!src && !options.hasOwnProperty("src")) {
      throw new TypeError("Image object does not have image source")
    }

    this.image = new Image()
    this.ready = false
    this.image.src = src
  }

  render(ctx = undefined) {
    // super.render(ctx)
    if (this.ready) {
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.size.x,
        this.size.y
      )
    }
  }

  onLoad(cb) {
    this.image.addEventListener("load", () => {
      this.ready = true
      cb()
    })
    this.image.addEventListener("error", () => console.log("error"))
  }
}

export default ImageObject
