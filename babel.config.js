module.exports = api => {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            process.env.NODE_ENV === 'test'
                ? {}
                : {
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
