import Vector from './Base/Vector'
import ImageObject from './Base/ImageObject'

class Planet extends ImageObject {
  constructor(environmentWidth, environmentHeight, ctx) {
    let radius = Math.floor(10 + 50 * Math.random())
    super(
      new Vector(
        Math.floor((environmentWidth - radius) * Math.random()),
        Math.floor((environmentHeight - radius) * Math.random())
      ),
      new Vector(radius, radius),
      "images/luna.png",
      {
        radius,
        environmentWidth,
        environmentHeight
      }
    )

    this.onLoad(() => this.render(ctx))

  }

  update() {

  }
}

export default Planet
