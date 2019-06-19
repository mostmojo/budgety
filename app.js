// BUDGET CONTROLLER
var budgetController = (function() {
	// Some code
})();

// UI CONTROLLER (Grabs any value the user inputs into the given fields)
var UIController = (function() {
	var DOMStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	};

	return { // Anything returned from UIController below is made public, thus can be accessed by global appController
		getInput: function() {
			return {
				type: document.querySelector(DOMStrings.inputType).value, // Will be either `inc (+)` or `exp (-)`
				description: document.querySelector(DOMStrings.inputDescription).value,
				value: document.querySelector(DOMStrings.inputValue).value
			};
		},

		getDOMStrings: function() {
			return DOMStrings; // this exposes the private DOMStrings object into the public
		}
	};
})();

// GLOBAL APP CONTROLLER
var AppController = (function(budgetCtrl, UICtrl) {
	var getDOMStringsFromUIController = UICtrl.getDOMStrings(); // function that can access public object values from private var UIController

    var setupEventListeners = function() {
        document.querySelector(getDOMStringsFromUIController.inputBtn).addEventListener('click', ctrlAddItem); // when .add-btn is clicked callback ctrlAddItem
        document.addEventListener('keypress', function(event) { // when enter key event is pressed, call ctrlAddItem;
            if (event.key === 'Enter') {
                ctrlAddItem();
            }
        });
    };

	var ctrlAddItem = function() {
		// 1. Get the field input data
		var input = UICtrl.getInput(); // can access the public object values from var UIController

		// 2. Add the item to budget controller
		// 3. Add the item to UI
		// 4. Calculate the budget
		// 5. Display the budget to UI
    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

AppController.init();