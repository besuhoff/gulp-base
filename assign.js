'use strict';

/**
 * POLYFILL: Node.js >= 4.x required for Object.assign
 */
module.exports = Object.assign || function() {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        args = arguments,
        i, len, obj, key,
        ret = args[0];
    for (i = 1, len = args.length; i < len; i ++) {
        obj = args[i];
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                ret[key] = obj[key];
            }
        }
    }
    return ret;
};
