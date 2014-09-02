// ==========================================
// ===             Require                ===
// ==========================================
	var runSequence = require('run-sequence'),
		browserSync = require('browser-sync'),
		gulp = require('gulp');

	var clean = require('gulp-clean'),
		gulpif = require('gulp-if'),
		rubySass = require('gulp-ruby-sass'),
		gulpFilter = require('gulp-filter'),
		autoprefixer = require('gulp-autoprefixer'),
		csso = require('gulp-csso'),
		webpack = require('gulp-webpack'),
		uglify = require('gulp-uglify'),
		header = require('gulp-header');
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



// =========================================
// ===           Enviro Variables        ===
// =========================================
	var minify = true;  // this is set to false when running the "alldev" task

	var pkg = require('./package.json');
	var banner = ['/**',
		' * <%= pkg.name %> - <%= pkg.description %>',
		' * @version v<%= pkg.version %>',
		' * @link <%= pkg.homepage %>',
		' * @license <%= pkg.license %>',
		' */',
		''].join('\n');
// =========================================



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
			.pipe(gulpif(minify, csso()))
			.pipe(header(banner, { pkg : pkg } ))			
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
			.pipe(webpack({
				output: { filename: "grids-toolbox.js" }
			}))
			.pipe(gulpif(minify, uglify()))
			.pipe(header(banner, { pkg : pkg } ))			
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
	minify = false;
	runSequence(
		'sass',
		'scripts',
		'watch',
		'browser-sync',
		callback);
});