import { readdirSync } from 'fs';
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';


const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];
const commonPlugins = () => [
  external({
    includeDependencies: true,
  }),
  babel({
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    exclude: 'node_modules/**',
  }),
];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourceMap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourceMap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs({
        // ... other commonjs config options
        namedExports: {
           // https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
           'node_modules/react/index.js': ['useState', 'useRef', 'useEffect'],
         },
       }),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [...commonPlugins(), dts()],
  },
];