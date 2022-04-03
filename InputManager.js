function getInput(n, type) {
	if (n == 0) {
		return;
	}
	let result = [];
	if (type == "int") {
		for (let i = 0; i < n; i++) {
			result[i] = Math.floor(Math.random() * 100);
		}
		return formatInput(result);
	}
	if (type == "string") {
		for (let i = 0; i < n; i++) {
			result[i] = Math.floor(Math.random() * 100).toString();
		}
		return formatInput(result);
	}

	console.log(
		"[INPUT GENERATOR] ERROR: Failed to generate input for type: " + type
	);
	return null;
}

function formatInput(values) {
	/* transforms array  [1,2,3] to  string "(1,2,3)" */
	let response = "(";
	for (let i = 0; i < values.length; i++) {
		response += values[i];
		if (i != values.length - 1) {
			response += ",";
		}
	}
	return response + ")";
}

function getBranchParams(branch) {
	let operator = branch.test.operator;
	let left = branch.test.left;
	let right = branch.test.right;
	if ((left.type == "Identifier") & (right.type == "Identifier")) {
		throw Error(
			"[ BRANCH PARAMS]  cannot handle boolean expressions with 2 Identifier"
		);
	}
	let Literal = left.type == "Literal" ? left : right;
	if (typeof Literal.value == "number") {
		return findParamsInt(operator, Literal);
	}
	if (typeof Literal.value == "string") {
		return findParamsString(operator, Literal);
	}
	return false;
}

function findParamsInt(op, literal) {
	// given the operator and the literal, find the params that will cover both true,false output of the operator
	if ((op == "<") | (op == ">")) return [literal.value + 1, literal.value - 1];
	if ((op == "==") | (op == "!=")) return [literal.value, literal.value + 1];
}
function findParamsString(op, literal) {
	// given the operator and the literal, find the params that will cover both true,false output of the operator
}

module.exports = { getInput, getBranchParams };
