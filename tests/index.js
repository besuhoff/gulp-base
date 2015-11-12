'use strict';


var gulp = require('gulp'),
    filter = require('gulp-filter'),
    del = require('del'),
    base = require('..'),
    expect = require('chai').expect;


describe('gulp-base', function() {

    it('default', function(done) {

        process.chdir(__dirname);

        let tmp = '.tmp',
            src = 'src',
            dst = 'dist';

        del([tmp, dst]).then(function() {

            gulp.src('**/*.js')

                .pipe(gulp.dest(tmp))   // file.path and file.base will be modified

                .pipe(base.inspect(function(file) {
                    expect(file.path).to.contain(tmp).and.not.equal(file.history[0]);
                    expect(file.base).to.contain(tmp);
                }))

                .pipe(filter(`${src}/**/*.js`))
                .pipe(base(src))        // resets file.path and updates file.base

                .pipe(base.inspect(function(file) {
                    expect(file.path).to.equal(file.history[0]).and.not.contain(tmp);
                    expect(file.base).not.to.contain(tmp);
                }))

                .pipe(gulp.dest(dst))
                .on('end', done);
        });
    });
});
