// A class is a blue print used to create object(s). It indicates the properties
// and actions that each object will have from being created from the class

// Template
class Person
{

    // Properties
    firstName;
    lastName;
    age;
    address;
    gender;
    emergencyContact;

    // A constructor is a special type of method that is
    // used to create an object and/or intialize the object with default values
    constructor(fn = "no value", ln = "no value", age = "no value", add = "no value", gen = "no value", ec = "no value")
    {
        this.firstName = fn;
        this.lastName = ln;
        this.age = age;
        this.address = add;
        this.gender = gen;
        this.emergencyContact = ec;
    }

    // Methods (function attached to an object)

    displayFullName()
    {
        return `${this.firstName} ${this.lastName}`;
    }
}

// Instantiating classes
const p0 = new Person();
p0.firstName = "Riahnna";

console.log("P0 INFO: \n");
console.log(p0.firstName);
console.log(p0.lastName);


const p1 = new Person("Jon", "Snow");

console.log("\n\nP1 INFO: \n");
console.log(p1.firstName);
console.log(p1.lastName);



const p2 = new Person("Thanos", "Thanos", 53, "Titan", "male", "Thane");

console.log("\n\nP2 INFO: \n");
console.log(p2.firstName);
console.log(p2.lastName);


const p3 = new Person("Madonna", undefined, 60);

console.log("\n\nP3 INFO: \n");
console.log(p3.firstName);
console.log(p3.lastName);
