export default function (errorMessage, min, max) {
    return value => {
        let error = '';
        let message = errorMessage || `Field length must be between ${min} and ${max}`;

        if (value == null) {
            return { isValid: true };
        }

        if (value.length < min || value.length > max) {
            error = message;
        }

        return {
            isValid: error === '',
            error
        };
    }
}
