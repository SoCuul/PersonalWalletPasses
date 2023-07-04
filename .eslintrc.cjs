module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module"
    },
    extends: [
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: [
        '@typescript-eslint'
    ],
    root: true,
    env: {
        node: true
    },
    rules: {
        'object-curly-spacing': [ 'warn', 'always' ],
        'array-bracket-spacing': [ 'warn', 'always' ],
        'spaced-comment': [ 'error', 'always' ],
        'semi': [ 'error', 'never' ],
        'comma-dangle': [ 'error', 'never' ],
        'indent': [ 'error', 4 ],
        'eol-last': [ 'error', 'never' ],
        'array-element-newline': [ 'warn', 'consistent' ],
        'object-property-newline': 'warn',

        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off'
    }
}