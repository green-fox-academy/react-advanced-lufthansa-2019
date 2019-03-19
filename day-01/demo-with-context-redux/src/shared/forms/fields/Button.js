import React from 'react';

function Button(props) {
    return (
        <div>
            <button type={props.type} className="btn btn-primary">{props.children}</button>
        </div>
    );
}

export default Button;