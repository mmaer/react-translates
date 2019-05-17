module.exports = {
    presets: [
        [require('@babel/preset-env'), {
            modules: process.env.RUN_MODE === 'es' ? false : 'commonjs',
        }],
    ],
};
