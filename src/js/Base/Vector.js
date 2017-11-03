class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  add(v2 = new Vector()) {
    return new Vector(this.x + v2.x, this.y + v2.y)
  }

  subtract(v2 = new Vector()) {
    return new Vector(this.x - v2.x, this.y - v2.y)
  }

  dotproduct(v2 = new Vector()) {
    return this.x * v2.x + this.y * v2.y
  }

  crossproduct(v2 = new Vector()) {
    return new Vector(this.x * v2.y, -1 * this.y * v2.x)
  }

  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
}

export default Vector
