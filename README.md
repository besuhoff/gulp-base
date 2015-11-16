# gulp-base

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

Used to update `file.base`.

##### options.original

Type: `boolean`
Default: `true`

Resets `file.path` to [vinyl original path](https://github.com/gulpjs/vinyl#history) (`file.history[0]`).

### base.inspect(inspector)

#### inspector(file)

Type: `function`

Inspects `file.path`, `file.base` and more.

##### file

Type: `object`

A fake vinyl file.
