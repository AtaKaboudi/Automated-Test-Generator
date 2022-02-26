const { Assignment_, ConstructorAssignment_ } = require("./components");
// Given a root and a variabel name it finds the type {string,int} of the variable
function findType(root, name) {
	if (root instanceof Assignment_ || ConstructorAssignment_) {
		if (root.name == name) {
			return root.type;
		}
	}
}

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
	fs.writeFile("./testFile.js", code, (err) => {
		console.warn(err);
	});
}
module.exports = {
	findType,
	generateRandomValue,
	template_match,
	appendToTestFile,
};
