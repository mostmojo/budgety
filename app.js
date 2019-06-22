// BUDGET CONTROLLER
var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	// Has to be a prototype of parent constructor Expense as later can be access by instances of expenses
	Expense.prototype.calcPercentage = function(totalIncome) {
		if (totalIncome > 0){
			this.percentage = Math.round((this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function() {
		return this.percentage;
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

            // [1 2 3 4 5], next ID = 6
            // [1 3 4 6 8], next ID = 9
            // ID = last ID + 1

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

        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1); // splice takes 2 params: index var & how many to delete
            }
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

			// Expense = 100 & income = 300; spent 33.333% = 100/300 = 0.333 * 100. THEN Math.round()
		},

		calculatePercentages: function() {

			/*
			a = 20
			b = 10
			c = 40
			income = 100
			a = 20/100 = 20%
			b = 10/100 = 10%
			c = 40/100 = 40%
			*/

			data.allItems.exp.forEach(function(cur) {
				cur.calcPercentage(data.totals.inc);
			});
		},

		getPercentages: function() {
			var allPerc = data.allItems.exp.map(function(cur) {
				return cur.getPercentage();
			});
			return allPerc;
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
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage'
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
				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><ion-icon name="close"></ion-icon></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMStrings.expensesContainer;
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><ion-icon name="close"></ion-icon></div></div>';
			}
			// Replace the placeholder text with some actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);
			// Insert HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		deleteListItem: function(selectorID) {
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
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

			if (obj.percentage > 0) {
				document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMStrings.percentageLabel).textContent = '---';
			}
		},

		displayPercentages: function(percentages) {
			var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

			var nodeListForEach = function(list, callback) {
				for (var i = 0; i < list.length; i++) {
					callback(list[i], i); // current -> list[i], index -> i; In each iteration of this loop, the callback fn gets called
				}
			}
			nodeListForEach(fields, function(current, index) {

				if (percentages[index] > 0) {
					current.textContent = percentages[index] + '%';
				} else {
					current.textContent = '---';
				}
			});
		},

		formatNumber: function(num, type) {
			/*

			+ or - before number
			exactly 2 decimal places
			comma separating the thousands
			*/

			num = Math.abs(num);
		}

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
		document.querySelector(getDOMStringsFromUIController.container).addEventListener('click', ctrlDeleteItem);
	};


	var updateBudget = function() {
		// 1. Calculate budget
		budgetCtrl.calculateBudget();
		// 2. return the budget
		var budget = budgetCtrl.getBudget();
		// 3. Display budget to UI
		UICtrl.displayBudget(budget);
	};

	var updatePercentages = function() {

		// 1. Calculate percentages
		budgetCtrl.calculatePercentages();
		// 2. Read percentages from the budget controller
		var percentages = budgetCtrl.getPercentages();
		// 3. Update the UI with the new percentages
		UICtrl.displayPercentages(percentages);
	};

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

		// 6. Calculate and update percentages
		updatePercentages();

		}
	};

	var ctrlDeleteItem = function(event) {
		var itemID, splitID, type, ID;

		itemID = (event.target.parentNode.parentNode.parentNode.parentNode.id);
		if (itemID) {
			// inc-1 => will be `.split` into ["inc", "1"] w/ this JS method
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// 1. Delete the item from the data structure
			budgetCtrl.deleteItem(type, ID);

			// 2. Delete the item from the UI
			UICtrl.deleteListItem(itemID);

			// 3. Update and show the new budget
			updateBudget();

			// 4. Calculate and update percentages
			updatePercentages();
		}
	};

	return {
		init: function() {
			console.log('Application has started.');
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			setupEventListeners();
		}
	};
})(budgetController, UIController);

AppController.init();

