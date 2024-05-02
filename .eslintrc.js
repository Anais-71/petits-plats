module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 15,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }, 
    "settings": {
        "react": {
        "version": "17.0"
        }
    },
    "root": true,
};
