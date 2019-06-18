var budgetController = (function() {
    var x = 23;
    var add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            return (add(b));
        }
    }
})();

// budgetController.x || budgetController.add return undefined because they are in function scope and can't be accessed.
// budgetController.publicTest(5) => 28, because of the closure. param `b` has access to param `a` above, replaces it and then 23 + 5 is calculated.

var UIController = (function() {
// Some code
})();

var AppController = (function(budgetCtrl, UICtrl) { // these are params
    var z = budgetCtrl.publicTest(5);
    return {
        anotherPublic: function() {
            console.log(z);
        }
    }
})(budgetController, UIController); // these are arguments











// ----- COMMENTS / EXPLAINED ----- //
// we pass budgetController and UIController as arguments to the budgetCtrl and UICtrl parameters. Named differently to simply distinguish that they are different :)
// budgetCtrl.publicTest(5) is in private scope so create another public method to display z to console
// ☝🏻 that's the only way we can have access to var z

// In console: AppController.anotherPublic();
// To connect the budgetController, first we add it as an argument to AppController at the bottom. This gets passed as an argument to budgetCtrl parameter
// Because of the nature of closures, we can now access publicTest(5) aka the budgetController and the add function which returns 28.
// To display it, we need to create another public method (anotherPublic) and console log it.
// This looks so similar to React / Vue!🤓