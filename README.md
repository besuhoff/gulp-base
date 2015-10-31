# gulp-base

## Installation

```shell
npm i -D gulp-base
```

## Usage

```
└── webApp/
    │
    ├── browserSource/
    │   ├── *.js
    │   └── **.js
    │
    ├── serverSource/
    │   ├── ***.js
    │   └── ****.js
    │
    ├── browserDistribution/
    │   ├── *.js
    │   └── **.js
    │
    ├── *****.js
    └── ******.js
```

```javascript
var base = require('gulp-base');

gulp.task('scripts', function() {
  return gulp.src(allScripts)
    .pipe(lint())
    .pipe(filter(browserScripts))
    .pipe(base(browserSource))
    .pipe(minify())
    .pipe(gulp.dest(browserDistribution));
});
```

## API

### base([options])

#### options

Type: `string`|`object`
Default: `{}`

The `options` typed as `string` will be replaced with `{base: options}`.

##### options.base

Type: `string`
Default: `'.'`

Used to set `file.base`.

##### options.original

Type: `boolean`
Default: `true`

Resets `file.path` to [vinyl original path](https://github.com/gulpjs/vinyl#history) (`file.history[0]`).
