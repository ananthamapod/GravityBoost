import Vector from './Base/Vector'
import ImageObject from './Base/ImageObject'

class Background extends ImageObject {
  constructor(environmentWidth, environmentHeight, ctx) {
    super(new Vector(),
      new Vector(environmentWidth, environmentHeight),
      "images/background.jpg"
    )

    this.onLoad(() => {
      this.render(ctx)
    })
  }

  render(ctx) {
    console.log(this)
    super.render(ctx)
  }
}

export default Background
