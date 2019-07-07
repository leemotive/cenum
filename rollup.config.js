import babel from 'rollup-plugin-babel';

export default {
  input: './index.js',
  output: [
    {
      file: './es/index.js',
      format: 'es',
    },
    {
      file: './lib/index.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: './dist/cenum.js',
      format: 'umd',
      exports: 'named',
      name: 'Enum',
    },
  ],
  plugins: [
    babel({
      plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-class-properties',
      ],
    }),
  ],
};
