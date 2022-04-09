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

	sampleBranchFunction(a) {
		if (a == 2) {
			return this.height;
		} else if (a < 0) {
			return this.width;
		}
	}
	sampleUpdateFunction(a) {
		this.height = this.height - a;
	}
	/*
	test('sampleUpdateFunction', () => {  
		let rectangle = new Rectangle(3, 2);
		let old_value = rectangle.getHeight();
		rectangle.sampleUpdateFunction(1);
		expect(this.height).toBe(old_value - 1);

		});
	*/
}

module.exports = Rectangle;
