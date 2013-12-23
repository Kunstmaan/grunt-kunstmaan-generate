/*
 * grunt-kunstmaan-generate
 * https://github.com/sambellen/grunt-kunstmaan-generate
 *
 * Copyright (c) 2013 Sam Bellen for Kunstmaan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },
    // Kunstmaan generator
    kg: {
      path: '/scss/',
      types : [{
          name: 'components'
        }, {
          name: 'mixins',
          path: 'helpers/mixins/',
          type: 'mixin'
        }, {
          name: 'placeholders',
          path: 'helpers/mixins/',
          type: 'placeholder'
        }]
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'kg']);

};
