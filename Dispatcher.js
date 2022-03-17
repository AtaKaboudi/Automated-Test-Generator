const { template_match } = require("./utils");

class Dispatcher {
	constructor() {
		this.templates = [];
	}
	addTemplate(t) {
		this.templates.push(t);
	}
	dispatch(p) {
		for (let t of this.templates) {
			if (t.validate_content(p)) {
				t.generateTestCase(p);
			}
		}
	}
}
module.exports = Dispatcher;
