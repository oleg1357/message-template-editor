module.exports = {
    extends: '@it-incubator/eslint-config',
    rules: { 'no-console': ['error', { allow: ['warn', 'error'] }],
        "@typescript-eslint/no-explicit-any": "error"
    },
}