import Vector from './Vector'

class GameObject {
  constructor(position = new Vector(), size = new Vector(), options = {}) {
    this.position = position
    this.size = size
    Object.keys(options).forEach(j => this[j] = options[j])
  }

  render(ctx = undefined) {
    if (ctx)
      console.log("render")
  }
}

export default GameObject
