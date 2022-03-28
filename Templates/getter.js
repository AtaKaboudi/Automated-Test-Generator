const COMPONENTS = require("../components_");
const { getInput } = require("../InputManager");

const { appendToTestFile, traverse_and_find } = require("../utils");
class Getter_Template {
	validate_content(p) {
		// Validates that returns a class variable
		let returnStatement = traverse_and_find(COMPONENTS.Return_, p);
		if (!returnStatement) return false;
		return returnStatement.argument.object.type == COMPONENTS.ThisExpression;
	}
	generateTestCase(p) {
		console.log("[GENERATING TEST CASE FOR GETTER]");
		let functionName = traverse_and_find(COMPONENTS.Method_, p).key.name;

		let className = traverse_and_find(COMPONENTS.ClassDeclaration_, p).id.name;
		let instanceName = className.toLowerCase();
		let testCase = " \n";

		testCase += ` test("${functionName}", () => {
            let ${instanceName} = new ${className}(1, 2);
            expect(${instanceName}.${functionName}()).toBe(1);
        });;
        `;
		appendToTestFile(testCase);
	}
}

module.exports = Getter_Template;
