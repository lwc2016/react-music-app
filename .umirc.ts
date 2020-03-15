export default {
    theme: {
        "@r": "150rem"
    },
    extraBabelPlugins: [
        ["@babel/plugin-proposal-decorators", {
            options: {
                "legacy": true
            }
        }],
        "@babel/plugin-proposal-class-properties"
    ]
}