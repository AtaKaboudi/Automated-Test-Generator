const COMPONENTS = require("../components_");
const { appendToTestFile, traverse_and_find } = require("../utils");
class Constructor_Template {
  validate_content(p) {
    let function_ = p[p.length - 1].value;

    return p[p.length - 1].key.name == "constructor";

    //  THAT AT LEAST ONE OF THE PARAMS IS ASSIGNMENT TO THE CLASS PARAMS
    /*
		let function_ = p[p.length - 1].value;
		let block_ = p[p.length - 1].value.body;
		if (!block_ || !function_ || !function_.params || !block_.body) {
			return false;
		}
		let validate = true;
		//Get function params
		let params = [];
		for (let p of function_.params) {
			params.push(p.name);
		}
		for (let blk of block_.body) {
			if (!blk.expression) {
				return false;
			}
			let assignment = blk.expression;
			if (
				params.includes(assignment.right.name) &&
				assignment.left.object.type == COMPONENTS.ThisExpression
			) {
				return true;
			}
		}
*/
  }
  generateTestCase(p) {
    console.log("[GENERATING TEST CASE IN CLASS  CONSTRUCTOR]");
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
