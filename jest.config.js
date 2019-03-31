module.exports = {
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/integration/'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transform: {
        '^.+\\.(js|ts)x?$': 'babel-jest',
    },
};
