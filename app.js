// BUDGET CONTROLLER
var budgetController = (function() {
    // Some code
})();


// UI CONTROLLER (Grabs any value the user inputs into the given fields)
var UIController = (function() {

    return {
        getInput: function() {
            return {
                type: document.querySelector('.add__type').value, // Will be either `inc` or `exp`
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value
            }
        }
    }
})();


// GLOBAL APP CONTROLLER
var AppController = (function(budgetCtrl, UICtrl) { // these are params
    var ctrlAddItem = function() {
        // 1. Get the field input data
        var input = UICtrl.getInput(); // can access the public object values from var UIController
        console.log(input);

        // 2. Add the item to budget controller

        // 3. Add the item to UI

        // 4. Calculate the budget

        // 5. Display the budget to UI
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            ctrlAddItem();
        }
    })
})(budgetController, UIController);
