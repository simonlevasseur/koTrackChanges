// koTrackChanges 1.0.0 | (c) 2014 Simon LeVasseur |  http://www.opensource.org/licenses/mit-license
;(function (factory) {
    'use strict';

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(exports);
    } else if (typeof define === "function" && define.amd) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(window._ = {});
    }
}(function (exports) {
    'use strict';

    var _ = exports;

    // Save bytes in the minified (but not gzipped) version:
    var ObjProto = Object.prototype;

    // Create quick reference variables for speed access to core prototypes.
    var hasOwnProperty = ObjProto.hasOwnProperty,
        toString = ObjProto.toString;

    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var nativeKeys = Object.keys,
        nativeIsArray = Array.isArray;

    // Retrieve the names of an object's properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        return keys;
    };

    // Retrieve the values of an object's properties.
    _.values = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    // Private underscore compare function
    function eq(a, b, aStack, bStack) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
        if (a === b) return a !== 0 || 1 / a == 1 / b;

        // A strict comparison is necessary because `null == undefined`.
        if (a == null || b == null) return a === b;

        // Compare `[[Class]]` names.
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
            // Strings, numbers, dates, and booleans are compared by value.
            case '[object String]':
                // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                // equivalent to `new String("5")`.
                return a == String(b);
            case '[object Number]':
                // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
                // other numeric values.
                return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
            case '[object Date]':
            case '[object Boolean]':
                // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                // millisecond representations. Note that invalid dates with millisecond representations
                // of `NaN` are not equivalent.
                return +a == +b;
            // RegExps are compared by their source patterns and flags.
            case '[object RegExp]':
                return a.source == b.source &&
                    a.global == b.global &&
                    a.multiline == b.multiline &&
                    a.ignoreCase == b.ignoreCase;
        }

        if (typeof a != 'object' || typeof b != 'object') return false;

        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
        var length = aStack.length;
        while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (aStack[length] == a) return bStack[length] == b;
        }

        // Objects with different constructors are not equivalent, but `Object`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                                 _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
            return false;
        }

        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);
        var size = 0, result = true;

        // Recursively compare objects and arrays.
        if (className == '[object Array]') {
            // Compare array lengths to determine if a deep comparison is necessary.
            size = a.length;
            result = size == b.length;
            if (result) {
                // Deep compare the contents, ignoring non-numeric properties.
                while (size--) {
                    if (!(result = eq(a[size], b[size], aStack, bStack))) break;
                }
            }
        } else {
            // Deep compare objects.
            for (var key in a) {
                if (_.has(a, key)) {
                    // Count the expected number of properties.
                    size++;
                    // Deep compare each member.
                    if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
                }
            }

            // Ensure that both objects contain the same number of properties.
            if (result) {
                for (key in b) {
                    if (_.has(b, key) && !(size--)) break;
                }
                result = !size;
            }
        }

        // Remove the first object from the stack of traversed objects.
        aStack.pop();
        bStack.pop();
        return result;
    }

    // Public underscore compare function
    _.isEqual = function (a, b) {
        if (!a && !b) {
            return true;
        }
        return eq(a, b, [], []);
    };

    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };

    // Is a given variable an object?
    _.isObject = function(obj) {
        return obj === Object(obj);
    };

    // Is a given variable a function?
    _.isFunction = function(obj) {
        return toString.call(obj) === '[object Function]';
    };

    // Optimize `isFunction` if appropriate.
    if (typeof /./ !== 'function') {
        _.isFunction = function(obj) {
            return typeof obj === 'function';
        };
    }

    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    _.has = function(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };
}));

;(function (factory) {
    'use strict';

    /* istanbul ignore next */
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("ko"), require("underscore"), exports);
    } else if (typeof define === "function" && define.amd) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["ko", "underscore", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, _, ko.trackChanges = {});
    }
}(function (ko, _, exports) {
    'use strict';

    var api = exports;

    var groupKey = 'group',
        groupIndex = 1,
        groups = {};

    /***************/
    /***** API *****/
    /***************/

    api.Group = function (values) {
        // Get editables
        var tempArray = [];
        this.editables = ko.observableArray([]);

        /* istanbul ignore else */
        if (values) {
            /* istanbul ignore else */
            if (!_.isArray(values) && !(ko.isObservable(values) && 'push' in values)) {
                values = [values];
            }

            ko.utils.arrayForEach(ko.unwrap(values), function (val) {
                /* istanbul ignore else */
                if (ko.isObservable(val)) {
                    if (!val.isDirty) {
                        val.extend({ trackChanges: true });
                    }
                    tempArray.push(val);
                }
            });

            this.editables(tempArray);
        }

        this.changes = ko.computed(this.getChanges, this);
        this.isDirty = ko.computed(this.getIsDirty, this);
    };

    api.Group.prototype = {
        getChanges: function () {
            var changes = [];
            ko.utils.arrayForEach(this.editables(), function (obs) {
                if (obs.isDirty()) {
                    changes.push(obs);
                }
            });
            return changes;
        },
        getIsDirty: function () {
            return this.changes().length > 0;
        },
        commitAll: function () {
            ko.utils.arrayForEach(this.editables(), function (obs) {
                obs.commit();
            });
        },
        rollbackAll: function () {
            ko.utils.arrayForEach(this.editables(), function (obs) {
                obs.rollback();
            });
        },
        add: function (list) {
            if (!_.isArray(list) && !(ko.isObservable(list) && 'push' in list)) {
                list = [list];
            }

            var editables = this.editables;
            ko.utils.arrayForEach(ko.unwrap(list), function (target) {
                /* istanbul ignore else */
                if (ko.isObservable(target)) {
                    if (!target.isDirty) {
                        target.extend({ trackChanges: true });
                    }
                    editables.push(target);
                }
            });
        },
        remove: function (list) {
            if (!_.isArray(list) && !(ko.isObservable(list) && 'push' in list)) {
                list = [list];
            }

            this.editables.removeAll(list);
        },
        dispose: function () {
            this.changes.dispose();
            this.isDirty.dispose();

            // Delete group reference in groups object if it exists
            for (var prop in groups) {
                /* istanbul ignore else */
                if (groups.hasOwnProperty(prop) && groups[prop] === this) {
                    delete groups[prop];
                }
            }
        }
    };

    api.getGroup = function (topic) {
        return groups[topic];
    };

    /***********************/
    /***** KO EXTENDER *****/
    /***********************/
    ko.extenders.trackChanges = function (target, options) {
        // Remember the default value
        target.oldValue = ko.observable(target());

        // Add isDirty flag to observable
        target.isDirty = ko.computed(function () {
            if (!options.onlyIf || (options.onlyIf && options.onlyIf.call(target)) ) {
                return !_.isEqual(target(), target.oldValue());
            }

            return false;
        });

        // Sets the old value as the current value
        target.rollback = function rollback() {
            this(this.oldValue());
        };

        // Sets the current value as the old value
        target.commit = function commit() {
            this.oldValue(this());
        };

        // Add to group if topic was provided
        if (typeof options == 'string' || options instanceof String) {
            if (groups[options]) {
                groups[options].editables.push(target);
            } else {
                groups[options] = new api.Group([target]);
            }
        }

        return target;
    };
}));