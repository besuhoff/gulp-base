'use strict';

var through = require('through2');
var path = require('path');

var defaults = {
    base: '.',
    original: true
};

/**
 * [options] => Type: string, object; Default: {}
 */
module.exports = function(options) {

    if (!options) {
        options = {};
    } else if (typeof options === 'string') {
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
