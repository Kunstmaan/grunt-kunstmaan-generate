/*
 * grunt-kunstmaan-generate
 * https://github.com/sambellen/grunt-kunstmaan-generate
 *
 * Copyright (c) 2013 Sam Bellen for Kunstmaan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Variables
    var _ = grunt.util._,
        fs = require('fs'),
        prompt = require('prompt'),
        kumaGenerator,
        isDefined,

    // Check if the variable is defined
    isDefined = function(val, empty) {
        var _defined = false;

        // If empty is not given or not a boolean
        if (typeof empty === 'undefined' || !_.isBoolean(empty)) {
            empty = false;
        }

        // If the value is not givven or if it can be an empty string
        if (typeof val !== 'undefined' && val !== null) {
            if((val === '' && empty === true) || val !== '') {
                _defined =  true;
            } 
        }

        return _defined;
    },   
    
    // The Kunstmaan Generator
    kumaGenerator = function(type, name, subDir, config) {
        // this
        var _this = this;

        // Variables
        var type, 
            name, 
            subDir,
            path,
            typePath,
            types,
            extension;

        // Helper unctions
        var initialise,
            isType,
            _fileExists;

        // Setters
        var setType,
            setName,
            setSubDir;

        // Getters
        var getTypePath,
            getTypeContenttype;


        /*
         * Helper functions
         */

        // The initialisation function
        initialise = function(fn) {
            fn();
        };

        // Check if the given type is in the config
        isType = function(val) {
            var i, _type = false;

            for (i = 0; i < _this.config.config.types.length; i++) {
                if (_this.config.config.types[i].name === val) {
                    _type = true;
                }
            }

            return _type;
        };

        // Check if a file already exists
        _fileExists = function() {
            var _file = _this.path + _this.typePath + _this.subDir + _this.name + _this.extension,
                _exists = false;
            
            if (fs.statSync(_file)) {
                _exists = true;
            }

            return _exists;
        };


        /*
         * Setters
         */

        // Set the type
        setType = function(val) {
            _this.type = val;
        };

        // Set the name
        setName = function(val) {
            _this.name = val;
        };

        // Set the subdirectory
        setSubDir = function(val) {
            _this.subDir = val;
        };

        
        /*
         * Getters
         */

        // Get the path of the generated file type
        getTypePath = function() {
            var _typePath, i;
            
            if (_this.isType(_this.type)) {
                for (i = 0; i < _this.types.length; i++) {
                    if (isDefined(_this.types[i].path) && _this.types[i].name === _this.type) {
                        _typePath = _this.types[i].path;
                    } else {
                        _typePath = _this.type + '/';        
                    }
                }
            } else {
                _typePath = _this.type + '/';
            }

            return _typePath;
        };

        // Get the content type of the generated file type
        getTypeContenttype = function() {
            var _typeContentType, i;
            
            if (_this.isType(_this.type)) {
                for (i = 0; i < _this.types.length; i++) {
                    if (isDefined(_this.types[i].type) && _this.types[i].name === _this.type) {
                        _typeContentType = _this.types[i].type;
                    } else {
                        _typeContentType = 'component';        
                    }
                }
            }

            return _typeContentType;
        }

        /*
         * Set the variables
         */

        // Set the Type of the generated file
        this.type = type;
        
        // Set the name of the generated file
        this.name = name;

        // Set the subdirectory of the generated file
        this.subDir = subDir;

        if (!isDefined(subDir)) {
            setSubDir('');
        }

        // Set the config of the generator
        this.config = config;

        // Set the the path of the generated file type
        this.typePath = getTypePath();

        // Set the base path
        if (isDefined(this.config.config.path)) {
            this.path = this.config.config.path;
        } else {
            this.path = this.config.cwd;
        }

        // Set the available file types for the generator
        if (isDefined(this.config.config.types) && this.config.config.types.length > 0) {
            this.types = this.config.config.types;
        } else {
            console.log('Please set some file types in the grunt config.');
        }

        // Set the extension of the generated file
        this.extension = '.scss';
    };


    kumaGenerator.prototype.prompt = function() {
        var _this = this,
            type;
        
        type = function(fn) {
            if (!isDefined(_this.type) || !_this.isType(_this.type)) {
                console.log('Please provide a valid type, choose one of the following: ');

                var i;
                for (i = 0; i < _this.types.length; i++) {
                    console.log(' - ' + _this.types[i].name);
                };

                prompt.start();
                prompt.message = 'My type';
                prompt.get(['type'], function(err, result){
                    setType(result.type);
                    _this.prompt(fn());
                });
            } else {
                fn();
            }
        };
    };

    // Register the task
    grunt.registerTask('kg', 'Easily create new SCSS modules within a kumaGenerator project.', function(type, name, subDir) {
        var done = this.async(),
            _config,
            generator;

        _config = {
            config : grunt.config.data.kg,
            cwd : process.cwd()
        };

        // ---- Temp -----
        var name = 'test';
        // ---------------
            
        generator = new kumaGenerator(type, name, subDir, _config);

        generator.initialise(function() {
            generator.prompt.type(function() {
                console.log('Type is set');
            });
        });
        

        // If the file exists
        // if (generator.fileExists()) {
        //     console.log('yup');
        //     // Do something
        // } else {
        //     console.log('nope');
        //     // Throw error
        // }

    });
};
