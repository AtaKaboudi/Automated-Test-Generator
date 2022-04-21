const { template_match } = require("./utils");
const { traverse_and_find } = require("./utils");
const COMPONENTS = require("./components_");
class Dispatcher {
	constructor() {
		this.totalFunctions = 0;
		this.distribution = [];
		this.templates = [];
	}
	addTemplate(t) {
		this.templates.push(t);
		this.distribution.push({ name: t.name, count: 0 });
	}

	findTempalteIndexByName(name) {
		let i = 0;

		for (let t of this.distribution) {
			if (t.name == name) {
				return i;
			}
			i++;
		}
		return -1;
	}
	dispatch(p) {
		for (let t of this.templates) {
			if (t.validate_content(p)) {
				console.log(
					" \n [DISPATCHING] function name : ",
					traverse_and_find(COMPONENTS.Method_, p).key.name
				);
				t.generateTestCase(p);
				this.totalFunctions++;
				let pos = this.findTempalteIndexByName(t.name);
				this.distribution[pos].count++;
				break;
			}
		}
	}
	report() {
		console.log("\n \n    [REPORT] ");
		console.log("TOTAL FUNCTIONS GENERATED : ", this.totalFunctions);
		console.log("DISTRIBUTION : ");
		for (let p in this.distribution) {
			console.log(this.distribution[p].name, " : ", this.distribution[p].count);
		}

		console.log(" \n Run npm test to see test report");
	}
}
module.exports = Dispatcher;
