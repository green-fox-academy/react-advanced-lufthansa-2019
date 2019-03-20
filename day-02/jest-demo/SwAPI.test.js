import SwAPI from './SwAPI';

beforeEach(() => {
    // this runs before tests
});

test('sw API should return valid person with done', (done) => {
    // Arrange
    let swAPI = new SwAPI();

    // Act
    swAPI.getPerson(1)
        .then(result => {
            console.log(result);

            // Assert
            expect(result.name).toBe('Luke Skywalke');
            done();
        });

});

test('sw API should return valid person with promise', () => {
    // Arrange
    let swAPI = new SwAPI();

    // Act
    return swAPI.getPerson(1)
        .then(result => {
            console.log(result);

            // Assert
            expect(result.name).toBe('Luke Skywalke');
        });

});


test('sw API should return valid person with async/await', async () => {
    // Arrange
    let swAPI = new SwAPI();

    // Act
    let result = await swAPI.getPerson(1);

    // Assert
    expect(result.name).toBe('Luke Skywalke');
});


test('mocked sw API should return valid person with async/await', async () => {
    // Arrange
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
            name: 'petike'
        })
    });

    let swAPI = new SwAPI();

    // Act
    let result = await swAPI.getPerson(1);

    // Assert
    expect(result.name).toBe('petike');
});