'use strict';

/**
 * POLYFILL: Node.js >= 4.x required for Array.from
 */
module.exports = Array.from || function(array) {
    return Array.prototype.slice.call(array, 0);
};
