const COMPONENTS = require("../components_");

class Constructor_Template {
	constructor(id, p, vf) {
		this.id = "GETTER";
		this.pattern = [
			COMPONENTS.ClassDeclaration_,
			COMPONENTS.ClassBody_,
			COMPONENTS.Method_,
			COMPONENTS.Function_,
			COMPONENTS.Block_,
		];
		this.sequence = [];
	}
	setSequence(s) {
		this.sequence = s;
	}

	validateContent() {
		// VALIDATES THAT AT LEAST ONE OF THE PARAMS IS ASSIGNMENT TO THE CLASS PARAMS
		let block_ = this.find_in_sequence(COMPONENTS.Block_)[0];
		let function_ = this.find_in_sequence(COMPONENTS.Function_)[0];

		let validate = true;
		//Get function params

		let params = [];
		for (let p of function_.params) {
			params.push(p.name);
		}
		for (let blk of block_.body) {
			let assignment = blk.expression;
			if (
				params.includes(assignment.right.name) &&
				assignment.left.object.type == COMPONENTS.ThisExpression
			) {
				return true;
			}
		}
		return false;
	}

	generateTestCase() {
		console.log("[GENERATING TEST CASE FOR ]", this.id);
	}
}

module.exports = Constructor_Template;
