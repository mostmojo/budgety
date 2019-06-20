# TO DO

## Pt. 1

* Add event listener to button
* Get input values from form
* Add the new item to data structure
* Add new item to UI
* Calculate budget
* Update UI

## Pt. 2

* Add event handler
* Delete the item from data structure
* Delete item from UI
* Re-calculate budget
* Update the UI

----------

## Modules

* Import aspect of any robust app architecture
* Keep units of code for a project both cleanly separated and organized
* Encapsulate some data privately and expose other data publicly

----------

1; **UI MODULE**

* Get input values from form
* Add new item to UI
* Update UI

2; **DATA MODULE**

* Add the new item to data structure
* Calculate budget

3; **CONTROLLER MODULE**

* Add event handler

----------

### Closure notes

* In closures, the returning value of a method or function becomes the object in a simple `k:v pair`
* ex.

```
var myBankAccount = (function() {
  var balance = 0;

  return {
    getBalance: function() {
                  return balance
                }
  }
})()
```

* Balance is still reachable by this function since it was captured inside the closure
* This will return { `getBalance: 0` }, allowing access to it by myBankAccount.getBalance = 0;
* Because balance is closed off, only myBankAccount can do things with it now, nobody outside has access to balance
* The javascript engine knows that balance is still referenced in various places so it doesnt get removed from memory
* More explanation: it looks like the value of `myBankAccount` is being assigned to a `function`, but the `()` at the end means the function gets immediately called, and whatever that function _returns_ becomes the `value` of `myBankAccount` ...and it returns a plain old object `k:v`
* 'Packing away variables into little impenetrable boxes by returning indirect references to them' - AG 😅

----------

### App notes

* Adding a condition like `if(input.description !== "" && !isNaN(input.value) && input.value > 0)` checks whether description is not empty, and the NaN operator boolean is false, thus there is a numeric value and it's also > 0.

----------

### High level overview of app

<p align="center">
  <img width="720" height="420" src="https://res.cloudinary.com/mostmojo/image/upload/v1561041646/Screenshot_2019-06-20_at_15.38.40.png">
</p>

----------

### Event bubbling, target element and event delegation

Use cases:

1; When we have element with child elements we're interested in - no need to add event handler to all children, just the parent

2; When we want an event handler attached to an element that is not yet in the DOM when our page is loaded (for example our income and expenses that the user has not yet typed in)

----------

### Delete an item

```
deleteItem: function(type, id) {
  var ids, index;

  // id = 6
  // data.allItems[type][id];
  // ids = [1 2 4 6 8]
  // index = 3

  var ids = data.allItems[type].map(function(current){ //creates new array, with value of current argument too
    return current.id; // say a 6 was passed in here, or that's what we want, we use indexOf() to find its index
  });

  index = ids.indexOf(id);

  if (index !== -1) {
    data.allItems[type].splice(index, 1);
  }
}
```