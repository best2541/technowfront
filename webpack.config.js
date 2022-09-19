module.exports = (phase, { defaultConfig }) => {
    return {
        ...defaultConfig,
        vendor: [
            'xlsx',
            'file-saver'
        ],
        node: { fs: 'empty' },
        externals: [
            { './cptable': 'var cptable' },
            { './jszip': 'jszip' }
        ],
        webpack: (config) => {
            config.resolve = {
                ...config.resolve,
                fallback: {
                    fs: false,
                    path: false,
                    os: false,
                },
                node: {
                    fs: "empty",
                },
            };
            return config;
        },
    };
};
