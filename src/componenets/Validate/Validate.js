import React,{Component} from 'react';

class Validate extends Component{

     validate=(value,rules)=>{
        let isValid = true;
        for(let rule in rules){
            switch(rule){
                case 'minlength':isValid=isValid && minLengthValidator(value,rules[rule]);
                break;
                case 'isRequired':isValid=isValid && requiredValidator(value);
                break;
                case 'isEmail':isValid=isValid && emailValidator(value);
                break;
                default:isValid=true;
            }
        }
        return isValid;
    }
     minLengthValidator=(value,minLength)=>{
        return value.length>=minLength;
    }
    
     requiredValidator=value=>{
        return value.trim()!=='';
    }
    
     emailValidator=value=>{
        var re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    }
    render(){

    }
}


export default Validate;