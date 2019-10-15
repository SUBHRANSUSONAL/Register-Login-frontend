import React,{Component} from 'react';
import Button from '../../FormElements/Button/Button';
import Input from '../../FormElements/Input/Input';
import axios from 'axios';

class Registration extends Component{
    state={
        registration:{
            firstName:{
                value:'',
                valid: false,
                validationRules: {
                minLength: 4,
                maxLength:20,
                required: true
                },
                touched: false
            },
            lastName:{
                value:'',
                valid: false,
                validationRules: {
                minLength: 4,
                maxLength:20,
                required: true
                },
                touched: false
            },
            userName:{
                value:'',
                valid: false,
                validationRules: {
                required: true,
                isEmail: true
                },
                touched: false
            },
            companyName:{
                value:'',
                valid: false,
                validationRules: {
                minLength: 3,
                maxLength:20,
                required: true
                },
                touched: false
            },
            password:{
                value:'',
                valid: false,
                validationRules: {
                minLength:5,
                required: true
                },
                touched: false
                
            },
            confirmPassword:{
                value:'',
                valid:false,
                validationRules:{
                    required:true,
                    minLength:5
                },
                touched:false
            },
            code:{
                value:Math.floor(Math.random()*(999999-100000+1)+100000),
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

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
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
            ...this.state.registration
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
          registration: updatedInfo,
          formIsValid: formIsValid
      });
    
    }


    handleFormSubmit=(e)=>{
        e.preventDefault();

        const templateId ='template_2uhNtwiu';

        this.sendFeedback(templateId, 
            {message_html: this.state.registration.code.value, from_name: 'subhransu', reply_to: this.state.userName})

        const registrationData={};
        for(let regisId in this.state.registration)
        {
            registrationData[regisId]=this.state.registration[regisId].value;
        }
        
       // axios.post('http://localhost:8080/registration',registrationData)

        axios.post('http://localhost:8080/registration',registrationData)
        .then(response=>{
            console.log(response);
            console.log(response.data)
            this.props.history.push("/email-verify");
        });
    }

    sendFeedback (templateId, variables) {
        window.emailjs.send(
          'gmail', templateId,
          variables
          ).then(res => {
            console.log('Email successfully sent!')
          })
          // Handle errors here however you like, or use a React error boundary
          .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      }

    render(){
        return(
            <div className="container">
                <hr className="mt-5"></hr>
                <h3 className="text-primary text-center">Get Started with Registration</h3>
                <div className="container text-center mt-4">
                    <hr className="" style={{border:'1px dotted blue',width:'66%',marginTop:'5%'}}></hr>
                    <div className="row" style={{marginTop:'-3.5%'}}>
                        <div className="col-md-4">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x text-primary bg-white"></i>
                            <span className="fa-stack-1x fa-inverse">1</span>
                        </span>
                            <p>YOUR DETAILS</p>
                        </div>
                        <div className="col-md-4">
                        <span className="fa-stack fa-lg">
                            <i className="far fa-circle fa-stack-2x text-primary bg-white"></i>
                            <span className="fa-stack-1x fa-inverse text-primary">2</span>
                        </span>
                            <p>VERIFY</p>
                        </div>
                        <div className="col-md-4">
                        <span className="fa-stack fa-lg ">
                            <i className="far fa-circle fa-stack-2x text-primary bg-white"></i>
                            <span className="fa-stack-1x fa-inverse text-primary">3</span>
                        </span>
                            <p>BUSINESS DETAILS</p>
                        </div>
                    </div>
                </div>
                <div className="card mt-4 shadow">
                    <div className="card-body">
                        <form className="container" onSubmit={this.handleFormSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Input 
                                    type={'text'}
                                    title={'First Name'} 
                                    value={this.state.registration.firstName.value} 
                                    touched={this.state.registration.firstName.touched}
                                    valid={this.state.registration.firstName.valid} 
                                    changed={this.handleChange}
                                    name={'firstName'} />
                                </div>
                                <div className="col-md-6">
                                    <Input 
                                    type={'text'} 
                                    title={'Last Name'} 
                                    value={this.state.registration.lastName.value} 
                                    changed={this.handleChange} 
                                    touched={this.state.registration.lastName.touched}
                                    valid={this.state.registration.lastName.valid} 
                                    name={'lastName'} />
                                </div>
                                <div className="col-md-6">
                                    <Input 
                                    type={'text'} 
                                    title={'Company Email(Username)'} 
                                    value={this.state.registration.userName.value} 
                                    changed={this.handleChange} 
                                    touched={this.state.registration.userName.touched}
                                    valid={this.state.registration.userName.valid} 
                                    name={'userName'} />
                                </div>
                                <div className="col-md-6">
                                    <Input 
                                    type={'text'} 
                                    title={'Company Name'} 
                                    value={this.state.registration.companyName.value}
                                    touched={this.state.registration.companyName.touched}
                                    valid={this.state.registration.companyName.valid} 
                                    changed={this.handleChange} 
                                    name={'companyName'} />
                                </div>
                                <div className="col-md-6">
                                    <Input 
                                    type={'password'} 
                                    title={'Password'} 
                                    value={this.state.registration.password.value}
                                    touched={this.state.registration.password.touched}
                                    valid={this.state.registration.password.valid} 
                                    changed={this.handleChange} 
                                    name={'password'} />
                                </div>
                                <div className="col-md-6">
                                    <Input 
                                    type={'password'} 
                                    title={'Confirm Password'} 
                                    value={this.state.registration.confirmPassword.value}
                                    touched={this.state.registration.confirmPassword.touched}
                                    valid={this.state.registration.confirmPassword.valid}
                                    changed={this.handleChange} 
                                    name={'confirmPassword'}/>
                                </div>
                            </div>
                            <center><span className="text-danger">*</span>These fields are required</center>
                            <Button title={'NEXT'} type="submit" disab={!this.state.formIsValid}></Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;