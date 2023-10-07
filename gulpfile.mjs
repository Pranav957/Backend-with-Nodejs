import gulp from "gulp";
import gulpsass from "gulp-sass";
import nodesass from "node-sass";
const sass = gulpsass(nodesass);
import cssnano from "gulp-cssnano";
import rev from "gulp-rev";
// import { deleteSync } from "del";
import gulpuglify from "gulp-uglify-es";
const uglify = gulpuglify.default;
import imagemin from "gulp-imagemin";

gulp.task("css", function (done) {
  console.log("Minifying css...");
  gulp
    .src("./assets/scss/**/*.scss") //means it select all the .scss file inside scss folder
    .pipe(sass())  // compile scss to css
    .pipe(cssnano()) // minifying css
    .pipe(gulp.dest("./assets.css"));

  gulp
    .src("./assets/**/*.css")
    .pipe(rev())   // generate unique hash file name , 432gddk.css
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({   // maps the file name with hashs , home-432gddk.css
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("js", function (done) {
  console.log("minifying js...");
  gulp
    .src("./assets/**/*.js")
    .pipe(uglify())  // minifying the js file
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("images", function (done) {
  console.log("compressing images...");
  gulp
    .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("clean:assets", function (done) {
  deleteSync("./public/assets");
  done();
});

gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "images"),
  function (done) {
    console.log("Building assets");
    done();
  }
);


// // gulpfile.mjs

// import gulp from 'gulp';
// import sass from 'gulp-sass';
// import cssnano from 'gulp-cssnano';
// import rev from 'gulp-rev';
// import uglify from 'gulp-uglify-es';
// import imageMin from 'imagemin';
// // import del from 'del';
// import { sync as delSync } from 'del';

// // Set the Sass compiler
// // sass.compiler = require('sass');

// gulp.task('css', function (done) {
//   console.log('minifying css....');

//   gulp
//     .src('./assets/sass/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets/css'));

//   gulp
//     .src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(
//       rev.manifest({
//         cwd: 'public',
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest('./public/assets'));
//   done();
// });

// gulp.task('js', function (done) {
//   console.log('minifying js....');

//   gulp
//     .src('./assets/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(
//       rev.manifest({
//         cwd: 'public',
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest('./public/assets'));
//   done();
// });

// gulp.task('images', function (done) {
//   console.log('minifying images....');

//   gulp
//     .src('./assets/**/*+(png/jpg/gif/svg/jpeg)')
//     .pipe(imageMin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(
//       rev.manifest({
//         cwd: 'public',
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest('./public/assets'));
//   done();
// });

// gulp.task('clean:assets', function (done) {
//   del.delSync('./public/assets');
//   done();
// });

// gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function (done) {
//   console.log('Building assets');
//   done();
// });

// ******************************************************************************************?

// const gulp=require('gulp');
// // const sass=require('gulp-sass');
// const sass = require('gulp-sass')(require('sass'));
// const cssnano=require('gulp-cssnano');
// const rev=require('gulp-rev');
// const uglify=require('gulp-uglify-es')
// const imageMin=require('imagemin');
// const del=require('del');




// gulp.task('css',function(done){
//     console.log('minifying css....');

//     gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets.css'));

//     gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();

// });

// gulp.task('js',function(done){
//     console.log('minifying js....');

//     gulp.src('./assets/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();

// });

// gulp.task('images',function(done){
//     console.log('minifying images....');

//     gulp.src('./assets/**/*+(png/jpg/gif/svg/jpeg)')
//     .pipe(imageMin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });

// gulp.task('clean:assets',function(done){
//     del.deleteSync('./public/assets');
//     done();
// });

// gulp.task('build',gulp.series('clean:assets','css','js','images'),function(done){
//     console.log('Building assets');
//     done();
// });


// import gulp from 'gulp';
// import sass from 'gulp-sass';
// import cssnano from 'gulp-cssnano';
// import rev from 'gulp-rev';

// async function runGulpTask() {
//     const gulp = await import('gulp');
//     const sass = await import('gulp-sass');
//     const cssnano = await import('gulp-cssnano');
//     const rev = await import('gulp-rev');

//     gulp.task('css', function (done) {
//         console.log('minifying css....');

//         gulp.src('./assets/sass/**/*.scss')
//             .pipe(sass())
//             .pipe(cssnano())
//             .pipe(gulp.dest('./assets.css'));

//         gulp.src('./assets/**/*.css')
//             .pipe(rev())
//             .pipe(gulp.dest('./public/assets'))
//             .pipe(rev.manifest({
//                 cwd: 'public',
//                 merge: true
//             }))
//             .pipe(gulp.dest('./public/assets'));
        
//         done();
//     });
// }

// runGulpTask().catch(error => {
//     console.error('Error running Gulp task:', error);
// });