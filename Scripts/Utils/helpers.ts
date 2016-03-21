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