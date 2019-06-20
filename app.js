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

	var calculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(function(cur) {
			sum += cur.value; // cur aka current refers to income or expense object stored in Totals object & its array, in the data object. So, take the values by index, of the exp or inc array and sum them up
		});
		data.totals[type] = sum;
	}

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
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

		calculateBudget: function() { // has access to the private calculateTotal func because closures 🧙‍♂️
			// 1. Calculate total income and expenses (type: exp/inc from data object)
			calculateTotal('exp');
			calculateTotal('inc');
			// 2. Calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;
			// 3. Calculate the percentage of income that we spend (exp/inc * 100)
			if (data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},

		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
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
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage'
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
			fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
			fieldsArr = Array.prototype.slice.call(fields);
			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			})

			fieldsArr[0].focus();
		},

		displayBudget: function(obj) {
			document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;
			document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;
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
		budgetCtrl.calculateBudget();
		// 2. return the budget
		var budget = budgetCtrl.getBudget();
		// 3. Display budget to UI
		console.log(budget);
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

