import SwStatistics from './SwStatistics';
import SwAPI from './SwAPI';
jest.mock('./SwAPI');

test('count should return with valid value', async () => {
   // Arrange

    SwAPI.mockImplementation(() => {
        return {
            getPeople: jest.fn().mockResolvedValue({
                results: [{}, {}, {}]
            })
        };
    });

    let swStatistics = new SwStatistics();

   // Act
    let result = await swStatistics.count();

   // Assert
    expect(result).toBe(3);
});

test('count should return with valid value', async () => {
    // Arrange
    let swStatistics = new SwStatistics({
        getPeople: jest.fn().mockResolvedValue({
            results: [{}, {}, {}]
        })
    });



    // Act
    let result = await swStatistics.count();

    // Assert
    expect(result).toBe(3);
});