// A function for Funk Function Application (required to support methods on primitive types in JavaScript)
function _A(f, x) {
    if(typeof f == 'function') {
        return f(x);
    } else if(typeof f == 'string') {
        switch(x) {
            case 'Size': return f.length;
            case 'CharAt': return function(i) { return f.charAt(i); };
            case 'CharCodeAt': return function(i) { return f.charCodeAt(i); };
            case 'Slice': return function(b) { return function(e) { return f.substring(b, e); }; };
            case 'ToUpper': return f.toUpperCase();
            case 'ToLower': return f.toLowerCase();
            case 'Trim': return f.trim();
            case 'IndexOf': return function(v) { return f.indexOf(v); };
            case '==': return function(v) { return f == v; };
            case '!=': return function(v) { return f != v; };
            case '+': return function(v) { return f + v; };
            default: throw "Unexpected argument: " + x;
        }
    } else if(typeof f == 'number') {
        switch(x) {
            case '==': return function(v) { return f == v; };
            case '!=': return function(v) { return f != v; };
            case '-_': return -f; // Unary operator -
            case '+_': return +f; // Unary operator +
            case '+': return function(v) { return f + v; };
            case '-': return function(v) { return f - v; };
            case '*': return function(v) { return f * v; };
            case '/': return function(v) { return f / v; };
            default: throw "Unexpected argument: " + x;
        }
    } else {
        throw "Unexpected argument: " + x;
    }
}

// Global variables can be exposed to funk simply by giving them a "_" suffix:
var system_ = function(x) {
    switch(x) {
        case 'Log': return function(v) { console.log(v) };
        case 'Dir': return function(v) { console.dir(v) };
        case 'SetText': return function(v) { document.getElementById("result").textContent = v; };
        case 'SetHtml': return function(v) { document.getElementById("result").innerHTML = v; };
    }
}