'use strict';

var through = require('through2');
var path = require('path');

/**
 * POLYFILL: Node.js 4.x required for Object.assign
 */
var extend = Object.assign || function() {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        i, len, obj, key,
        ret = arguments[0];
    for (i = 1, len = arguments.length; i < len; i ++) {
        obj = arguments[i];
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                ret[key] = obj[key];
            }
        }
    }
    return ret;
};

var defaults = {
    base: '.',
    original: true
};

/**
 * @param {(string|object)} [options={}]
 */
module.exports = function(options) {

    // TODO: more complex checking needed
    if (!options) {
        options = {};
    } else if (typeof options === 'string') {
        options = {
            base: options
        };
    }

    options = extend({}, defaults, options);

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
