const fs = require("fs");
var esprima = require("esprima");
const {
	ReturnStatetment_,
	Class_,
	Function_,
	Assignment_,
	Tree,
} = require("./components.js");

CLASS_TYPE = "ClassDeclaration";
METHOD_TYPE = "MethodDefinition";
STATEMENT_TYPE = "BlockStatement";
DECLARATION_TYPE = "VariableDeclaration";
RETURN_TYPE = "ReturnStatement";
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

var code = importCode();
var astTree = parseCode(code);
var TestTree = new Tree();
var processedFunctions = [];

function traverse(tree, params) {
	console.log("--------------------------------------------------");
	let block = tree.body;
	for (items of block) {
		if (items.type === CLASS_TYPE) {
			let a = new Class_(items.id.name);
			traverse(items.body, { class: a });
			TestTree.addRoot(a);
		}

		if (items.type === METHOD_TYPE) {
			let f = new Function_(items.key.name);
			params.function = f;
			traverse(items.value.body, params);
			params.class.appendChild(f);
		}
		if (items.type === STATEMENT_TYPE) {
			traverse(items.body, params);
		}
		if (items.type === DECLARATION_TYPE) {
			let kind = items.kind;
			let variable = items.declarations[0].id.name;
			let value = items.declarations[0].init.value;
			let aux = new Assignment_(variable, value, kind);
			if (params.function) {
				params.function.appendChild(aux);
			} else {
				params.class.appendChild(aux);
			}
		}
		if (items.type === RETURN_TYPE) {
			//Due to duplciate returnes per function we will record list of functions for which return statemnt is processed

			if (processedFunctions.includes(params.function)) {
				//this if for the second return statemnt to sayi already have you
				continue;
			}

			let return_variable_name = items.argument.property.name;
			let aux = new ReturnStatetment_(return_variable_name);
			if (params.function) {
				params.function.appendChild(aux);
				processedFunctions.push(params.function);
			} else {
				console.warn("Return Statement Outside of function");
			}
		}
	}
}

function generateTestCase(type, class_, function_, variable_) {
	let testCode = "";
	if (type === "GET") {
		testCode += "test_" + class_.name + " { \n";
		testCode += "let a = new " + class_.name + "() \n";
		testCode +=
			"console.assert(a." + function_.name + "(),a." + variable_ + ")";
		testCode += " \n } \n";
		console.log(testCode);
	}
}

traverse(astTree, {});
let class_ = TestTree.getRoots()[0];
let function_ = class_.getChildren()[1];
let variable_ = function_.getChildren()[0].variable;
generateTestCase("GET", class_, function_, variable_);
