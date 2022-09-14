// NOTE: Node.js wraps the contents of this file in a function:
// (function (exports, require, module, __filename, __dirname) { ... });
// so that we have access to the working file/directory names as well
// as creating an isolated scope for the module, so that our
// variables are not global. 

var localFunction = function () {
    // a function local to this module
};
  
var localMessage = "";
  
module.exports.writeMessage = function(msg){
    localMessage = msg;
};

module.exports.readMessage = function () {
  console.log(localMessage + " from " +  __filename);
};
