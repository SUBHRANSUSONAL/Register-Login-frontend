import React from 'react';

//function for select field of the form
const Select=(props)=>{

    //to show error message when validation failed
    let formControl="form-control";
    let message='';
    if(props.touched && !props.valid)
    {
        formControl='form-control control-error';
        message=<p className="text-danger small">*please enter {props.name.toUpperCase()} correctly.</p>;
    }

    return(
        <div className="form-group">
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            <select name={props.name} className={formControl}
                    value={props.value}
                    onChange={props.changed}>
                        <option value="" disabled>{props.placeholder}</option>
                        {props.options.map(option=>{
                            return(
                                <option
                                    key={option}
                                    value={option}
                                    label={option}>{option}
                                </option>
                            );
                        })}
            </select>
            <span>{message}</span>
        </div>
    );
}

export default Select;