
function displayMessage(name, age)
{
    // Doing it the ES5 way
    return 'Hello ' + name + ". You don't look like a day over " + (age - 5);
}

console.log(displayMessage("Jon snow", 30));



function displayMessageTemplateLiteral(name, age)
{
    // Using a template literal
    return `Hello ${name}. You don't look like a day over ${age - 5}`; 
}

console.log(displayMessageTemplateLiteral("Thanos", 50));