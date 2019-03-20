export default function Validate(validators) {
    return {
        field: validateField,
        form: validateForm
    };

    function validateField(field) {
        let errors = validators[field.name]
            .map(validate => validate(field.value))
            .map(result => result.error);

        return {
            errors,
            isValid: errors.every(m => m === '')
        }
    }

    function validateForm(values) {
        let errors = Object.keys(values)
            .map(name => {
                return {name, value: values[name]}
            })
            .map(field => {
                return {
                    ...field,
                    result: validateField(field)
                }
            });

        return {
            errors,
            isValid: Object.values(errors).every(field => field.result.isValid)
        }
    }
}
