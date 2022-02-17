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

var code = importCode();
var astTree = parseCode(code);
var TestTree = new Tree();

// BUG FIXING VARIABLES
var processedFunctions = [];
let alreadyDeclared = [];

function traverse(tree, params) {
	console.log("--------------------------------------------------");
	let block = tree.body;

	for (items of block) {
		// Deals with Class _____ {}
		if (items.type === CLASS_TYPE) {
			let a = new Class_(items.id.name);
			params.class = a;
			traverse(items.body, { class: a });
			TestTree.addRoot(a);
		}

		//Deals with function _____ (){}
		if (items.type === METHOD_TYPE) {
			let f = new Function_(items.key.name);
			params.function = f;
			traverse(items.value.body, params);
			params.class.appendChild(f);
		}

		if (items.type === STATEMENT_TYPE) {
			traverse(items.body, params);
		}

		// Deals with var ___ = ____
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

		//Deals with return _____
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
		// INTERMIDIARY FOR ALL EXPRESSION STATEMENTS
		if (items.type === EXPRESSION_STATEMENT_TYPE) {
			// FORMAT THE return because tree.body line withh throw error
			traverse({ body: [items.expression] }, params);
		}
		if (items.type === ASSIGNMENT_EXPRESSION_TYPE) {
			// TODO EXPAND TO OTHER OPERATORS BESIDE =

			// HACK TO FIX AT SOME POINT
			let name = items.left.property.name;
			if (alreadyDeclared.includes(name)) {
				continue;
			}
			alreadyDeclared.push(name);

			let aux = new ConstructorAssignment_(name);
			params.function.appendChild(aux);
		}
	}
}

function generateTestCase(type, class_, function_, variable_) {
	let testCode = "";
	if (type === "GET") {
		// USE TEMPALTE  to avoid program specific details

		testCode += "test_" + class_.name + " { \n";
		testCode += "let a = new " + class_.name + "() \n";
		testCode +=
			"console.assert(a." + function_.name + "(),a." + variable_.variable + ")";
		testCode += " \n } \n";
	}
	if (type === "SET") {
		/*
           test _ (){
           let a = new claaName 
            a.set(1)

           }
        */
		testCode += "test_" + class_.name + "{ \n";
		testCode += "let a = new " + class_.name + "() \n";
		let randomValue = generateRandomValue(findType(variable_.variable));
		testCode += "a." + function_.name + "(" + randomValue + ") \n";
		testCode +=
			"console.assert(a." + variable_.variable + ", " + randomValue + ")";
	}
	//appendToTestFile(testCode);
}

traverse(astTree, {});
let class_ = TestTree.getRoots()[0];
let function_ = class_.getChildren()[2];
let variable_ = function_.getChildren();
console.log(astTree.body[0].body.body[2].value);
//console.log(function_);
//generateTestCase("SET", class_, function_, variable_);

function appendToTestFile(code) {
	fs.writeFile("./testFile.js", code, (err) => {
		console.warn(err);
	});
}
