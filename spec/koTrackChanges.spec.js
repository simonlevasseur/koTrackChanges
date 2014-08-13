describe("koTrackChanges", function() {
    var myObs, deepObj;

    describe("Knockout Extender:", function () {
        beforeEach(function () {
            myObs = ko.observable(123).extend({ trackChanges: true });
            deepObj = { a: 1, b: { a: 1, b: new Date() } };
        });

        describe("when initialized", function() {
            it("should not be dirty", function() {
                expect(myObs.isDirty()).toBe(false);
            });

            it("should keep the same value when calling .rollback()", function() {
                myObs.rollback();
                expect(myObs()).toEqual(123);
            });

            it("should keep same value when calling .commit()", function() {
                myObs.commit();
                expect(myObs()).toEqual(123);
            });
        });

        describe("when value has changed", function() {
            it("should be dirty", function() {
                myObs(456);
                expect(myObs.isDirty()).toBe(true);
            });

            it("should be dirty even with deep objects", function() {
                myObs = ko.observable(deepObj).extend({ trackChanges: true });
                deepObj.b.a = 4;

                myObs.refreshIsDirty();
                expect(myObs.isDirty()).toBe(true);
            });

            it("should have saved the correct old value", function() {
                expect(myObs.oldValue()).toBe(123);
            });

            it("should not be dirty after calling .rollback()", function() {
                myObs(456);
                myObs.rollback();
                expect(myObs.isDirty()).toBe(false);
            });

            it("should not be dirty after calling .commit()", function() {
                myObs.commit(456);
                expect(myObs.isDirty()).toBe(false);
            });

            it("should not be dirty after calling .commit() with a value", function() {
                myObs.commit(789);
                expect(myObs.isDirty()).toBe(false);
            });

            it("should have the right value after calling .commit() with a value", function() {
                myObs.commit(847);
                expect(myObs()).toBe(847);
            });

            it("should have the right value after calling .commit() with a falsy value", function() {
                myObs.commit(null);
                expect(myObs()).toBeNull(true);
            });

            it("should save the latest value as the original value when calling .commit()", function() {
                myObs.commit(456);
                expect(myObs.oldValue()).toEqual(456);
            });

            it("should restore the old value in the observable when calling .rollback()", function() {
                var oldVal = myObs();
                myObs(456);
                myObs.rollback();
                expect(myObs()).toEqual(oldVal);
            });
        });

        describe("when using onlyIf", function() {
            var onlyIfObs;

            beforeEach(function () {
                onlyIfObs = ko.observable(true);
                myObs = ko.observable(123).extend({
                    trackChanges: {
                        onlyIf: function () {
                            return onlyIfObs();
                        }
                    }
                });
            });

            it("should not be dirty if function returns true and value has not changed", function () {
                expect(myObs.isDirty()).toBe(false);
            });

            it("should be dirty if function returns true and value has changed", function () {
                myObs('changed');
                expect(myObs.isDirty()).toBe(true);
            });

            it("should not be dirty if function returns false and value has not changed", function () {
                onlyIfObs('changed');
                expect(myObs.isDirty()).toBe(false);
            });

            it("should not be dirty if function returns false and value has changed", function () {
                onlyIfObs(false);
                myObs('changed');
                expect(myObs.isDirty()).toBe(false);
            });
        });
    });

    describe("Grouping:", function() {
        var obs1, obs2, obs3, myGroup;

        beforeEach(function () {
            obs1 = ko.observable(123).extend({ trackChanges: true });
            obs2 = ko.observable(new Date()).extend({ trackChanges: true });
            obs3 = ko.observable({ a: 1, b: 2 }).extend({ trackChanges: true });

            myGroup = new ko.trackChanges.Group([obs1, obs2, obs3]);
        });

        afterEach(function () {
            myGroup.dispose();
        });

        describe("when initialized", function () {
            it("should extend all observables to trackChanges", function () {
                var obs4 = ko.observable();
                var myNewGroup = new ko.trackChanges.Group([obs1, obs2, obs4]);
                expect(myNewGroup.isDirty()).toBe(false);
                obs4('changed');
                expect(myNewGroup.isDirty()).toBe(true);
            });

            it("should accept a single observable", function () {
                var myNewGroup = new ko.trackChanges.Group(obs1);
                expect(myNewGroup.isDirty()).toBe(false);
                obs1(456);
                expect(myNewGroup.isDirty()).toBe(true);
            });

            it("should accept observable arrays", function () {
                var myArr = ko.observableArray([obs1, obs2]);
                var myNewGroup = new ko.trackChanges.Group(myArr);
                expect(myNewGroup.isDirty()).toBe(false);
                obs1(456);
                expect(myNewGroup.isDirty()).toBe(true);
            });

            it("should not be dirty", function () {
                expect(myGroup.isDirty()).toBe(false);
            });

            it("should not be dirty after rolling back", function () {
                myGroup.rollbackAll();
                expect(myGroup.isDirty()).toBe(false);
            });

            it("should not be dirty after committing", function () {
                myGroup.commitAll();
                expect(myGroup.isDirty()).toBe(false);
            });

            it("should be able to add an observable to the group", function () {
                var obs4 = ko.observable().extend({ trackChanges: true });
                myGroup.add(obs4);
                expect(myGroup.editables().length).toEqual(4);
            });

            it("should be able to add an observable to the group that hasn't been extended yet", function () {
                var obs4 = ko.observable();
                myGroup.add(obs4);
                expect(myGroup.editables().length).toEqual(4);
            });

            it("should be able to add an array of observables to the group", function () {
                var obs4 = ko.observable();
                var obs5 = ko.observable().extend({ trackChanges: true });
                myGroup.add([obs4, obs5]);
                expect(myGroup.editables().length).toEqual(5);
            });

            it("should track an observable added after group creation", function () {
                var obs4 = ko.observable().extend({ trackChanges: true });
                var obs5 = ko.observable();
                myGroup.add(obs4);
                myGroup.add([obs5]);

                expect(myGroup.editables().length).toEqual(5);

                expect(myGroup.isDirty()).toBe(false);
                obs4('blah');
                expect(myGroup.isDirty()).toBe(true);

                myGroup.rollbackAll();

                expect(myGroup.isDirty()).toBe(false);
                obs5('blah');
                expect(myGroup.isDirty()).toBe(true);
            });

            it("should be able to remove an observable from the group", function () {
                expect(myGroup.editables().length).toEqual(3);
                myGroup.remove(obs1);
                expect(myGroup.editables().length).toEqual(2);
            });

            it("should be able to remove an array of observables from the group", function () {
                expect(myGroup.editables().length).toEqual(3);
                myGroup.remove([obs1, obs2]);
                expect(myGroup.editables().length).toEqual(1);
            });

            it("should not track an observable that was removed", function () {
                expect(myGroup.isDirty()).toBe(false);
                myGroup.remove(obs1);
                obs1(456);
                expect(myGroup.isDirty()).toBe(false);
            });

            it("should not track an array of observables that was removed", function () {
                expect(myGroup.isDirty()).toBe(false);
                myGroup.remove([obs1, obs2]);
                obs1(456);
                obs2(456);
                expect(myGroup.isDirty()).toBe(false);
            });
        });

        describe("when value has changed", function () {
            it("should be dirty", function () {
                obs1(456);
                expect(myGroup.isDirty()).toBe(true);
            });

            it("should be dirty even with deep objects", function () {
                obs1(456);
                obs3 = ko.observable(deepObj).extend({ trackChanges: true });
                deepObj.b.a = 4;

                myGroup.refreshIsDirty();
                expect(myGroup.isDirty()).toBe(true);
            });

            it("should not be dirty after rolling back", function () {
                obs1(456);
                myGroup.rollbackAll();
                expect(myGroup.isDirty()).toBe(false);
            });

            it("should not be dirty after committing", function () {
                obs1(456);
                myGroup.commitAll();
                expect(myGroup.isDirty()).toBe(false);
            });

            it("should display the right changes", function () {
                // One change
                obs1("Something different");
                var changes = myGroup.changes();
                expect(changes.length).toEqual(1);
                expect(changes[0]).toEqual(obs1);

                // Two changes
                obs2(new Date("2000"));
                var changes = myGroup.changes();
                expect(changes.length).toEqual(2);
                expect(changes[1]).toEqual(obs2);

                // Three changes
                obs3({ 'key': 123 });
                var changes = myGroup.changes();
                expect(changes.length).toEqual(3);
                expect(changes[2]).toEqual(obs3);
            });

            it("should print the right changes", function () {
                obs1(456);
                obs2('different');
                obs3({ a: 098, b: { c: 'Hello', d: 'World' } });
                myGroup.printChange();
                expect(true).toBe(true);
            });
        });

        describe("when disposing", function () {
            it("should dispose of all computed", function () {
                for (var prop in myGroup) {
                    if ( myGroup.hasOwnProperty(prop) && ko.isComputed(myGroup[prop]) ) {
                        expect(myGroup[prop].getDependenciesCount()).toBeGreaterThan(0);
                    }
                }

                myGroup.dispose();

                for (var prop in myGroup) {
                    if ( myGroup.hasOwnProperty(prop) && ko.isComputed(myGroup[prop]) ) {
                        expect(myGroup[prop].getDependenciesCount()).toEqual(0);
                    }
                }
            });
        });

        describe("when initialized with a topic", function () {
            beforeEach(function () {
                obs1 = ko.observable(123).extend({ trackChanges: 'myTopic' });
            });

            afterEach(function () {
                var group = ko.trackChanges.getGroup('myTopic');
                if (group) {
                    group.dispose();
                }
            });

            it("should create a group", function () {
                var instanceOfGroup = ko.trackChanges.getGroup('myTopic') instanceof ko.trackChanges.Group;
                expect(instanceOfGroup).toBe(true);
            });

            it("should append to the group if it already exists", function () {
                obs2 = ko.observable(123).extend({ trackChanges: 'myTopic' });
                var group = ko.trackChanges.getGroup('myTopic');
                expect(group.editables().length).toEqual(2);
            });

            it("should be able to dispose of a group with topic", function () {
                var group = ko.trackChanges.getGroup('myTopic');
                group.dispose();

                expect(ko.trackChanges.getGroup('myTopic')).toBeUndefined();
            });
        });
    });
});