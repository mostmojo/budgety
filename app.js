// BUDGET CONTROLLER
var budgetController = (function() {
    // Some code
})();



// UI CONTROLLER
var UIController = (function() {
// Some code
})();



// GLOBAL APP CONTROLLER
var AppController = (function(budgetCtrl, UICtrl) { // these are params
    var ctrlAddItem = function() {
        // 1. Get the field input data

        // 2. Add the item to budget controller

        // 3. Add the item to UI

        // 4. Calculate the budget

        // 5. Display the budget to UI

        console.log('It works yolo')
    }

    // When ADD BTN is clicked: No need for () on ctrlAddItem as it's a callback, triggered on click event by addEventListener
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

    // When ENTER key is pressed, then get ctrlAddItem to run
    document.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            ctrlAddItem();
        }
    })
})(budgetController, UIController);
