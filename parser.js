var esprima = require("esprima");
const { findType, generateRandomValue, importCode } = require("./utils");
const Constructor_Template = require("./Templates/constructor");
const Observer = require("./Observer");

let OBSERVERS = [];
// INSTANCIATING CLASSES AND OBSERVERS
let constructor_class = new Constructor_Template();
let Observer_ = new Observer(constructor_class);
OBSERVERS.push(Observer_);

function parseCode(code) {
	var tree = esprima.parseScript(code);
	return tree;
}

function broadcast(node) {
	for (t of OBSERVERS) {
		t.observe_and_match(node);
	}
}

function traverse(node) {
	broadcast(node);
	if (node.body) {
		if (node.body instanceof Array) {
			for (n of node.body) {
				traverse(n);
			}
		} else {
			traverse(node.body);
		}
	}
	if (node.value) {
		traverse(node.value);
	}
	if (node.expression) {
		traverse(node.expression);
	}
}
var path = process.argv.slice(2);

var code = importCode(path);
var astTree = parseCode(code);
traverse(astTree);
//console.log(astTree.body[0].body.body[0].value.body.body[0]);
