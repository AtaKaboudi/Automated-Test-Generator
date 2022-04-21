const COMPONENTS = require("../components_");
const { appendToTestFile, traverse_and_find } = require("../utils");
const { getBranchParams, getInput, formatInput } = require("../InputManager");

class Algebra_template {
	name = "Algebra";
	validate_content(p) {
		let returnStatement = traverse_and_find(COMPONENTS.Return_, p);
		if (!returnStatement) return false;
		let operator = returnStatement.argument.operator;
		if (!operator) return false;
		if (
			operator == "+" ||
			operator == "-" ||
			operator !== "/" ||
			operator !== "*" ||
			operator !== "%"
		)
			return true;
	}

	generateTestCase(p) {
		console.log("[TEST GENERATOR] TEST CASE IN CLASS ALGEBRA");
		var functionName = traverse_and_find(COMPONENTS.Method_, p).key.name;
		let operator = traverse_and_find(COMPONENTS.Return_, p).argument.operator;
		let className = traverse_and_find(COMPONENTS.ClassDeclaration_, p).id.name;
		let instanceName = className.toLowerCase();

		/* Handling Input */
		let params = traverse_and_find(COMPONENTS.Function_, p).params;
		var nb_params = params.length;
		var input = getInput(nb_params, "int", false);
		let input_string = formatInput(input);

		let tobe = "";
		for (let param of input) {
			tobe += param + operator;
		}
		tobe = tobe.substring(0, tobe.length - 1);

		let testCase = " \n";

		testCase += `test('${functionName}', () => { \n;
            let ${instanceName} = new ${className}(1, 2);
		    expect(rectangle.${functionName}${input_string}).toBe(${tobe});
        }); \n`;

		appendToTestFile(testCase);

		/*
        test('constructor', () => {  
	let rectangle= new Rectangle(1, 2); 

		expect(rectangle.add(1,2)).toBe(1);  
	});
    */
	}
}
module.exports = Algebra_template;
