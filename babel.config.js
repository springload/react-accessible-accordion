module.exports = (api) => {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            process.env.NODE_ENV === 'test'
                ? {
                      useBuiltIns: 'usage', // for regeneratorRuntime
                  }
                : {
                      modules: false,
                  },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ];

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ];

    return {
        presets,
        plugins,
    };
};
