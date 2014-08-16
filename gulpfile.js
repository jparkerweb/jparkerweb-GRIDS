// ==========================================
// ===             Require                ===
// ==========================================
	var runSequence = require('run-sequence'),
		gulp = require('gulp');

	var clean = require('gulp-clean'),
		rubySass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		csso = require('gulp-csso');
// ==========================================



// ==========================================
// ===         setup Path variables       ===
// ==========================================
	var sourcePaths = {
		SCSS: 'scss/**/*.scss'
	};
	var destPaths = {
		CSS: './'
	};
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
				destPaths.CSS + '/*.css'
			], {read: false})
			.pipe(clean());
	});
	// task: compile SASS to CSS and AutoPrefix
	gulp.task('build-sass', function () {
		return gulp.src(sourcePaths.SCSS)
			.pipe(rubySass())
			.pipe(autoprefixer('last 4 version'))
			.pipe(csso())
			.pipe(gulp.dest(destPaths.CSS));
	});



// -------------------------
// --     task: watch     --
// -------------------------
gulp.task('watch', function () {
	gulp.watch(sourcePaths.SCSS, ['sass']);
});

// -------------------------
// --    task: default    --
// -------------------------
gulp.task('default', ['sass']);
