import React from 'react';

export default function InputField(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.labelText}</label>
            <input type={props.type}
                   value={props.value}
                   id={props.id}
                   name={props.id}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   className="form-control"
            />
            <span className="text-danger">{props.error}</span>
        </div>
    );

    function handleChange(event) {
        props.onChange({
            name: event.target.name,
            value: event.target.value
        });
    }

    function handleBlur(event) {
        props.onBlur({
            name: event.target.name,
            value: event.target.value
        });
    }
}

InputField.defaultProps = {
    type: 'text'
};