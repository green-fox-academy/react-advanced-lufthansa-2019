

Array.prototype.sum = function ArraySum() {
    return this.reduce((c, s) => c + Number(s), 0);
};