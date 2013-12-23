/*
 * grunt-kunstmaan-generate
 * https://github.com/sambellen/grunt-kunstmaan-generate
 *
 * Copyright (c) 2013 Sam Bellen for Kunstmaan
 * Licensed under the MIT license.
 */

'use strict';

debugger;

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
    };
    
    // The Kunstmaan Generator
    kumaGenerator = function(type, name, subDir, config) {
        // this
        var _this = this;

        // Getters
        var getTypePath,
            getImportPath,
            getTypeContenttype,
            getFilePath;


        /*
         * Setters
         */

        // Set the type
        _this.setType = function(val) {
            _this.type = val;

            // Set the the path of the generated file type
            _this.typePath = getTypePath();
        };

        // Set the name
        _this.setName = function(val) {
            _this.name = val;
        };

        // Set the subdirectory
        _this.setSubDir = function(val) {
            _this.subDir = val;
        };

        // Set the prompt value
        _this.setPromptValue = function(val) {
            _this.promptValue = val;
        }

        // Set the comment that gets printed on top of the file
        _this.setComment = function() {
            _this.comment = '/* ==========================================================================\n   ';

            if(isDefined(_this.name)) {
                // Capitalise the first letter
                _this.comment += _this.name.charAt(0).toUpperCase() + _this.name.slice(1) + '\n';
            }

            if (isDefined(_this.config.config.comment)) {
                _this.comment += '\n   ' + _this.config.config.comment; 
            }

            _this.comment += '\n   ========================================================================== */\n\n';
        };

        /*
         * Set the variables
         */

        // Set the Type of the generated file
        _this.type = type;
        
        // Set the name of the generated file
        _this.name = name;

        // Set the subdirectory of the generated file
        _this.subDir = subDir + '/';

        if (!isDefined(subDir)) {
            _this.setSubDir('');
        }

        // Set the config of the generator
        _this.config = config;

        // Set the base path
        if (isDefined(_this.config.config.path)) {
            _this.path = _this.config.config.path;
        } else {
            _this.path = _this.config.cwd;
        }

        // Set the available file types for the generator
        if (isDefined(_this.config.config.types) && _this.config.config.types.length > 0) {
            _this.types = _this.config.config.types;
        } else {
            grunt.warn('Please set some file types in the grunt config.');
        }

        // Set the extension of the generated file
        _this.extension = '.scss';

        /*
         * Helper functions
         */

        // Check if the given type is in the config
        _this.isType = function(val) {
            var i, _type = false;

            for (i = 0; i < _this.config.config.types.length; i++) {
                if (_this.config.config.types[i].name === val) {
                    _type = true;
                }
            }

            return _type;
        };

        // Check if a file already exists
        _this.fileExists = function(val) {
            // var _exists = false;
            
            //     console.log('file', getFilePath());

            // if (fs.statSync(getFilePath())) {
            //     _exists = true;
            // }

            // return _exists;
        };  
        
        // Prompt the user for data
        _this.promptUser = function(message, type, fn) {
            prompt.start();
            prompt.message = message;
            prompt.get([type], function(err, result){
                // Execute the callback function
                fn(result[type]);
            });
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
                        break;
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

        // Get the path to the generated file
        getFilePath = function() {
            return _this.path + _this.typePath + _this.subDir + '_' + _this.name + _this.extension;
        };

        // Get the path to the generated file
        getImportPath = function() {
            return _this.path + _this.typePath + _this.type + _this.extension;
        };

        // Save the new file
        _this.save = function(done) {
            _this.setComment();

            var _data = _this.comment;
            if (_this.type === 'mixins') {
                _data += '@mixin ' + _this.name + '() {\n\n}';
            } else if (_this.type === 'placeholders') {
                _data += '%' + _this.name + ' {\n\n}';
            } else {
                _data += '.' +_this.name + ' {\n\n}'
            }

            fs.writeFile(getFilePath(), _data, function(err) {
                if (err) {
                    throw err;
                }

                grunt.log.ok('Generated ' + getFilePath());

                var _import = '@import "' + _this.name + '";\n';

                fs.appendFile(getImportPath(), _import, function(err) {
                    if (err) {
                      throw err;
                    }
                    
                    grunt.log.ok('Appended @import "' + _this.name + '"; to ' + _this.type + '.scss');
                      
                    done();
                });
            });
        };

        return {
            'type': _this.type,
            'name': _this.name,
            'subDir': _this.subDir,
            'types': _this.types,
            'prompt': _this.promptUser,
            'promptValue' : _this.promptValue,
            'isType': _this.isType,
            'setType': _this.setType,
            'setName': _this.setName,
            'setSubDir': _this.setSubDir,
            'save': _this.save
        }
    };

    // Register the task
    grunt.registerTask('kg', 'Easily create new SCSS modules within a kumaGenerator project.', function(type, name, subDir) {
        var done = this.async(),
            _config,
            _promptType,
            _promptName,
            generator,
            _this = this;

        _config = {
            config : grunt.config.data.kg,
            cwd : process.cwd()
        };

        generator = new kumaGenerator(type, name, subDir, _config);

        if (!isDefined(subDir)) {
            subDir = '';
        }

        // Check if the type is given, and prompt if nececary
        _this.promptType = function(val) {
            if (!isDefined(val) || !generator.isType(val)) {
                grunt.log.ok('\nPlease provide a valid type, choose one of the following:');

                var i;
                for (i = 0; i < generator.types.length; i++) {
                    console.log(' - ' + generator.types[i].name);
                }

                generator.prompt('Please enter a type','type', function(val) {
                    _this.promptType(val);
                });
            } else {
                generator.setType(val);
                _this.promptName(name);
            }
        };

        // Check if the name is given, and prompt if nececary
        _this.promptName = function(val) {
            if (!isDefined(val)) {
                grunt.log.ok('\nPlease choose a name for the generated file:');

                generator.prompt('Enter a valid name','name', function(val) {
                    if (isDefined(val)) {
                        generator.setName(val);

                        _this.promptName(val);
                    } else {
                        console.log('Error setting name!');
                    }
                });
            } else {
                generator.save(done);
            }
        };

        // Start wizard
        if (isDefined(_config) && isDefined(_config.config) && isDefined(_config.config.types)) {
            _this.promptType(type);
        } else {
            grunt.warn('Error getting the config');
        }
        
    });
};