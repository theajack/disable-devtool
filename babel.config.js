module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                targets: {
                    esmodules: true,
                    ie: 11,
                },
            },
        ],
        '@babel/preset-typescript',
    ],
};

