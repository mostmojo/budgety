# TO DO

* Add event listener to button
* Get input values from form
* Add the new item to data structure
* Add new item to UI
* Calculate budget
* Update UI
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

---------

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


