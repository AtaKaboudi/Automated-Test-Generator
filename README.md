# Automated-Test-Generator

This project aims to automate test cases generation while ensuring maximum coverage

Samplecode.js contains the sample class ofr which we will be genrating the test cases. In it is implemented
a simple class wth a constructer getter and setter.

Parser.js accesses the source code of the program and extracts the AST using esprima tool.
Furthermore it then traverses through the AST and dispatches all the method nodes found using the Dispatcher.js. In this contewt we implemented an Observer Design pattern. We chose this apttern as each type a function has a corresponding JEST Test syntaxe and we will try to generalize as much as we can the function within their
own class.


./Template containes an implementation of various Methods tempaltes that could be present in the srouce code.
This folder containes the main baseline for extension and innovation as our dependency will be more efficient
as more tempaltes are implemented.

Each templates contains 2 functions,
validate-content: When each template/Observer receives the dispatched method it scans it's code and determine if that function fits the template or not.
generate-test-cases: If a Methods matches the template, it gets forwared to this function where it
the corresponding test case get generated and written in the output.test.js file

output.test.js Containes the final output , the program writes in it the generated test cases for jest framework to run

utils.js contains main utilities to be used throughout the classes.

TestManager.js this class has no functionalities test. But the idea behind it is that it will manage the
test files as the input soruce code can consist of different inter-dependant classes. This function will also
manage the import of centralized dependencies

InputManager.js : is a utilities that is leveraged by each template while generating the test cases.
it returns random values to be used as test generation parameters.

---------------------------- SAMPLE FUNCTION EXAMPLE ----------------------------------------

for instanc let's consider this function

    setWeight (value){
        this.weight = value
    }

The corresponding jest test case is the following

        test('setWeight', () => {
    	let rectangle= new Rectangle(1,1);
            rectangle.setWeight(75)
    		expect(rectangle.height).toBe(75);
    	});

To achieve this . the dispatcher dispatched the AST corresponding to this method to all templates.
The setter tempalte will check that at least one of the provided params is assigned to a class level
variable (this.weight) and therefor will consider this function as a setter function and generated the corresponding test case. All the other template will not be activated is the code doesnt match their
validation template.
