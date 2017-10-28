import Vector from './Vector'
import GameObject from './GameObject'

class ImageObject extends GameObject {
  constructor(position = new Vector(0,0), size = new Vector(0,0), options = {}) {
    super(position, size, options)
    if (!options.hasOwnProperty(image)) {
      throw new TypeError("Image object does not have image source")
    }

    this.image.src = this.src
  }

  render(ctx = undefined) {
    super.render(ctx)
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    )
  }

  onLoad(cb) {
    this.image.onload = () => {
      this.ready = true
      cb()
    }
  }
}

export default ImageObject
