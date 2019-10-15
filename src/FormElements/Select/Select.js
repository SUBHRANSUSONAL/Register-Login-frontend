import React from 'react';

const Select=(props)=>{
    let formControl="form-control";
    if(props.touched && !props.valid)
    {
        formControl='form-control control-error';
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
        </div>
    );
}

export default Select;