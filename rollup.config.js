import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

module.exports = {
    input: 'esm/index.js',
    output: [
        {
            file: 'htmlhammer.js',
            format: 'iife',
            name: 'htmlhammer'
        },
        {
            file: 'htmlhammer.min.js',
            format: 'iife',
            name: 'htmlhammer',
            plugins: [terser()]
        }
    ],
    plugins: [
        babel({ presets: ['@babel/preset-env'] })
    ]
};