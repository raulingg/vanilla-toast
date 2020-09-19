import pkg from './package.json'
import scss from 'rollup-plugin-scss'
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import cleaner from 'rollup-plugin-cleaner'

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    cleaner({
      targets: ['./dist/'],
    }),
    scss({
      output: './dist/main.min.css',
      watch: './src/sass',
    }),
    serve({
        open: true,
        openPage: '/',
        host: 'localhost',
        port: 3000,
        contentBase: './',
    }),
    livereload({
        watch: ['./index.html', './app.js', './src/'],
        exts: ['html', 'js', 'css', 'scss'],
    })
  ],
}
