export default function (errorMessage) {
    return value => {
        let error = '';
        let message = errorMessage || 'Field is required';

        if (value == null || value.length === 0) {
            error = message;
        }

        return {
            isValid: error === '',
            error
        };
    }
}