# gulp-responsive-config

> `gulp-responsive-config` helps to generate `gulp-responsive` configuration from existiong HTML and CSS files.

* [gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
* [gulp-responsive-config](https://www.npmjs.com/package/gulp-responsive-config)

## Usage

### HTML layout

```html
<img srcset="image-200x300.jpg 1x, image-200x300@2x.jpg 2x">
```

### CSS markup

```css
.image {
  /* fallback */
  background-image: url("background-image-x200.png");
  /* image-set */
  background-image: image-set("background-image-x200.png" 1x,
                              "background-image-x200@2x.png" 2x,
                              "background-image-x200@3x.png" 3x);
}
```

### gulp-responsive & gulp-responsive-config

```js
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', ['css', 'html'], function () {
  // Make configuration from existing HTML and CSS files
  var config = $.responsiveConfig([
    'public/**/*.css',
    'public/**/*.html'
  ]);

  return gulp.src('images/*.{png,jpg}')
    // Use configuration
    .pipe($.responsive(config, {
      errorOnEnlargement: false,
      quality: 80,
      withMetadata: false,
      compressionLevel: 7,
    }))
    .pipe(gulp.dest('public/images'));
});
```

## Supported filename format for dimensions detect

* `-<width>`: `image-100.png`
* `-<width>x`: `image-100x.png`
* `-<width>x<height>`: `image-100x200.png`
* `-x<height>`: `image-x200.png`
* `-<width>x<height>@<scale>x`: `image-100x200@2x.png`
* `@<scale>x`: `image@2x.png`

See also [parse-image-dimensions](https://www.npmjs.com/package/parse-image-dimensions) module.

## License

MIT
