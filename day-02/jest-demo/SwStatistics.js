import SwAPI from './SwAPI';

export default class SwStatistics {
    constructor() {
        this.swAPI = new SwAPI();
    }

    async count() {
        let people = await this.swAPI.getPeople();

        return people.results.length;
    }

    async averageHeight() {
        let people = await this.swAPI.getPeople();

        let heights = people.results
            .map(c => c.height)
            .filter(h => h != null)
            .map(h => Number(h))
            .filter(h => !isNaN(h));

        return heights.reduce((sum, current) => current + sum, 0) / heights.length;
    }
}