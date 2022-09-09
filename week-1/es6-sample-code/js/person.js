class Person
{

    // Properties
    firstName;
    lastName;
    age;
    address;
    gender;
    emergencyContact;

    // Constructor
    constructor(fn = "no value", ln = "no value", age = "no value", add = "no value", gen = "no value", ec = "no value")
    {
        this.firstName = fn;
        this.lastName = ln;
        this.age = age;
        this.address = add;
        this.gender = gen;
        this.emergencyContact = ec;
    }

    // Methods
    displayFullName()
    {
        return `${this.firstName} ${this.lastName}`;
    }
}

export default Person;