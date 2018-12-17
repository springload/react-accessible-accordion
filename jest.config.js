module.exports = {
	setupFiles: ['./src/setupTests.js'],
	setupTestFrameworkScriptFile: './src/setupTestFramework.js',
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
	},
};
