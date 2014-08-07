# koTrackChanges [![Build Status](https://travis-ci.org/simonlevasseur/koTrackChanges.svg?branch=master)](https://travis-ci.org/simonlevasseur/koTrackChanges)

**koTrackChanges** is an extender for [Knockout.js](http://knockoutjs.com) to track value changes. It allows you to determine if values were changed but not saved, as well as undo unsaved changes.

It provides a simple and intuitive way to track changes of your observables without cluttering your view model. The entire library is unit tested and has 100% coverage.

## Getting Started

This project uses [Node.js](http://nodejs.org) to install dependencies. It also uses [Grunt.js](http://gruntjs.com) for building. To get started:
```javascript
npm install;
grunt;
```

## Dependencies

This library depends on **Knockout.js v2.3.0 or newer** and **Underscore.js**.

There are 2 available builds to choose from: a **bare bones version** and a version with a **custom build of underscore included**. If your project already uses Underscore.js you should use the bare bones version otherwise you must use the version with underscore.

## Basic Usage

```javascript
var firstName = ko.observable('Simon').extend({ trackChanges: true });
```

The following properties are made available on the observable:
* **isDirty** (computed observable) -  returns whether the observable has changed
* **oldValue** (observable) - returns the original value of the observable
* **rollback** (function) - restores the original value in the observable, isDirty becomes false
* **commit** (function) - sets the current value to be the new original value, isDirty becomes false

## Grouping
You may want to track several observables at the same time. For this very reason, there are a few ways to create what we call a group.

### Method 1 - Group constructor

The Group constructor is available either directly from the module or on the ko.trackChanges namespace (but not both).

Group constructor accepts as a parameter:
* single observable
* array of observables
* observable array

Notes:
1. Any value that is not an observable will be ignored.
2. Any observable that hasn't been extended with trackChanges will be extended during the grouping.


Example:

```javascript
var obs1 = ko.observable('hello').extend({ trackChanges: true });
var obs2 = ko.observable('world');
var myGroup = new ko.trackChanges.Group([obs1, obs2]);
```

The group has the following methods available:
* Functions
    * **isDirty** (computed observable) - returns whether the group has changes
    * **editables** (observable array) - all the observables that are part of the group
    * **changes** (computed observable) - returns a list of all observables that are dirty within the group
    * **rollbackAll** (function) - restores the original value in each of the observables, group isDirty becomes false
    * **commitAll** (function) - sets the current value of each of the observables to be their new original value, group isDirty becomes false
    * **add** (function) - adds an observable, array of observables or observable array to a group
    * **remove** (function) - remove an observable, array of observables of oservable array from a group
    * **dispose** (function) - dispose of all the computed and references related to the group

### Method 2 - Ko extend with a topic
This method is probably the most practical approach if you know ahead of time what you want to group together.

This approach makes it easy to eliminate observables that belong to a group. The only extra step is that in order to get the Group instance, you need to use a new function:
* **getGroup** (function) - returns the instance of the Group

Example:
```javascript
var firstName = ko.observable('John').extend({ trackChanges: 'personForm' });
var lastName = ko.observable('Doe').extend({ trackChanges: 'personForm' });
var email = ko.observable('johndoe@example.com').extend({ trackChanges: 'personForm' });

var group = ko.trackChanges.getGroup('personForm'); // This is optional

if (group.isDirty()) {
    // User has unsaved changes
} else {
    // User hasn't edited the form yet
}
```

## License

MIT - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
