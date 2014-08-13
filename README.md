# koTrackChanges [![Build Status](https://travis-ci.org/simonlevasseur/koTrackChanges.svg?branch=master)](https://travis-ci.org/simonlevasseur/koTrackChanges) [![Coverage Status](https://img.shields.io/coveralls/simonlevasseur/koTrackChanges.svg)](https://coveralls.io/r/simonlevasseur/koTrackChanges)

**koTrackChanges** is an extender for [Knockout.js](http://knockoutjs.com) to track value changes. It allows you to determine if values were changed but not saved, as well as undo unsaved changes.

It provides a simple and intuitive way to track changes of your observables without cluttering your view model. The entire library is unit tested and has 100% coverage.

## Getting Started

This project uses [Node.js](http://nodejs.org) to install dependencies. It also uses [Grunt.js](http://gruntjs.com) for building. To get started:
```javascript
npm install;
grunt;
```

## Dependencies

This library depends on **Knockout.js v2.3.0 or newer** and **Lo-Dash.js**. There is a custom lightweight version of lo-dash supplied if you're not already using it otherwise it's not required.

## Basic Usage

```javascript
var firstName = ko.observable('Simon').extend({ trackChanges: true });
```

The following properties are made available on the observable:
* **isDirty** (computed observable) -  returns whether the observable has changed
* **refreshIsDirty** (function) -  forces the isDirty computed to re-evaluate
* **oldValue** (observable) - returns the original value of the observable
* **rollback** (function) - restores the original value in the observable, isDirty becomes false
* **commit** (function) - sets the passed in value (if provided and not undefined, otherwise uses current value) as the new original value, isDirty becomes false

## Objects

Comparing objects can be tricky in javascript because they are passed around by reference. This means that changing a property it one place may change it in several. This library handles all the defaults by deep cloning objects and arrays.

Another important factor is in situations where your observable contains an entire object. Changing a property will not trigger an update on the observable which in turn means the isDirty flag will not update. To overcome this you have 2 options:

### Method 1 - Call observable.valueHasMutated()

By calling the valueHasMutated function on the observable you will trigger the isDirty flag to update.

### Method 2 - Call observable.refreshIsDirty()

Instead of updating the observable explicitly which could be too often to your liking, you may also call a special function called refreshIsDirty on the observable. This will force the computed to re-evaluate and therefore render proper results.

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
    * **refreshIsDirty** (function) - forces all the observable isDirty flags to re-evaluate
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