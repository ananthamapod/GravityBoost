import Vector from './Vector'

class GameObject {
  constructor(position = new Vector(0,0), size = new Vector(0,0), options = {}) {
    this.postion = position
    this.position = size
    options.forEach(j => this[j] = options[j])
  }

  render(ctx = undefined) {
    if (ctx)
      console.log("render")
  }
}

export default GameObject
