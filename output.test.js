const Rectangle = require("./samplecode");
test("constructor", () => {
	let rectangle = new Rectangle(1, 2);

	expect(rectangle.height).toBe(1);
	expect(rectangle.width).toBe(2);
});

test("getHeight", () => {
	let rectangle = new Rectangle(1, 2);
	expect(rectangle.getHeight()).toBe(1);
});

test("setWeight", () => {
	let rectangle = new Rectangle(1, 2);
	rectangle.setWeight(3);
	expect(rectangle.height).toBe(3);
});
