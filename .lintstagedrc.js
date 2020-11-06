module.exports = {
    '**/*.ts?(x)': () => 'lint-staged && yarn typecheck',
};
