const Rectangle = require('./samplecode') 
 test('constructor', () => {  
		let rectangle= new Rectangle(1, 2); 

			expect(rectangle.height).toBe(1);  
			expect(rectangle.width).toBe(2); 
		});
		test('sampleUpdateFunction', () => {  
		let rectangle = new  Rectangle(1000, 2);
		let old_value = rectangle.getHeight();
		rectangle.sampleUpdateFunction(12);
		console.log(old_value)
		expect(rectangle.getHeight()).toBe(old_value - (12));

		}); 
 test("getHeight", () => {
            let rectangle = new Rectangle(1, 2);
            expect(rectangle.getHeight()).toBe(1);
        });;
         
test('setWeight', () => {  
		let rectangle= new Rectangle(1,1); 
            rectangle.setWeight(62)
			expect(rectangle.height).toBe(62);  
		});
		