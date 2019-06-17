var budgetController = (function() {
    var x = 23;
    var add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            console.log(add(b));
        }
    }
})();

// budgetController.publicTest(5) => 28 because of the closure. param b has access to param a above, replaces it and then 23 + 5 is calc'd