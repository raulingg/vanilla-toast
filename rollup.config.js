import pkg from './package.json'
import scss from 'rollup-plugin-scss'
import cleaner from 'rollup-plugin-cleaner'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'toast',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
    {
      file: pkg.main.replace('.js', '.min.js'),
      format: 'umd',
      name: 'toast',
      plugins: [terser()],
    },
  ],
  plugins: [
    cleaner({
      targets: ['./dist/'],
    }),
    scss({
      output: 'dist/main.min.css',
      outputStyle: 'compressed',
    }),
  ],
}
