import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

const output = {
    name: 'reactAccessibleAccordion',
    globals: {
        react: 'React',
    },
};

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

export default [
    {
        input: 'src/index.tsx',
        external: ['react', 'react-dom'],
        output: [
            {
                ...output,
                file: pkg.main,
                format: 'umd',
            },
            {
                ...output,
                file: pkg['jsnext:main'],
                format: 'es',
            },
        ],
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            resolve({
                jsnext: true,
                main: true,
                browser: true,
                extensions,
            }),
            babel({
                exclude: 'node_modules/**',
                extensions,
            }),
            commonjs(),
        ],
    },
];
