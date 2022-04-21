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

	UpdateFunction(a) {
		this.height = this.height - a;
	}
	add(a, b) {
		return a + b;
	}
	substract(a, b) {
		return a - b;
	}
	divide(a, b) {
		return a / b;
	}
	multiply(a, b) {
		return a * b;
	}
	modulo(a, b) {
		return a % b;
	}
	sampleBranchFunction(a) {
		if (a == 2) {
			return 1;
		} else {
			return 2;
		}
	}
	sampleBranchFunction_A(a) {
		if (a < 5) {
			return 0;
		} else {
			return 2;
		}
	}
}

module.exports = Rectangle;
