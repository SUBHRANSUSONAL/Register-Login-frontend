import React,{Component} from 'react';
import Button from '../../FormElements/Button/Button';
import Input from '../../FormElements/Input/Input';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class Login extends Component{

    state={
        login:{
                userName:{
                    value:'',
                    valid: false,
                    validationRules: {
                    required: true,
                    isEmail: true
                    },
                    touched: false
                },
                password:{
                    value:'',
                    valid: false,
                    validationRules: {
                    required: true,
                    },
                    touched: false
                }
            },
        details:{
                userEmail:{
                    value:'',
                    valid:true,
                    touched:true
                },
                pass:{
                    value:'',
                    valid:true,
                    touched:true
                }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    handleChange=(event)=>{
        let value=event.target.value;
        let name=event.target.name;

        const updatedInfo = {
           ...this.state.login
         };
         const updatedFormElement = {
           ...updatedInfo[name]
         };

         updatedFormElement.value = value;
         updatedFormElement.touched = true;
         updatedFormElement.valid = this.checkValidity(value, updatedFormElement.validationRules);

         updatedInfo[name] = updatedFormElement;

         let formIsValid = true;
         for (let inputIdentifier in updatedInfo) {
         formIsValid = updatedInfo[inputIdentifier].valid && formIsValid;
           }

         this.setState({
         login: updatedInfo,
         formIsValid: formIsValid
     });
   }

   componentDidMount(){

    axios.get('http://localhost:8080/login/1')
    .then(response=>{
        let ue=response.data.userName;
        console.log(ue);
        let pa=response.data.password;
        console.log(pa);
        this.setState({userEmail:ue});
        this.setState({pass:pa});
    });
    
}
//this.state.codes.map(codee=>{return codee.name});
   handleFormSubmit=(e)=>{
    e.preventDefault();
       let username=this.state.userEmail;
       let passwordd=this.state.pass;
       let field1=this.state.login.userName.value;
       let field2=this.state.login.password.value;
       if(field1===username && field2===passwordd){
            alert("login successful");
            this.props.history.push("/");
       }
       else{
        alert("login failed. Please check your credentials");
        this.props.history.push("/login");
       }
    e.preventDefault();
}


    render(){
        return(
            <div className="container">
            <hr className="mt-5"></hr>
            <h3 className="text-primary text-center">Login</h3>
            <div className="offset-2">
            <div className="card mt-4 shadow w-75 mb-5 ml-4">
                <div className="card-body">
                    <form className="container" onSubmit={this.handleFormSubmit}>
                        <div className="">
                            <div className="">
                                <Input 
                                type={'text'} 
                                changed={this.handleChange} 
                                title={'Email Address'} 
                                value={this.state.login.userName.value} 
                                touched={this.state.login.userName.touched}
                                valid={this.state.login.userName.valid}
                                name={'userName'} />
                            </div>
                            <div className="">
                                <Input 
                                type={'password'} 
                                changed={this.handleChange} 
                                value={this.state.login.password.value} 
                                touched={this.state.login.password.touched}
                                valid={this.state.login.password.valid}
                                title={'Password'} 
                                name={'password'} />
                            </div>
                            
                        </div>
                        <a href="" className="">Reset my password</a><br></br>
                        <p>New Member?<NavLink to="/" className="">Register Now</NavLink></p>
                        <Button title={'LOGIN'} disab={!this.state.formIsValid}></Button>
                    </form>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default Login;