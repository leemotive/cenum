module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: process.env.MODULES,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-class-properties',
  ],
};
