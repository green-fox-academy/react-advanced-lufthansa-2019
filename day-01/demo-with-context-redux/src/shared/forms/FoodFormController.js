import React from 'react';

import {range, required} from "../validators";
import Validate from "../../utils/Validate";
import FoodService from "../../services/FoodService";

function FoodFormController(Form, action) {
    return class extends React.Component {
        static displayName = `FoodFormController(${Form.name})`;
        static defaultProps = {
            initialValue: {}
        };

        constructor(props, context) {
            super(props, context);

            this.state = {
                formFieldValues: this.getDefaultValues(props),
                formFieldErrors: {
                    foodName: '',
                    calorieAmount: ''
                }
            };
        }

        validators = {
            foodName: [required()],
            calorieAmount: [required(), range(null, 0, 10000)]
        };

        validate = Validate(this.validators);

        getDefaultValues(props) {
            return {
                foodName: props.initialValue.foodName || '',
                calorieAmount: props.initialValue.calorieAmount || ''
            };
        }

        handleFoodFormSubmit = () => {
            if (!this.isFormValid()) {
                return;
            }

            let fieldValues = this.state.formFieldValues;

            let serviceAction = (action === 'Create') ? FoodService.post : FoodService.edit;

            serviceAction(fieldValues)
                .then(response => {
                    if (response == null || response.id == null) {
                        throw new Error("The response was empty or the `id` property was missing.");
                    }

                    this.props.onSubmit({...fieldValues, id: response.id});
                    this.resetForm();
                });
        };

        resetForm() {
            this.setState(state => {
                return {
                    formFieldValues: this.getDefaultValues(this.props)
                };
            });
        }

        isFormValid() {
            let result = this.validate.form(this.state.formFieldValues);

            result.errors.forEach(field => this.setErrorMessage(field, field.result));

            return result.isValid;
        }

        handleFoodFormFieldBlur = (field) => {
            this.validateField(field);
        };

        handleFoodFormFieldChange = (field) => {
            this.setState(state => {
                return {
                    formFieldValues: {
                        ...state.formFieldValues,
                        [field.name]: field.value
                    }
                };
            });

            this.validateField(field);
        };

        validateField(field) {
            let result = this.validate.field(field);

            this.setErrorMessage(field, result);
        }

        setErrorMessage(field, result) {
            this.setState(state => {
                return {
                    formFieldErrors: {
                        ...state.formFieldErrors,
                        [field.name]: result.errors
                    }
                };
            });
        }

        render() {
            let {onSubmit, ...restProps} = this.props;

            return <Form
                values={this.state.formFieldValues}
                errors={this.state.formFieldErrors}
                onSubmit={this.handleFoodFormSubmit}
                onFieldChange={this.handleFoodFormFieldChange}
                onFieldBlur={this.handleFoodFormFieldBlur}
                {...restProps}
            />;
        }
    }
}

export default FoodFormController;
