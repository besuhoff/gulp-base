'use strict';


var through = require('through2'),
    pathResolve = require('path').resolve,
    objectAssign = require('./assign'),
    arrayFrom = require('./from'),
    is = require('./is'),
    isString = is.string,
    isFunction = is.function,
    isPlainObject = is.plainOjbect;


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
    } else if (isString(options)) {
        options = {base: options};
    } else if (!isPlainObject(options)) {
        return through.obj();
    }

    options = objectAssign({}, defaults, options);

    var base = options.base,
        original = options.original;

    return through.obj(function(file, encoding, callback) {

        // resets file.path
        if (original && (file.path !== file.history[0])) {
            file.path = file.history[0];
        }

        // updates file.base
        if (base) {
            file.base = pathResolve(file.cwd, base);
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

    if (!isFunction(inspector)) {
        return through.obj();
    }

    return through.obj(function(file, encoding, callback) {

        inspector(objectAssign(Object.create({
            isBuffer: function() {
                return file.isBuffer();
            },
            isStream: function() {
                return file.isStream();
            },
            isNull: function() {
                return file.isNull();
            }
        }), {
            cwd: file.cwd,
            path: file.path,
            base: file.base,
            relative: file.relative,
            history: arrayFrom(file.history)
        }));

        callback(null, file);
    });
};


module.exports = base;
