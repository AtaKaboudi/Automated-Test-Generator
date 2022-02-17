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

module.exports = {
	findType,
	generateRandomValue,
};
