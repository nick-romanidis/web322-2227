let doSayHello = function(name) {
    var str = "Hello " + name;
    return str;
}

module.exports.sayHello = function(name) {
    var str = doSayHello(name);
    return str;
}
