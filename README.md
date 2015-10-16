
#Browser-solidity

Browser solidity is a browser based solidity compiler. To use either visit [https://chriseth.github.io/browser-solidity](https://chriseth.github.io/browser-solidity) or clone/download this repo and open `index.html` in your browser.

#Nodejs usage

To use the solidity compiler via nodejs you can install it via npm

	npm install solc

And then use it like so:

	var solc = require('solc');
	var input = "contract x { function g() {} }";
	var output = solc.compile(input, 1); // 1 activates the optimiser
	for (var contractName in output.contracts)
		console.log(contractName + ': ' + output.contracts[contractName].bytecode);

Starting from version 0.1.6, multiple files are supported with automatic import resolution by the compiler as follows:

	var solc = require('solc');
	var input = {
		'lib.sol': 'library L { function f() returns (uint) { return 7; } }',
		'cont.sol': 'import "lib.sol"; contract x { function g() { L.f(); } }'
	};
	var output = solc.compile({sources: input}, 1);
	for (var contractName in output.contracts)
		console.log(contractName + ': ' + output.contracts[contractName].bytecode);

Note that all input files that are imported have to be supplied, the compiler will not load any additional files on its own.