export class Customer{
    private firstName : string;
    private lastName: string;
    private age: Number;

    constructor(firstName: string, lastName: string,age: Number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    public greeter(){
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    } 
    public GetAge(){
        return this.age;
    }   
}
let customer = new Customer("Ankitha", "Ralla",20);
customer.greeter();
console.log(customer.GetAge());