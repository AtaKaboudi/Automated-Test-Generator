const fs = require("fs");

function generateRandomValue(type) {
	//CASE UNDEFINED SELECT RANDOM INT
	if (type == undefined) {
		return Math.floor(Math.random() * 10);
	}
}
function template_match(a, b) {
	if (a.length != b.length) {
		return false;
	}
	for (i = 0; i < a.length; i++) {
		if (a[i].type != b[i]) {
			return false;
		}
	}
	return true;
}
function appendToTestFile(code) {
	fs.appendFile("./output.test.js", code, (err) => {
		if (err) {
			console.warn(err);
		}
	});
}

function importCode(path) {
	if (!path) {
		throw new Error("Provide File Path");
	}

	const code = fs.readFileSync(path[0]).toString();
	if (!code) {
		throw new Error("FilePath provided is Empty");
	}
	return code;
}

function traverse_and_find(target_type, path) {
	let found = false;

	//Searches in the array
	for (node of path) {
		if (node.type == target_type) {
			found = true;
			return node;
		}
	}

	//Expand last element in array and search in it a

	if (!found) {
		rot = path[path.length - 1];
		let res = traverse_find_recursive(rot, target_type);
		return res;
	}
}
function traverse_find_recursive(node, target) {
	if (node.type == target) {
		//	console.log("Matched", node.type);
		return node;
	}

	if (node.body) {
		if (node.body instanceof Array) {
			for (n of node.body) {
				return traverse_find_recursive(n, target);
			}
		} else {
			return traverse_find_recursive(node.body, target);
		}
	}
	if (node.value) {
		return traverse_find_recursive(node.value, target);
	}
	if (node.expression) {
		return traverse_find_recursive(node.expression, target);
	}
}

function getNbInput() {}

module.exports = {
	generateRandomValue,
	template_match,
	appendToTestFile,
	importCode,
	traverse_and_find,
};
