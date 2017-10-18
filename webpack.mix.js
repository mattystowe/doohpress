let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

//mix main js application
mix.js('resources/assets/js/app.js', 'public/js').version();

//theme specific js
mix.copyDirectory('resources/assets/themejs','public/js/themejs');


//compile SASS
mix.sass('resources/assets/sass/app.scss', 'public/css').version();


//mix in theme styles
mix.styles([
    'resources/assets/css/bootstrap.min.css',
    'resources/assets/css/icons.css',
    'resources/assets/css/style.css',
    'resources/assets/css/sweetalert.css',
    './node_modules/angular-loading-bar/build/loading-bar.min.css',
    './node_modules/angular-toastr/dist/angular-toastr.min.css'
], 'public/css/theme.css').version();



//mix in the fonts
mix.copy('resources/assets/fonts', 'public/fonts');

mix.copy('./node_modules/font-awesome/fonts','public/build/fonts')


//copy image resources
mix.copyDirectory('resources/assets/images', 'public/images/');


//copy html templates and partials
mix.copyDirectory('resources/assets/html', 'public/html');
