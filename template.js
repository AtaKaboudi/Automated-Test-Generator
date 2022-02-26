var { template_match } = require("./utils");
var COMPONENTS = require("./components_");
const { strictEqual } = require("assert");

let OBSERVERS = [];
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
	find_in_sequence(type) {
		if (!this.sequence) {
			return;
		}
		let res = [];
		for (let s of this.sequence) {
			if (s.type == type) {
				res.push(s);
			}
		}
		return res;
	}

	validateContent(sequence) {
		this.sequence = sequence;
		// VALIDATES THAT AT LEAST ONE OF THE PARAMS IS ASSIGNMENT TO THE CLASS PARAMS
		let block_ = this.find_in_sequence(COMPONENTS.Block_);
		let function_ = this.find_in_sequence(COMPONENTS.Function_);

		let validate = true;
		//Get function params

		let params = [];
		for (p in function_.params) {
			params.push(p.name);
		}
		for (blk of block_.body) {
			assignment = blk.expression;
			if (
				params.includes(assignment.right.name) &&
				assignment.left.object.type == COMPONENTS.ThisExpression
			) {
				return true;
			}
		}
		return false;
	}
}

//let constructor_ = new Template("COSNTRCUTOR", []);
class Observer {
	constructor(cl) {
		this.validateContent = cl.validateContent;
		this.pattern = cl.pattern;
		this.sequence = [];
		OBSERVERS.push(this);
	}

	observe_and_match(node) {
		this.sequence.push(node);
		//this.displaySequence();

		if (
			this.sequence[this.sequence.length - 1].type !=
			this.pattern[this.sequence.length - 1]
		) {
			this.sequence = [];
		}
		if (template_match(this.sequence, this.pattern)) {
			// TO This point the structure of the getter is there but still need Getter Validation
			this.validateContent(this.sequence);
		}
	}
	displaySequence() {
		let str = "";
		for (let a of this.sequence) {
			str += a.type + " ";
		}
		console.log(str);
	}
}
let constructor_class = new Constructor_Template();
let Observer_ = new Observer(constructor_class);
module.exports = OBSERVERS;
