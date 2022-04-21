const COMPONENTS = require("../components_");
const { appendToTestFile, traverse_and_find } = require("../utils");
class Constructor_Template {
	name = "Constructor";
	validate_content(p) {
		let function_ = p[p.length - 1].value;

		return p[p.length - 1].key.name == "constructor";
	}
	generateTestCase(p) {
		console.log("[TEST GENERATOR] TEST CASE IN CLASS  CONSTRUCTOR");
		var testCase = "";
		var className = traverse_and_find(COMPONENTS.ClassDeclaration_, p).id.name;
		var instanceName = className.toLowerCase();

		testCase += `const ${className} = require('./samplecode') \n `;

		testCase += `test('${p[p.length - 1].key.name}', () => {  
		let ${instanceName}= new ${className}(1, 2); 

			expect(${instanceName}.height).toBe(1);  
			expect(${instanceName}.width).toBe(2); 
		});
		`;
		appendToTestFile(testCase);
	}
}

module.exports = Constructor_Template;
