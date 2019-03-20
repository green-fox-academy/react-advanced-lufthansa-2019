import { sum, divide } from './math';

test('sum should add numbers correctly', () => {
   // Arrange

   // Act
    let result = sum(1, 2);

   // Assert
    expect(result).toBe(3);
});

test('divide should throw if divider is zero', () => {
    // Arrange

    // Act
    // Assert
    expect(() => {
        let result = divide(1, 0);
    }).toThrow('Unable to divide by 0');
});