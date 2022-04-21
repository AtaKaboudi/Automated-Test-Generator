const { appendToTestFile, traverse_and_find } = require("../utils");
const COMPONENTS = require("../components_");
const { CallStatement } = require("../components_");

class String_Ops_Templates {
	name = "String";
	equivalent(op, arg) {
		switch (op) {
			case "concat":
				return arg.map((a) => `"${a}"`).join(" + ");
		}
	}
	validate_content(p) {
		console.log("[TEST GENERATOR] TEST CASE IN CLASS STRING");

		let returnStatement = traverse_and_find(COMPONENTS.Return_, p);

		if (!returnStatement) return false;

		if (!returnStatement.argument) return false;

		if (!returnStatement.argument.arguments) return false;

		// checking following : return string.string operation
		if (returnStatement.argument.type != COMPONENTS.CallStatement) {
			return false;
		}

		let operation =
			returnStatement.argument.callee.name ||
			returnStatement.argument.callee.property.name;
		console.log(
			this.equivalent(
				operation,
				returnStatement.argument.arguments.map((a) => a.name)
			)
		);
	}

	generateTestCase(p) {}
}

module.exports = String_Ops_Templates;
