var esprima = require("esprima");
const { findType, generateRandomValue, importCode } = require("./utils");
const COMPONENTS = require("./components_");
const Constructor_Template = require("./Templates/constructor");
const Setter_Template = require("./Templates/setter");
const Getter_Template = require("./Templates/getter");
const dispatcher = require("./Dispatcher");

function parseCode(code) {
	var tree = esprima.parseScript(code);
	return tree;
}

function traverse(node, path) {
	path.push(node);
	if (node.type == COMPONENTS.Method_) {
		Dispatcher.dispatch(path);
	}

	if (node.body) {
		if (node.body instanceof Array) {
			for (n of node.body) {
				traverse(n, [...path]);
			}
		} else {
			traverse(node.body, path);
		}
	}
	if (node.value) {
		traverse(node.value, path);
	}
	if (node.expression) {
		traverse(node.expression, path);
	}
}

const Dispatcher = new dispatcher();

constructor_ = new Constructor_Template();
setter_ = new Setter_Template();
getter_ = new Getter_Template();

Dispatcher.addTemplate(constructor_);
Dispatcher.addTemplate(setter_);
Dispatcher.addTemplate(getter_);

var path = process.argv.slice(2);

var code = importCode(path);
var astTree = parseCode(code);
traverse(astTree, []);
//console.log(astTree.body[0].body.body[0].value.body.body[0]);
