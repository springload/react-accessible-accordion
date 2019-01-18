module.exports = {
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
    transform: {
        '^.+\\.(js|ts)x?$': 'babel-jest',
    },
};
