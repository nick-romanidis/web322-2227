const person = 
{
    firstName: "Jon",
    lastName: "Snow",
    age: 25,
    address: "Beyond the Wall",
    gender: "Male",
    emergencyContact: "Batman",
    contact:
    {
        phoneNo: "111-11111",
        email : "jon@snow.com"
    },

    // Method Syntax
    displayFullName()
    {
        return `${this.firstName} ${this.lastName}`;
    }
}


const displayInfo = (fn, gender, phoneNo)=>
{
    console.log(fn);
    console.log(gender);
    console.log(phoneNo);
}


// Destructure an object (An array or object)

const { firstName, gender, contact } = person;

console.log(firstName);
console.log(gender);
console.log(contact);

displayInfo(firstName, gender, contact.phoneNo);


// Destructuring for an Array
const movies = [ "Titanic", "The Avengers: Infinity Wars", "The Matrix", "Bad Boys II" ];

const [ mov1, mov2, mov3 ] = movies;

console.log(mov1);
console.log(mov2);
console.log(mov3);
