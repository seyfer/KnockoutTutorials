$(function () {

    // This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
    function AppViewModel() {

        //start watch this variable. technically make it like object
        this.firstName = ko.observable("Bert");
        this.lastName = ko.observable("Bertington");

        //watch variable with custom logic
        this.fullName = ko.computed(function () {
            return this.firstName() + " " + this.lastName();
        }, this);

        this.capitalizeLastName = function () {
            // Read the current value. Interact with like with object
            var currentVal = this.lastName();
            // Write back a modified value
            this.lastName(currentVal.toUpperCase());
        };
    }

    // Activates knockout.js
    ko.applyBindings(new AppViewModel());
});
