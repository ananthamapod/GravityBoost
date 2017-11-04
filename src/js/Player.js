import Vector from './Base/Vector'
import ImageObject from './Base/ImageObject'

class Player extends ImageObject {
  constructor(environmentWidth, environmentHeight) {
    super(
      new Vector(environmentWidth/2 - 30, environmentHeight/2 - 70),
      new Vector(30, 70),
      "images/player.png",
      {
        speed: new Vector(),
        acceleration: 20,
        drag: 10,
        maxSpeed: 300,
        rotate: 0,
        environmentWidth,
        environmentHeight
      }
    )
  }

  render(ctx) {
    ctx.save()
    super.render(ctx)
    ctx.restore()
  }

  update(directions, modifier) {
    let delta = new Vector()
    // NOTE: since (0,0) is in the top left,
    // deltas might seem opposite to what is intuitive
    if (directions.hasOwnProperty("up")) {
      delta.y--
    }
    if (directions.hasOwnProperty("down")) {
      delta.y++
    }
    if (directions.hasOwnProperty("left")) {
      delta.x--
    }
    if (directions.hasOwnProperty("right")) {
      delta.x++
    }

    this.speed.x = Math.clamp(
      this.speed.x + (delta.x * this.acceleration - Math.sign(this.speed.x) * this.drag),
      this.maxSpeed,
      -this.maxSpeed
    )
    this.speed.y = Math.clamp(
      this.speed.y + (delta.y * this.acceleration - Math.sign(this.speed.y) * this.drag),
      this.maxSpeed,
      -this.maxSpeed
    )

    // position resolution
    this.position.x = Math.clamp(this.position.x + this.speed.x * modifier, this.environmentWidth-30, 0)
    this.position.y = Math.clamp(this.position.y + this.speed.y * modifier, this.environmentHeight-60, 0)
  }
}

export default Player
