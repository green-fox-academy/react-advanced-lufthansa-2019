export default function (errorMessage, min, max) {
    return value => {
        let error = '';
        let message = errorMessage || `Field value must be between ${min} and ${max}`;

        if (value == null) {
            return { isValid: true };
        }

        let numericValue = Number(value);

        if (isNaN(numericValue)) {
            throw new Error('The provided value is not a valid number');
        }

        if (numericValue < min || numericValue > max) {
            error = message;
        }

        return {
            isValid: error === '',
            error
        };
    }
}
