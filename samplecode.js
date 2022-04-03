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
	/*
	test('setWeight', () => {  
		let rectangle= new Rectangle(10,1); 
			expect(sampleBranchFunction(-1),1);
        	expect(sampleBranchFunction(1),10);

		});
	*/
}

module.exports = Rectangle;
