
const doSomething = (name = "no value", age = "no value") =>
{
    console.log(`${name} ${age}`);
}

doSomething("Jon Snow", 40);
doSomething("Jon Snow");    
doSomething();              
doSomething(undefined, 40); 
doSomething("Jon Snow", undefined);
