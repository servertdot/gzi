module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:vue/vue3-essential",
        "@vue/eslint-config-typescript",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }, 
        {
            "files": ["*.vue"],
            "rules": {
                "@stylistic/js/indent": "off",
                '@stylistic/js/semi': ["error", "always"],
              }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        '@stylistic/js'
    ],
    "rules": {
        "quotes": ["error", "single"],
        "vue/multi-word-component-names": "off",
        "curly": ["error", "multi-line"],
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        '@stylistic/js/indent': ['error', 4, { "SwitchCase": 1 }],
        '@stylistic/js/semi': ["error", "always"],
        "semi-style": ["error", "last"],
        "indent": "off",
        "@typescript-eslint/indent": "off",
        "vue/script-indent": ["error", 4, { "baseIndent": 1 }],
        "semi": "off",
        "@typescript-eslint/semi": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/space-before-function-paren": "off"
    }
}
