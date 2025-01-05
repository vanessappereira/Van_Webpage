import gulp from 'gulp';
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';
import clean from 'gulp-clean';
import { minify } from 'html-minifier-terser';
import through2 from 'through2';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const paths = {
  ejs: {
    src: join(__dirname, 'views/**/*.ejs'),
    dest: join(__dirname, 'dist/')
  },
  static: {
    src: join(__dirname, 'public/**/*'),
    dest: join(__dirname, 'dist/public/')
  }
};

// Clean the dist directory
const cleanDist = () => gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean());

// Minify HTML files
const minifyHtml = () => {
  return through2.obj(function (file, _, cb) {
    if (file.isBuffer()) {
      const minified = minify(file.contents.toString(), {
        collapseWhitespace: true,
        removeComments: true,
      });
      file.contents = Buffer.from(minified);
    }
    cb(null, file);
  });
};

// Title mapping for EJS files
const titleMapping = {
  'index.ejs': 'Vanessa Homepage',
  'bandNameHomepage.ejs': 'Band Name Generator',
  'diceHomepage.ejs': 'Dice Roller Simulator',
  'drumHomepage.ejs': 'Drum Kit Simulator',
  'simonSaysHomepage.ejs': 'Simon Says Game',
  'tacoRecipesHomepage.ejs': 'Taco Recipes',
};

// Compile EJS templates
const compileEjs = () => {
  return gulp.src([paths.ejs.src, '!views/partials/**/*'])
    .pipe(ejs({}, {}, { ext: '.html' }))
    .pipe(through2.obj((file, _, cb) => {
      const fileName = file.relative;
      const context = {
        title: titleMapping[fileName] || 'Vanessa Homepage' // Default title
      };
      file.contents = Buffer.from(file.contents.toString().replace('<%= title %>', context.title));
      cb(null, file);
    }))
    .pipe(minifyHtml())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.ejs.dest));
};

// Copy static files
const copyStatic = () => gulp.src(paths.static.src).pipe(gulp.dest(paths.static.dest));

// Watch for changes in files
const watchFiles = () => {
  gulp.watch(paths.ejs.src, compileEjs);
  gulp.watch(paths.static.src, copyStatic);
};

// Build task
const build = gulp.series(cleanDist, gulp.parallel(compileEjs, copyStatic));

// Export tasks
export { cleanDist as clean, compileEjs as ejs, copyStatic as static, build, watchFiles as watch };
export default build;