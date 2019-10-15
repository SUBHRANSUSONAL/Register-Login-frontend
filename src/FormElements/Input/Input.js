import React from 'react';


const Input=(props)=>{
    let formControl="form-control";
    let message='';
    if(props.touched && !props.valid)
    {
        formControl='form-control control-error';
        message=<p className="text-danger small">*please enter {props.name} correctly.</p>;
    }
    return(
        <div className="form-group">
            <label htmlFor={props.name} className="form-label">{props.title}<span className="text-danger">*</span></label>
            <input className={formControl}
                    id={props.name}
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onChange={props.changed}
                    placeholder={props.placeholder}
            /><span>{message}</span>
        </div>
    );
}

export default Input;
