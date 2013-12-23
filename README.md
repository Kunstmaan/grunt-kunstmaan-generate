# grunt-kunstmaan-generate

> Easily create new SCSS modules within a Kunstmaan project.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-kunstmaan-generate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-kunstmaan-generate');
```

As this is currently built to be used with [Kunstmaan Bundles](http://bundles.kunstmaan.be/) projects, it expects the following directory structure:

```
- scss /
  - config /
  - components /
  - general /
  - helpers /
    - mixins /
    - placeholders /
```

## Commands

After loading the `grunt-kunstmaan-generate` task in your Gruntfile, you can issue the following commands from the command-line:

```shell
grunt kg:component:NAME
grunt kg:config:NAME
grunt kg:general:NAME
grunt kg:mixin:NAME
grunt kg:placeholder:NAME
```

These commands will generate a file with a given name in the corresponding folder. They will also `@import` the file in the corresponding imports file (e.g _components.scss). In some cases, they will also generate some boilerplate code.

## Todo

- Write tests.
- Make this configurable so it's usable outside of Kunstmaan projects.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

**0.1.0** - 16/10/2013
