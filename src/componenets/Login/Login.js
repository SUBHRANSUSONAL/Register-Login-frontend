import React, { Component } from 'react';
import Button from '../../FormElements/Button/Button';
import Input from '../../FormElements/Input/Input';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import checkValidity from '../Validate/checkValidity';

class Login extends Component {

    //state which is used to maintain login page data
    state = {
        login: {
            userName: {
                value: '',
                valid: false,
                validationRules: {
                    required: true,
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    required: true,
                },
                touched: false
            }
        },
        formIsValid: false
    }

    //handle onChange event in the form fields and update event.target.value using setState on the state and check for fields validity
    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        const updatedInfo = {
            ...this.state.login
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
            login: updatedInfo,
            formIsValid: formIsValid
        });
    }

    //handle form submission and axios post request
    handleFormSubmit = (e) => {
        e.preventDefault();
        const login = {};
        for (let regisId in this.state.login) {
            login[regisId] = this.state.login[regisId].value;
        }

        //post request to send login data on server
        axios.post('http://localhost:8080/login', login)
            .then(response => {
                console.log(response);
                console.log(response.data);
                if(response.status===200){
                    alert("login successful");
                    this.props.history.push("/");
                }
                else{
                    alert("login failed. Please check your credentials");
                    this.props.history.push("/login");
                }
            })
            .catch(error=>{
                    alert("login failed. Please check your credentials",error.message);
                    this.props.history.push("/login");
            });
    }

    //JSX code to render on screen
    render() {
        return (
            <div className="container">
                <hr className="mt-5"></hr>
                <h3 className="text-primary text-center">Login</h3>
                <div className="">
                    <div className="card mt-4 shadow mb-5">
                        <div className="card-body">

                            {/* JSX for showing form fields start */}
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
                            {/* JSX for showing form fields end */}
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;