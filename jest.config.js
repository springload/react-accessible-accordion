module.exports = {
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    setupFiles: ['./src/setupTests.js'],
    setupTestFrameworkScriptFile: './src/setupTestFramework.js',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transform: {
        '^.+\\.(js|ts)x?$': 'babel-jest',
    },
};
