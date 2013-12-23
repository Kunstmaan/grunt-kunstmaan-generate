# grunt-kunstmaan-generate

> Easily create new SCSS modules within a Kunstmaan project.

## Getting Started
This plugin requires Grunt `~0.4.1`

command:

```shell
npm install grunt-kunstmaan-generate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-kunstmaan-generate');
```

Add the tast to the gruntfilt

```js
grunt.loadNpmTasks('grunt-kunstmaan-generate');
```

You can specify a config for this task in the gruntfile

```js
grunt.initConfig({
    kg: {
      path: '/scss/', // The paths to the scss relative to the Gruntfile.js
      // The type of scss files you can create
      types : [{
          name: 'components' // The name
        }, {
          name: 'mixins', // The name
          path: 'helpers/mixins/', // A subpath (optional)
          type: 'mixin' // The type op scss file (optional) (mixin,placeholder, function)
        }, {
          name: 'placeholders', // The name
          path: 'helpers/mixins/', // The subpath (optional)
          type: 'placeholder' // The type op scss file (optional) (mixin,placeholder, function)
        }]
    }
});
```

## Commands

After loading the `grunt-kunstmaan-generate` task in your Gruntfile, you can issue the following commands from the command-line:

```shell
grunt kg:name:TYPE:NAME:SUBPATH // The subpath is optional
grunt kg
```

These commands will generate a file with a given name in the corresponding folder. They will also `@import` the file in the corresponding imports file (e.g _components.scss). In some cases, they will also generate some boilerplate code.

## Todo

- Write tests.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

**0.1.0** - 23/12/2013
