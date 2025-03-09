"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
var Customer = /** @class */ (function () {
    function Customer(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstName, " ").concat(this.lastName));
    };
    Customer.prototype.GetAge = function () {
        return this.age;
    };
    return Customer;
}());
exports.Customer = Customer;
var customer = new Customer("Ankitha", "Ralla", 20);
customer.greeter();
console.log(customer.GetAge());
