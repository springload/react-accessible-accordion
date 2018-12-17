module.exports = api => {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                modules: false,
            },
        ],
        '@babel/preset-react',
        '@babel/preset-flow',
    ];

    const plugins = ['@babel/plugin-proposal-class-properties'];

    return {
        presets,
        plugins,
    };
};
