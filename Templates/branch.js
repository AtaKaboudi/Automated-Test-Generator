const COMPONENTS = require("../components_");
const { appendToTestFile, traverse_and_find } = require("../utils");
const { getBranchParams, getInput } = require("../InputManager");
class Branch_template {
	name = "Branch";
	validate_content(p) {
		let ifStatement = traverse_and_find(COMPONENTS.IfStatement, p);
		if (!ifStatement) return false;
		return true;
	}

	generateTestCase(p) {
		console.log("[TEST GENERATOR] TEST CASE IN CLASS BRANCH");
		let ifStatement = traverse_and_find(COMPONENTS.IfStatement, p);
		var functionName = traverse_and_find(COMPONENTS.Method_, p).key.name;

		// LOAD PARAMETER VALUES
		let functionParams = getBranchParams(ifStatement);
		let classParamsString = getInput(2, "int", true);
		let testCase = "";

		// LOAD EXPECTED VALUES
		let tobe_values = [];
		tobe_values.push(ifStatement.consequent.body[0].argument.value);
		tobe_values.push(ifStatement.alternate.body[0].argument.value);

		let i = 0;
		for (let param of functionParams) {
			testCase += `test('${functionName}', () => {
			let rectangle= new Rectangle${classParamsString}; 
			expect(rectangle.${functionName}(${param})).toBe(${tobe_values[i]}); \n
			});`;
			appendToTestFile(testCase);
			i++;
		}
	}
}

module.exports = Branch_template;
