import 'ms-signalr-client';
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandom(min:number, max:number) :number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomItem<T>(array: T[]): T {
    if (array.length == 0) throw 'Array length must be more then zero.';
    return array[getRandom(0, array.length - 1)];
}


export function range<T>(length: number, defaultValue:T): T[] {
    var result = new Array<T>(length);
    for (var i = 0; i < length; i++) {
        result[i] = defaultValue;
    }
    return result;
}

export function changeToCamelCase(name: string) {    
    return name[0].toLowerCase() + name.substring(1);    
}

export function *getServerListMethods(obj:any): Iterable<{ name: string, method: any }> {
    for (var method of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))) {
        if (/^server/.test(method)) {           
            yield {
                name: changeToCamelCase(method.substring('server'.length)),
                method: Object.getPrototypeOf(obj)[method].bind(obj)
            };
        }
    }
}

export function subscribe<T>(obj: T, proxy:SignalR.Hub.Proxy) {
    for (var methodInfo of getServerListMethods(obj)) proxy.on(methodInfo.name, methodInfo.method);   
}