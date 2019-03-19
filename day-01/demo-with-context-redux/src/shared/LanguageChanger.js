import React from 'react';

function LanguageChanger(props) {
    return (
        <form>
            <select name="language" value={props.language} onChange={handleChange}>
                <option value="en-US">English</option>
                <option value="hu-HU">Magyar</option>
            </select>
        </form>
    );

    function handleChange(event) {
        props.onChange(event.target.value);
    }
}

export default LanguageChanger;