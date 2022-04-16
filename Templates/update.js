const { appendToTestFile, traverse_and_find } = require("../utils");
const COMPONENTS = require("../components_");
const { getInput } = require("../InputManager");
const components_ = require("../components_");

class Update_Template {
  validate_content(p) {
    let assignment_ = traverse_and_find(COMPONENTS.Assignment_, p);
    if (!assignment_) return false;
    console.log(assignment_.left);
    if (assignment_.left.object.type != COMPONENTS.ThisExpression) return false;
    let function_ = traverse_and_find(COMPONENTS.Function_, p);
    if (!assignment_.right.left || !assignment_.right.right) return false;
    if (function_.params.length == 0) return false;

    if (
      assignment_.right.left.object.type == COMPONENTS.ThisExpression ||
      assignment_.right.right.object.type == COMPONENTS.ThisExpression
    ) {
      return true;
    }
    return false;
  }

  generateTestCase(p) {
    console.log("[GENERATING TEST CASE IN CLASS UPDATOR]");
    let functionName = traverse_and_find(COMPONENTS.Method_, p).key.name;

    let className = traverse_and_find(COMPONENTS.ClassDeclaration_, p).id.name;
    let instanceName = className.toLowerCase();
    let variable_to_set = traverse_and_find(COMPONENTS.Assignment_, p).left
      .name;
    console.log(variable_to_set);
    let testCase = " \n";

    /* Handling Input */

    var nb_params = traverse_and_find(COMPONENTS.Function_, p).params.length;
    var input_string = getInput(nb_params, "int");

    testCase = "";
    testCase += `test('${functionName}', () => {  
		let ${instanceName} = new  ${className}(1000, 2);
		let old_value = ${instanceName}.getHeight();
		rectangle.${functionName}${input_string};
		console.log(old_value)
		expect(rectangle.getHeight()).toBe(old_value - ${input_string});

		});`;

    appendToTestFile(testCase);
  }
}

module.exports = Update_Template;
