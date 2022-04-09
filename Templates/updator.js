const COMPONENTS = require("../components_");
const { appendToTestFile, traverse_and_find } = require("../utils");
const { getInput } = require("../InputManager");
const components_ = require("../components_");
class Updator_Template {
  validate_content(p) {
    //  THAT AT LEAST ONE OF THE PARAMS IS ASSIGNMENT TO THE CLASS PARAMS
    let function_ = p[p.length - 1].value;

    // as constructors share the same function content as setters we return false if name is constructor

    if (traverse_and_find(COMPONENTS.Method_, p).key.name == "constructor") {
      return false;
    }
    if (traverse_and_find(COMPONENTS.Method_, p).key.name == "setter") {
      return false;
    }
  }
  generateTestCase(p) {
    let functionName = traverse_and_find(COMPONENTS.Method_, p).key.name;

    let className = traverse_and_find(COMPONENTS.ClassDeclaration_, p).id.name;
    let instanceName = className.toLowerCase();

    let testCase = " \n";
    console.log("[GENERATING TEST CASE IN CLASS UPDATOR]");

    /* Handling Input */

    var nb_params = traverse_and_find(COMPONENTS.Function_, p).params.length;
    var input_string = getInput(nb_params, "int");

    testCase += `test('${functionName}', () => {  
		let ${instanceName}= new ${className}(1,1); 
            ${instanceName}.${functionName}${input_string}
			expect(${instanceName}.${variable_to_set}).toBe${input_string};  
		});
		`;

    appendToTestFile(testCase);
  }
}

module.exports = Updator_Template;
