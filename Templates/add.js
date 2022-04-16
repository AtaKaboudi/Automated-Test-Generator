// const COMPONENTS = require("../components_");
// const { getInput } = require("../InputManager");

// const { appendToTestFile, traverse_and_find } = require("../utils");
// class Add_Template {
//   validate_content(p) {
//     let assignment_ = traverse_and_find(COMPONENTS.Assignment_, p);
//     console.log(assignment_);
//     if (!assignment_) return false;
//     let thisexp = traverse_and_find(COMPONENTS.ThisExpression, p);
//     if (!thisexp) {
//       return true;
//     }
//     let memexp = traverse_and_find(COMPONENTS.MemberExpression, p);
//     if (!memexp) {
//       return true;
//     }
//     return false;
//   }
//   generateTestCase(p) {
//     console.log("[GENERATING TEST CASE IN CLASS Adder]");
//     let functionName = traverse_and_find(COMPONENTS.Method_, p).key.name;

//     let className = traverse_and_find(COMPONENTS.ClassDeclaration_, p).id.name;
//     let instanceName = className.toLowerCase();
//     let testCase = " \n";

//     var nb_params =
//       traverse_and_find(COMPONENTS.Function_, p).params.length - 1;
//     var input_string = getInput(nb_params, "int");
//     var input_string2 = getInput(nb_params, "int");

//     testCase += ` test("${functionName}", () => {
//             expect(${functionName}()).toBe(${input_string} + ${input_string2});
//         });;
//         `;
//     appendToTestFile(testCase);
//   }
// }

// module.exports = Add_Template;
