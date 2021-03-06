import React, { Component } from 'react';
import Button from '../../FormElements/Button/Button';
import Input from '../../FormElements/Input/Input';
import axios from 'axios';
import { connect } from 'react-redux';
import checkValidity from '../Validate/checkValidity';

class Registration extends Component {
    //state which is used to maintain registration form data
    state = {
        registration: {
            firstName: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 4,
                    maxLength: 20,
                    required: true
                },
                touched: false
            },
            lastName: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 4,
                    maxLength: 20,
                    required: true
                },
                touched: false
            },
            userName: {
                value: '',
                valid: false,
                validationRules: {
                    required: true,
                    isEmail: true
                },
                touched: false
            },
            companyName: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 3,
                    maxLength: 20,
                    required: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 5,
                    required: true
                },
                touched: false

            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    required: true,
                    minLength: 5
                },
                touched: false
            },
            code: {
                value: Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
                valid: true,
                touched: true
            }
        },
        formIsValid: false
    }

    //handle onChange event in the form fields and update event.target.value using setState on the state and check for fields validity
    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        const updatedInfo = {
            ...this.state.registration
        };
        const updatedFormElement = {
            ...updatedInfo[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.touched = true;

        //check input fields are valid or not
        updatedFormElement.valid = checkValidity(value, updatedFormElement.validationRules);
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

    //check confirm password and password fields are equal
    checkPassword = () => {
        let password = this.state.registration.password.value;
        let confirmPassword = this.state.registration.confirmPassword.value;
        if (password !== confirmPassword) {
            this.setState({ formIsValid: false });
        }
        else {
            this.setState({ formIsValid: true });
        }
    }

    //handle form submit event for submission of form inputs and sending email to the user email provided in the form
    handleFormSubmit = (e) => {
        e.preventDefault();

        //calling of dispatch function
        this.props.AddUser(this.state.registration);

        const registrationData = {};
        for (let regisId in this.state.registration) {
            registrationData[regisId] = this.state.registration[regisId].value;
        }

        //post request for the registration data on the server
        axios.post('http://localhost:8080/registration', registrationData)
            .then(response => {
                if (response.status === 201) {
                    alert("Registered successfully");

                    //email template defines here
                    const templateId = 'template_2uhNtwiu';
                    this.sendFeedback(templateId,
                        {
                            message_html: this.state.registration.code.value,
                            to_name: this.state.registration.firstName.value,
                            from_name: 'Indus Net Technology',
                            to_mail: this.state.registration.userName.value,

                        }
                    );
                    this.props.history.push("/email-verify");
                }
                else {
                    alert("Failed!!. Please enter unique email address");
                    this.props.history.push("/");
                }
            })
            .catch(error => alert(error.message));
    }

    //mail sending function to send mails on the user email address provided in the input field
    sendFeedback(templateId, variables) {
        window.emailjs.send(
            'gmail', templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    //JSX codes which renders on screen
    render() {
        return (
            <div className="container">
                <hr className="mt-5"></hr>
                <h3 className="text-primary text-center">Get Started with Registration</h3>

                {/* JSX for showing progress bar start */}
                <div className="container text-center mt-4">
                    <hr className="" style={{ border: '1px dotted blue', width: '66%', marginTop: '5%' }}></hr>
                    <div className="row" style={{ marginTop: '-3.5%' }}>
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
                {/* JSX for showing progress bar end */}

                <div className="card mt-4 shadow">
                    <div className="card-body">

                        {/* JSX for showing form input and select option fields start */}
                        <form className="container" onSubmit={this.handleFormSubmit} onClick={this.checkPassword}>
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
                                        name={'confirmPassword'} />
                                </div>
                            </div>
                            <center><span className="text-danger">*</span>These fields are required</center>
                            <Button title={'NEXT'} type="submit" disab={!this.state.formIsValid}></Button>
                        </form>
                        {/* JSX for showing form input and select option fields end */}
                    </div>
                </div>
            </div>
        );
    }
}
// dispatch function of redux to store registration form data in redux
const mapDispatchToProps = dispatch => {
    return {
        AddUser: (regis) => dispatch({ type: 'SAVE_USERNAME', regis: regis })
    };
};

export default connect(null, mapDispatchToProps)(Registration);