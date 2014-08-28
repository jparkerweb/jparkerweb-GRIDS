// ==========================================
// ===             Require                ===
// ==========================================
	var runSequence = require('run-sequence'),
		browserSync = require('browser-sync'),
		gulp = require('gulp');

	var clean = require('gulp-clean'),
		rubySass = require('gulp-ruby-sass'),
		gulpFilter = require('gulp-filter'),
		autoprefixer = require('gulp-autoprefixer'),
		csso = require('gulp-csso'),
		uglify = require('gulp-uglify');
// ==========================================



// ==========================================
// ===         setup Path variables       ===
// ==========================================
	var sourcePaths = {
		SCSS: 'src/scss/**/*.scss',
		JS: 'src/js/**/*.js'
	};
	var destPaths = {
		BASE: './',
		CSS: './',
		JS: './'
	};
// ==========================================



// ==========================================
// ===           Static server            ===
// ==========================================
	// setup our browser-sync server
	gulp.task('browser-sync', function() {
		browserSync({
			server: {
				baseDir: "./"
			}
		});
	});
	// reload
	gulp.task('reload', function () {
		console.log('browser-sync reload');
		browserSync.reload();
	});
// ==========================================



// -------------------------
// --    task: SASS       --
// -------------------------
gulp.task('sass', function (callback) {
	runSequence(
		'clean-sass',
		'build-sass',
		callback);
});
	// clean our build path
	gulp.task('clean-sass', function () {  
		return gulp.src([
				destPaths.CSS + '*.{css,css\.map}'
			], {read: false})
			.pipe(clean());
	});
	// task: compile SASS to CSS and AutoPrefix
	gulp.task('build-sass', function () {
		var filter = gulpFilter(['**/*.css']);

		return gulp.src(sourcePaths.SCSS)
			.pipe(rubySass({sourcemap: false}))
			.pipe(filter)
			.pipe(autoprefixer('last 4 version'))
			.pipe(csso())
			.pipe(gulp.dest(destPaths.CSS))
			.pipe(browserSync.reload({stream:true}));
	});



// -------------------------
// --    task: Scripts    --
// -------------------------
gulp.task('scripts', function (callback) {
	runSequence(
		'clean-scripts',
		'build-scripts',
		callback);
});
	// clean our build path
	gulp.task('clean-scripts', function () {  
		return gulp.src([
				'!' + destPaths.JS + 'gulpfile.js', 
				'!' + destPaths.JS + 'prettify.js', 
				destPaths.JS + '*.{js,js\.map}'
			], {read: false})
			.pipe(clean());
	});
	// task: build scripts
	gulp.task('build-scripts', function () {
		return gulp.src([sourcePaths.JS])
			.pipe(uglify())
			.pipe(gulp.dest(destPaths.JS));
	});



// -------------------------
// --     task: watch     --
// -------------------------
gulp.task('watch', function () {
	gulp.watch(sourcePaths.SCSS, ['sass']);
	gulp.watch(sourcePaths.JS, ['scripts', 'reload']);
	gulp.watch(destPaths.BASE + '*.html', ['reload']);
});




// *************************
// ** Gulp tasks meant to **
// ** be run from command **
// ** line                **
// *************************
// ** gulp OR gulp alldev **
// *************************


// -------------------------
// --    task: default    --
// -------------------------
gulp.task('default', ['sass', 'scripts']);


// -------------------------
// --    task: alldev     --
// -------------------------
gulp.task('alldev', function (callback) {
	runSequence(
		'sass',
		'scripts',
		'watch',
		'browser-sync',
		callback);
});