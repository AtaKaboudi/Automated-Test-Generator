const fs = require("fs");
var esprima = require("esprima");
const {
	ReturnStatetment_,
	Class_,
	Function_,
	Assignment_,
	Tree,
	ConstructorAssignment_,
} = require("./components.js");
const { findType, generateRandomValue } = require("./utils");
const OBSERVERS = require("./template.js");
const { Console } = require("console");

// CONSTANT TYPE USED BU ESPIMA LIBRARY
CLASS_TYPE = "ClassDeclaration";
METHOD_TYPE = "MethodDefinition";
STATEMENT_TYPE = "BlockStatement";
DECLARATION_TYPE = "VariableDeclaration";
RETURN_TYPE = "ReturnStatement";
EXPRESSION_STATEMENT_TYPE = "ExpressionStatement";
ASSIGNMENT_EXPRESSION_TYPE = "AssignmentExpression";

// file path in console
var args = process.argv.slice(2);

function importCode() {
	let args = process.argv.slice(2);
	if (!args) {
		throw new Error("Provide File Path");
	}

	const code = fs.readFileSync(args[0]).toString();
	if (!code) {
		throw new Error("FilePath provided is Empty");
	}
	return code;
}

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

var code = importCode();
var astTree = parseCode(code);
traverse(astTree);
//console.log(astTree.body[0].body.body[0].value.body.body[0]);
