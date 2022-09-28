function doSayHello(name) {
    var str = "Hello " + name;
    return str;
};

function sayHello(name) {
    var lbl = document.getElementById("hello-label");
    lbl.innerText = doSayHello(name);
};