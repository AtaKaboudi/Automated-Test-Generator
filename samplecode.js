class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  getHeight() {
    return this.height;
  }

  setWeight(h) {
    this.height = h;
  }
  updateheight(h) {
    var heights = this.getHeight();
    this.height = h + heights;
  }
}

module.exports = Rectangle;
