/*
1-CMD (Windows Command Prompt)
    Open CMD by press on Win + R, typing cmd, then Enter

2-cd \ go to the root of the current drive

3-To switch drives we must type the drive letter (D:), or use cd /d D:\path

4-cls clears the screen

5-mkdir name (or md) create a folder

6-rmdir name (or rd) deletes an empty folder when i  Add /s /q to delete a folder 

7-move source destination move the files or folders

8-ren old new rename a file or folder

9-type file.txt prints a file’s content

10-find search for text inside files or output

11-Gulp is a JavaScript task runner that automates repetitive tasks(dry code)

12-gulp It runs on Node.js, so Node and npm must be installed first

13-we install npm and node by command line

14-Install the CLI globally with npm install --global gulp-cli

15-Install Gulp in the project with npm install --save-dev gulp

16-gulp.src() reads files into a stream using glob pattern

17-gulp.dest() writes the processed files to an output folder

18-.pipe() do that: read, then process, then write

19-gulp.series() runs tasks one after another

20-gulp.parallel() runs tasks at the same time

21-gulp.watch() watches files and re-runs tasks when they change

22-gulp-sass with sass compiles SCSS to CSS: require('gulp-sass')(require('sass')).

23-gulp-clean-css minifies CSS file

24-gulp-rename rename output files, e.g. adding .min

25- Wrong:
cd\Users\Desktop        => no space after cd is risky, and the path may not exist
cd D:\projects          => stays on the current drive, doesn't switch to D
rmdir myFolder          => fails if the folder is not empty
rename old.txt          => missing the new name
dir | find js          => searches for "js" but without quotes can fail

Correct:
cd \Users\Desktop
cd /d D:\projects      
rmdir /s /q myFolder
ren old.txt new.txt
dir | find ".js"

26-wrong:
let gulp = require('gulp');
let sass = require('gulp-sass');    //miss required          
let cleanCSS = require('gulp-clean-css');

correct:
let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));   
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');

27-wrong:
gulp.task('scss', function () {
  gulp.src('src/scss/*.scss')                 // no return, task never finish
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
});

correct:
function styles() {
    .pipe(sass().on('error', sass.logError)) 
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
}
*/
