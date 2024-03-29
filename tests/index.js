'use strict';
process.chdir(__dirname);


var gulp = require('gulp'),
    filter = require('gulp-filter'),
    del = require('del'),
    base = require('..'),
    expect = require('chai').expect,
    path = require('path');


describe('gulp-base', function() {

    var tmp = '.tmp',
        src = 'src',
        dst = 'dist';

    before(function() {
        return del([tmp, dst]);
    });

    it('default', function(done) {

        var lastFileBase = null;

        gulp.src('**/*.js')

            .pipe(gulp.dest(tmp))   // file.path and file.base will be modified

            .pipe(base.inspect(function(file) {
                expect(file.path).to.contain(tmp).and.not.equal(file.history[0]);
                expect(file.base).to.contain(tmp);
            }))

            .pipe(filter(src + '/**/*.js'))
            .pipe(base(src))        // resets file.path and updates file.base

            .pipe(base.inspect(function(file) {
                lastFileBase = file.base;
                expect(file.path).to.equal(file.history[0]).and.not.contain(tmp);
                expect(file.base).to.contain(src).and.not.contain(tmp);
                var count = 0;
                if (file.isBuffer()) { count ++; }
                if (file.isStream()) { count ++; }
                if (file.isNull()) { count ++; }
                expect(count).to.equal(1);
            }))

            .pipe(base(path.join(__dirname, src)))  // resets file.path and updates file.base

            .pipe(base.inspect(function(file) {
                expect(file.base).to.equal(lastFileBase);
                expect(file.base).to.equal(path.join(__dirname, src));
            }))

            .pipe(gulp.dest(dst))
            .on('end', done);
    });
});
