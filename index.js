'use strict';

var through = require('through2'),
    pathJoin = require('path').join,
    objectAssign = require('./assign'),
    arrayFrom = require('./from');

var defaults = {
    base: '.',
    original: true
};

/**
 * @param {(string|object)} [options={}] - If typed as `string`, it will be replaced with `{base: options}`.
 * @param {string} [options.base='.']
 * @param {boolean} [options.original=true]
 */
function base(options) {

    if (!options && options !== '') {
        options = {};
    } else if (typeof options === 'string') {
        options = {base: options};
    } else if (options !== new Object(options)) {
        return through.obj();
    }

    options = objectAssign({}, defaults, options);

    var base = options.base;
    var original = options.original;

    return through.obj(function(file, encoding, callback) {

        if (original && (file.path !== file.history[0])) {
            file.path = file.history[0];
        }

        if (base) {
            file.base = pathJoin(file.cwd, base);
        }

        callback(null, file);
    });
}

/**
 * @callback inspectFunction
 * @param {object} file
 * @param {string} file.cwd
 * @param {string} file.path
 * @param {string} file.base
 * @param {string} file.relative
 * @param {string[]} file.history
 */

/**
 * @param {inspectFunction} inspector
 */
base.inspect = function(inspector) {

    if (typeof inspector !== 'function') {
        return through.obj();
    }

    return through.obj(function(file, encoding, callback) {

        inspector({
            cwd: file.cwd,
            path: file.path,
            base: file.base,
            relative: file.relative,
            history: arrayFrom(file.history)
        });

        callback(null, file);
    });
};

module.exports = base;
