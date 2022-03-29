const { template_match } = require("./utils");
const { traverse_and_find } = require("./utils");
const COMPONENTS = require("./components_");
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
				console.log(
					"[DISPATCHING]",
					traverse_and_find(COMPONENTS.Method_, p).key.name
				);
				t.generateTestCase(p);
			}
		}
	}
}
module.exports = Dispatcher;
