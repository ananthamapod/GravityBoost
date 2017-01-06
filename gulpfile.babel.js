import gulp from 'gulp'
import babel from 'gulp-babel'
import pump from 'pump'
import connect from 'gulp-connect'
import stripDebug from 'gulp-strip-debug'
import autoprefix from 'gulp-autoprefixer'
import minifyCSS from 'gulp-minify-css'
import pug from 'gulp-pug'
import minifyHTML from 'gulp-minify-html'
import imagemin from 'gulp-imagemin'
import changed from 'gulp-changed'
import eslint from 'gulp-eslint'


const roots = {
  src: 'src',
  dest: 'build'
}

const srcs = {
  JS: `${roots.src}/js/*.js`,
  CSS: `${roots.src}/css/*.css`,
  PUG: `${roots.src}/*.pug`,
  IMG: [
      `${roots.src}/images/*.jpg`,
      `${roots.src}/images/*.png`,
      `${roots.src}/images/*.bmp`
    ]
}

const dests = {
  JS: `${roots.dest}/js/`,
  CSS: `${roots.dest}/css/`,
  PUG: `${roots.dest}/`,
  IMG: `${roots.dest}/images/`
}

gulp.task('js', (cb) => {
  pump(
    [
      gulp.src(srcs.JS),
      babel({
        presets: ['es2015', 'stage-0']
      }),
      gulp.dest(dests.JS)
    ],
    cb
  )
})

gulp.task('pug', (cb) => {
  pump(
    [
      gulp.src(srcs.PUG),
      changed(dests.PUG),
      pug(),
      minifyHTML(),
      gulp.dest(dests.PUG)
    ],
    cb
  )
})

gulp.task('css', (cb) => {
  pump(
    [
      gulp.src(srcs.CSS),
      changed(dests.CSS),
      autoprefix('last 2 versions'),
      minifyCSS(),
      gulp.dest(dests.CSS)
    ],
    cb
  )
})

gulp.task('img', (cb) => {
  pump(
    [
      gulp.src(srcs.IMG),
      changed(dests.IMG),
      imagemin(),
      gulp.dest(dests.IMG)
    ],
    cb
  )
})

gulp.task('lint', (cb) => {
  pump(
    [
      gulp.src(srcs.JS),
      changed(dests.JS),
      eslint(),
      eslint.format()
    ],
    cb
  )
})

gulp.task('watch', () => {
  gulp.watch(srcs.PUG, ['pug'])
  gulp.watch(srcs.JS, ['lint', 'js'])
  gulp.watch(srcs.CSS, ['css'])
  gulp.watch(srcs.IMG, ['img'])
})

gulp.task('connect', () => {
  connect.server({
    root: './',
    port: 5000
  })
})

gulp.task('initialize', ['pug', 'lint', 'js', 'css', 'img'])
gulp.task('default', ['connect', 'watch'])
