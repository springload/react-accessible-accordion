module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        jsx: true,
    },
    plugins: ['react', '@typescript-eslint', 'jsx-a11y'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/prop-types': 'off',
    },
};
