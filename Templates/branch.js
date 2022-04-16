const COMPONENTS = require("../components_");
const { appendToTestFile, traverse_and_find } = require("../utils");
const { getBranchParams } = require("../InputManager");
class Branch_template {
  validate_content(p) {
    let ifStatement = traverse_and_find(COMPONENTS.IfStatement, p);
    if (!ifStatement) return false;
    return true;
  }

  generateTestCase(p) {
    let ifStatement = traverse_and_find(COMPONENTS.IfStatement, p);
    let params = getBranchParams(ifStatement);
    console.log(params);
  }
}

module.exports = Branch_template;
