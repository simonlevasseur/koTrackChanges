;(function (factory) {
    'use strict';

    /* istanbul ignore next */
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("ko"), require("lodash"), exports);
    } else if (typeof define === "function" && define.amd) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["ko", "lodash", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, _, {});
    }
}(function (ko, _, exports) {
    'use strict';

    var api = exports;
    ko.trackChanges = api;

    var groups = {};

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
        refreshIsDirty: function () {
            ko.utils.arrayForEach(this.editables(), function (obs) {
                obs.refreshIsDirty();
            });
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
        var forceIsDirtyRefresh = ko.observable();

        // Remember the default value
        target.oldValue = ko.observable(_.clone(target(), true));

        // Add isDirty flag to observable
        target.isDirty = ko.computed(function () {
            forceIsDirtyRefresh();
            if (!options.onlyIf || (options.onlyIf && options.onlyIf.call(target)) ) {
                return !_.isEqual(target(), target.oldValue());
            }

            return false;
        });

        // Method to re-evaluate the isDirty computed
        target.refreshIsDirty = function () {
            forceIsDirtyRefresh.valueHasMutated();
        };

        // Sets the old value as the current value
        target.rollback = function rollback() {
            this(_.clone(this.oldValue(), true));
        };

        // Sets the current value as the old value
        target.commit = function commit() {
            this.oldValue(_.clone(this(), true));
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