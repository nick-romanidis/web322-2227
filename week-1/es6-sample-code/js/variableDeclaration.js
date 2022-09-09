// Use the keyword let to create a variable 
// the keyword const to  create a constant variable 
// Both const and let does not hoist your variables to the top as like var

let number = 5;     // This creates a regular variable
const minWage = 50; // This creates a constant (i.e, the value cannot be changed after this line)

/*
    Variable Scope 

    1. Global Scope
    2. Function Scope (local variables)
    3. Block Scope(was only introduced in ES6)
*/

function square()
{
    return number * number;
}

console.log(square())


function cube()
{
    return number ** 3;
}

console.log(cube());


function test1()
{
    // Function scope (local variable)
    let value = 25;
}

function test2()
{
    // Can we access value here?
    return value + value;
}

function printMessage()
{
    for (var i = 1; i <= 5; i++)
    {
      console.log("JavaScript is super cool!!!");
    }

    // Can i get accessed here?
    console.log(i);
}

printMessage();

function printMessage2()
{
    for(let i = 1; i <= 5; i++)
    {
      console.log("JavaScript is super cool!!!");
    }

    // Can i get accessed here?
    console.log(i);
}

printMessage2();
