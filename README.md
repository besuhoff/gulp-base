# gulp-base [![Build Status](https://travis-ci.org/aicest/gulp-base.svg?branch=master)](https://travis-ci.org/aicest/gulp-base) [![npm version](https://badge.fury.io/js/gulp-base.svg)](https://badge.fury.io/js/gulp-base)

## Installation

```shell
npm i -D gulp-base
```

## Usage

```
└── webApp/
    ├── browserSource/
    │   └── t.js
    ├── browserDistribution/
    │   └── t.js
    ├── serverSource/
    │   └── *.js
    └── *.js
```

```javascript
var base = require('gulp-base');

gulp.task('scripts', function() {
  return gulp.src('**/*.js')
    .pipe(changed('temporary/'))
    .pipe(lint())
    .pipe(gulp.dest('temporary/'))  // file.path and file.base will be modified
    .pipe(filter('browserSource/**/*.js'))
    .pipe(base('browserSource/'))   // resets file.path and updates file.base
    .pipe(minify())
    .pipe(gulp.dest('browserDistribution/'));
});
```

## API

### base([options])

#### options

Type: `string|object`
Default: `{}`

If typed as `string`, it will be replaced with `{base: options}`.

##### options.base

Type: `string`
Default: `'.'`

Updates `file.base`.

##### options.original

Type: `boolean`
Default: `true`

Resets `file.path` to [vinyl original path](https://github.com/gulpjs/vinyl#history) (`file.history[0]`).

### base.inspect(inspector)

Inspects `file.path`, `file.base`, and so on.

A fake [vinyl file](https://github.com/gulpjs/vinyl) will be assigned into `inspector(file)` function.
