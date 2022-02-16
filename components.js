class Class_ {
	constructor(name) {
		this.name = name; // AS ID
		this.children = [];
	}
	appendChild(child) {
		this.children.push(child);
	}
	getChildren() {
		return this.children;
	}
	hasChildren() {
		return this.children.length > 0;
	}
	getId() {
		return this.name;
	}
}

class Function_ {
	constructor(name) {
		this.name = name;
		this.children = [];
	}
	appendChild(child) {
		this.children.push(child);
	}
	getChildren() {
		return this.children;
	}
	hasChildren() {
		return this.children.length > 0;
	}
	getId() {
		return this.name;
	}
}

class Assignement_ {
	constructor(variable, value, type) {
		this.variable = variable;
		this.value = value;
		this.type = type;
	}
	hasChildren() {
		return false;
	}
	getId() {
		return this.variable + " = " + this.value;
	}
}

class ReturnStatetment_ {
	constructor(variable) {
		this.variable = variable;
	}
	hasChildren() {
		return false;
	}
	getId() {
		return "return : " + this.variable;
	}
}

class Tree {
	roots = [];
	constructor() {}
	addRoot(r) {
		this.roots.push(r);
	}
	getRoots() {
		return this.roots;
	}

	constructTree() {
		var queue = [];
		for (let root of this.roots) {
			queue.push(root);
		}
		let index = 0;
		while (index < queue.length) {
			if (queue[index].hasChildren()) {
				let children = queue[index].getChildren();
				for (let child of children) {
					queue.push(child);
				}
			}
			index++;
		}
		return queue;
	}
	// Tryes to log the tree data relatively as a tree (per layyer if layers have same type (fct,class, variable ))
	logTree() {
		let queue = this.constructTree();
		for (let i = 0; i < queue.length; i++) {
			// first element is class we cannot comapre with i-1
			if (queue[i] instanceof Class_) {
				// use porcess.stdout because console.log by default makes new line after prompt
				process.stdout.write("\n                 " + queue[i].getId() + "\n");
				continue;
			}
			if (queue[i].constructor.name != queue[i - 1].constructor.name) {
				process.stdout.write("\n" + queue[i].getId());
			}
			if (queue[i].constructor.name == queue[i - 1].constructor.name) {
				process.stdout.write("     " + queue[i].getId());
			}
		}
	}
}
module.exports = {
	Class_: Class_,
	Function_: Function_,
	Assignment_: Assignement_,
	ReturnStatetment_: ReturnStatetment_,
	Tree,
};
