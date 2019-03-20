export function sum(a, b) {
    return a + b;
}

export function divide(a, b) {
    if (b === 0) {
        throw new Error('Unable to divide by 0');
    }

    return a / b;
}

export function isPrime(num) {
    for(var i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num > 1;
}