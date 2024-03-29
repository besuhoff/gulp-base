'use strict';

module.exports = {
    string: function(x) {
        return typeof x === 'string';
    },
    function: function(x) {
        return typeof x === 'function';
    },
    plainObject: function(x) {
        if (x && typeof x === 'object') {
            var t = Object.getPrototypeOf(x);
            return t === Object.prototype || t === null;
        }
        return false;
    }
};
