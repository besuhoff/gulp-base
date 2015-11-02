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

The `options` typed as `string` will be replaced with `{base: options}`.

##### options.base

Type: `string`
Default: `'.'`

Used to update `file.base`.

##### options.original

Type: `boolean`
Default: `true`

Resets `file.path` to [vinyl original path](https://github.com/gulpjs/vinyl#history) (`file.history[0]`).
