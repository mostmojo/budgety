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
		},

		calculateBudget: function() {

			// 1. Calculate total income and expenses

			// 2. Calculate the budget: income - expenses

			// 3. Calculate the percentage of income that we spend

		},

		testing: function() {
			console.log(data);
		}
	}

})();


// UI CONTROLLER (Grabs any value the user inputs into the given fields)
var UIController = (function() {
	var DOMStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	};

	return {
		// Anything returned from UIController below is made public, thus can be accessed by global appController
		getInput: function() {
			return {
				type: document.querySelector(DOMStrings.inputType).value, // Will be either `inc (+)` or `exp (-)`
				description: document.querySelector(DOMStrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
			};
		},

		addListItem: function(obj, type) {
			var html, newHtml, element;
			// Create HTML string with placeholder text
			if (type === 'inc') {
				element = DOMStrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMStrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			// Replace the placeholder text with some actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);
			// Insert HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		clearFields: function() {
			var fields, fieldsArr;
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMStrings.inputValue);
			fieldsArr = Array.prototype.slice.call(fields);
			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			})

			fieldsArr[0].focus();
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

	var updateBudget = function() {
		// 1. Calculate budget


		// 2. return the budget

		// 3. Display budget to UI
	}

	var ctrlAddItem = function() {
		var input, newItem;
		// 1. Get the field input data
		input = UICtrl.getInput(); // can access the public object values from var UIController

		if(input.description !== "" && !isNaN(input.value) && input.value > 0) {

		// 2. Add the item to budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		// 3. Add the item to UI
		UICtrl.addListItem(newItem, input.type);
		// 4. Clear the fields
		UICtrl.clearFields();
		// 5. Calculate and update budget
		updateBudget();
		}
	};

	return {
		init: function() {
			console.log('Application has started.');
			setupEventListeners();
		}
	};
})(budgetController, UIController);

AppController.init();

