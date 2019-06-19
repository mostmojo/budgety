// BUDGET CONTROLLER
var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	}

	return {
		addItem: function(type, desc, val) {
			var newItem, ID;

			// Create new ID
			if (data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// Create new items based on 'inc' or 'exp' type
			if (type === 'exp') {
				newItem = new Expense(ID, desc, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, desc, val);
			}

			// Push it into our data structure
			data.allItems[type].push(newItem);

			// Return new element
			return newItem;
		}
	}

})();


// UI CONTROLLER (Grabs any value the user inputs into the given fields)
var UIController = (function() {
	var DOMStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	};

	return {
		// Anything returned from UIController below is made public, thus can be accessed by global appController
		getInput: function() {
			return {
				type: document.querySelector(DOMStrings.inputType).value, // Will be either `inc (+)` or `exp (-)`
				description: document.querySelector(DOMStrings.inputDescription).value,
				value: document.querySelector(DOMStrings.inputValue).value
			};
		},

		addListItem: function(obj, type) {
			// Create HTML string with placeholder text

			// Replace the placeholder text with some actual data

			// Insert HTML into the DOM
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
		document.addEventListener('keypress', function(event) {
			// when enter key event is pressed, call ctrlAddItem;
			if (event.key === 'Enter') {
				ctrlAddItem();
			}
		});
	};

	var ctrlAddItem = function() {
		var input, newItem;
		// 1. Get the field input data
		input = UICtrl.getInput(); // can access the public object values from var UIController
		// 2. Add the item to budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		// 3. Add the item to UI
		// 4. Calculate the budget
		// 5. Display the budget to UI
	};

	return {
		init: function() {
			console.log('Application has started.');
			setupEventListeners();
		}
	};
})(budgetController, UIController);

AppController.init();
