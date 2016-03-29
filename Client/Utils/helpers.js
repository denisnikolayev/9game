require('ms-signalr-client');
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandom = getRandom;
function getRandomItem(array) {
    if (array.length == 0)
        throw 'Array length must be more then zero.';
    return array[getRandom(0, array.length - 1)];
}
exports.getRandomItem = getRandomItem;
function range(length, defaultValue) {
    var result = new Array(length);
    for (var i = 0; i < length; i++) {
        result[i] = defaultValue;
    }
    return result;
}
exports.range = range;
function changeToCamelCase(name) {
    return name[0].toLowerCase() + name.substring(1);
}
exports.changeToCamelCase = changeToCamelCase;
function* getServerListMethods(obj) {
    for (var method of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))) {
        if (/^server/.test(method)) {
            yield {
                name: changeToCamelCase(method.substring('server'.length)),
                method: Object.getPrototypeOf(obj)[method].bind(obj)
            };
        }
    }
}
exports.getServerListMethods = getServerListMethods;
function subscribe(obj, proxy) {
    for (var methodInfo of getServerListMethods(obj))
        proxy.on(methodInfo.name, methodInfo.method);
}
exports.subscribe = subscribe;
//# sourceMappingURL=helpers.js.map