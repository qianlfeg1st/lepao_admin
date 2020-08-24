const gulp = require('gulp')
const zip = require('gulp-zip')
const rename = require('gulp-rename')
const del = require('del')

gulp.task('zip', () => {

  return gulp.src('./dump/**')
    .pipe(zip('admin.zip'))
    .pipe(gulp.dest('./'))
})

gulp.task('copy', () => {

  return gulp.src('./build/**')
    .pipe(gulp.dest('./dump/admin'))
})

gulp.task('deleteDump', () => {

  return del('./dump')
})

gulp.task('deleteZip', () => {

  return del('./admin.zip')
})

gulp.task('rename', () => {

  return gulp.src('./admin.zip')
    .pipe(rename(`naodong_admin_${process.env.REACT_APP_ENV}.zip`))
    .pipe(gulp.dest('./'))
})

gulp.task('output',
  gulp.series('deleteDump', 'copy', gulp.parallel('zip'), 'rename', 'deleteZip', 'deleteDump')
)
