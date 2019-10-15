import React from 'react';

const Button =(props)=>{
    return(
        <center>
            <button
                className="btn btn-primary mt-4"
                type={props.type}
                style={{borderRadius:'30px',paddingRight:'',fontWeight:'bolder'}}
                onClick={props.action}
                disabled={props.disab}>
                {props.title}
                <span className="ml-5 fa fa-arrow-right"></span>
            </button>
        </center>
    );
}
export default Button;