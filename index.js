'use strict';

var through = require('through2');
var path = require('path');

// var isString = string => typeof string === 'string';
var isString = function(string) {
    return typeof string === 'string';
};

// var noop = through.obj();
var defaults = {
    base: '.',
    original: true
};

// options: string | object
module.exports = function(options) {

    if (isString(options)) {
        options = {
            base: options
        };
    }

    options = Object.assign({}, defaults, options);

    var base = options.base;
    var original = options.original;

    return through.obj(function(file, encoding, callback) {

        if (original && (file.path !== file.history[0])) {
            file.path = file.history[0];
        }
        if (base) {
            file.base = path.join(file.cwd, base);
        }

        this.push(file);
        callback();
    });
};
