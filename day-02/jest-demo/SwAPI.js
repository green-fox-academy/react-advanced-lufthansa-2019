export default class SwAPI {

    getPerson(id) {
        if (!id) {
            throw new Error('id must be a positive number');
        }

        return fetch(`https://swapi.co/api/people/${id}`)
            .then(response => response.json());
    }

    getPeople() {
        return fetch(`https://swapi.co/api/people`)
            .then(response => response.json());
    }
}