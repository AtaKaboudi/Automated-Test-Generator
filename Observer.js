const { template_match } = require("./utils");

class Observer {
	constructor(cl) {
		this.setSequence = cl.setSequence;
		this.generateTestCase = cl.generateTestCase;
		this.validateContent = cl.validateContent;
		this.pattern = cl.pattern;
		this.sequence = [];
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
			if (!this.validateContent()) {
				return;
			}
			console.log("[OBSERVER] FOUND MATCH");

			this.generateTestCase();
			this.sequence = [];
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

module.exports = Observer;
