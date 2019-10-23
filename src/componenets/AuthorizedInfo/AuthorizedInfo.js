import React, { Component } from 'react';
import Button from '../../FormElements/Button/Button';
import Input from '../../FormElements/Input/Input';
import Select from '../../FormElements/Select/Select';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import checkValidity from '../Validate/checkValidity';

class AuthorizedInfo extends Component {

    //state which is used to maintain Authorized signer information info page data
    state = {
        authorizedInfo: {
            firstName: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 3,
                    required: true
                },
                touched: false
            },
            lastName: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 3,
                    required: true
                },
                touched: false
            },
            streetAddress: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 3,
                    required: true
                },
                touched: false
            },
            country: {
                value: '',
                valid: false,
                validationRules: {
                    required: true
                },
                touched: false
            },
            state: {
                value: '',
                valid: false,
                validationRules: {
                    required: true
                },
                touched: false
            },
            city: {
                value: '',
                valid: false,
                validationRules: {
                    required: true
                },
                touched: false
            },
            zipCode: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6,
                    maxLength: 6,
                    isNumeric: true,
                    required: true
                },
                touched: false
            },
            dateOfBirth: {
                value: '',
                valid: false,
                validationRules: {
                    required: true
                },
                touched: false
            }
        },
        country: ['India', 'Russia'],
        state: ['Andhra Pradesh', 'Assam', 'Bihar'],
        city: ['kolkata', 'Patna', 'Gaya'],
        formIsValid: false
    }

    //handle onChange event in the form fields and update event.target.value using setState on the state and check for fields validity
    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        const updatedInfo = {
            ...this.state.authorizedInfo
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
            authorizedInfo: updatedInfo,
            formIsValid: formIsValid
        });
    }

    //check if user already registered and redirected to this page. Else redirected to register page
    componentDidMount(){
        const id = this.props.codee.id;
        if(id===undefined){
            this.props.history.push("/");
        }
    }
    
    //function to handle form submission and posting data on server
    handleFormSubmit = (e) => {
        e.preventDefault();
        const id = this.props.codee.id;
        const authorizedInfo = {};
        for (let regisId in this.state.authorizedInfo) {
            authorizedInfo[regisId] = this.state.authorizedInfo[regisId].value;
        }

        //post request for the Authorized signer info data based on registration id on the server
        axios.post('http://localhost:8080/registration/' + id + '/authorized', authorizedInfo)
            .then(response => {
                console.log(response);
                console.log(response.data);
                this.props.history.push("/congratulation");
            })
            .catch(error=>alert(error.message));
    }

    //handle go back button on this form
    previous = () => {
        this.props.history.goBack();
    }

    //JSX code to render on screen
    render() {
        return (
            <div className="container">
                <hr className="mt-5"></hr>
                <h3 className="text-primary text-center">Welcome ABC Ltd</h3>

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
                                <i className="fa fa-circle fa-stack-2x text-primary bg-white"></i>
                                <span className="fa-stack-1x fa-inverse">2</span>
                            </span>
                            <p>VERIFY</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-lg ">
                                <i className="fa fa-circle fa-stack-2x text-primary bg-white"></i>
                                <span className="fa-stack-1x fa-inverse">3</span>
                            </span>
                            <p>BUSINESS DETAILS</p>
                        </div>
                    </div>
                </div>
                {/* JSX for showing progress bar end */}
                
                <div className="card mt-4 shadow mb-5">
                    <div className="card-body">

                        {/* JSX for showing form input and select option fields start */}
                        <form className="container" onSubmit={this.handleFormSubmit}>
                            <div className="container ">
                                <nav className="navbar navbar-expand-sm justify-content-center">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <NavLink to="/business-info" className="nav-link text-secondary">BUSINESS INFORMATION</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <p className="mt-2 ml-3 mr-3 fa fa-arrow-right text-secondary"></p>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/authorized-info" className="nav-link">AUTHORIZED SIGNER INFORMATION</NavLink>
                                        </li>
                                    </ul>
                                </nav>

                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Input
                                        type={'text'}
                                        changed={this.handleChange}
                                        title={'First Name'}
                                        value={this.state.authorizedInfo.firstName.value}
                                        touched={this.state.authorizedInfo.firstName.touched}
                                        valid={this.state.authorizedInfo.firstName.valid}
                                        name={'firstName'} />
                                </div>
                                <div className="col-md-6">
                                    <Input
                                        type={'text'}
                                        changed={this.handleChange}
                                        title={'Last Name'}
                                        value={this.state.authorizedInfo.lastName.value}
                                        touched={this.state.authorizedInfo.lastName.touched}
                                        valid={this.state.authorizedInfo.lastName.valid}
                                        name={'lastName'} />
                                </div>
                                <div className="col-md-6">
                                    <Input
                                        type={'text'}
                                        changed={this.handleChange}
                                        title={'Street Address'}
                                        value={this.state.authorizedInfo.streetAddress.value}
                                        touched={this.state.authorizedInfo.streetAddress.touched}
                                        valid={this.state.authorizedInfo.streetAddress.valid}
                                        name={'streetAddress'} />
                                </div>
                                <div className="col-md-6">
                                    <Select title={'Country'} name={'country'}
                                        options={this.state.country}
                                        changed={this.handleChange}
                                        value={this.state.authorizedInfo.country.value}
                                        touched={this.state.authorizedInfo.country.touched}
                                        valid={this.state.authorizedInfo.country.valid}
                                        placeholder={'Select Country'}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Select title={'State'} name={'state'}
                                        options={this.state.state}
                                        changed={this.handleChange}
                                        value={this.state.authorizedInfo.state.value}
                                        touched={this.state.authorizedInfo.state.touched}
                                        valid={this.state.authorizedInfo.state.valid}
                                        placeholder={'Select State'}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Select title={'City'} name={'city'}
                                        options={this.state.city}
                                        changed={this.handleChange}
                                        value={this.state.authorizedInfo.city.value}
                                        touched={this.state.authorizedInfo.city.touched}
                                        valid={this.state.authorizedInfo.city.valid}
                                        placeholder={'Select City'}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Input
                                        type={'number'}
                                        changed={this.handleChange}
                                        title={'ZIP Code'}
                                        value={this.state.authorizedInfo.zipCode.value}
                                        touched={this.state.authorizedInfo.zipCode.touched}
                                        valid={this.state.authorizedInfo.zipCode.valid}
                                        name={'zipCode'} />
                                </div>

                                <div className="col-md-6">
                                    <Input
                                        type={'date'}
                                        changed={this.handleChange}
                                        title={'Date Of Birth'}
                                        value={this.state.authorizedInfo.dateOfBirth.value}
                                        touched={this.state.authorizedInfo.dateOfBirth.touched}
                                        valid={this.state.authorizedInfo.dateOfBirth.valid}
                                        name={'dateOfBirth'} />
                                </div>
                            </div>
                            <center><span className="text-danger">*</span>These fields are required</center>
                            <div className="offset-3">
                                <div className="ml-3 form-inline mt-4">
                                    <button onClick={this.previous}
                                        style={{ borderRadius: '30px', paddingRight: '', fontWeight: 'bolder' }}
                                        className="btn btn-primary mt-4 mr-4">
                                        <span className="mr-4 fa fa-arrow-left"></span>
                                        GO BACK</button>
                                    <Button type="submit" title={'NEXT'} disab={!this.state.formIsValid}></Button>
                                </div>
                            </div>
                        </form>
                        {/* JSX for showing form input and select option fields end */}
                    
                    </div>
                </div>
            </div>
        );
    }
}
//get value of registration details from redux
const mapStateToProps = state => {
    return {
        codee: state.codes

    };
};
export default connect(mapStateToProps)(AuthorizedInfo);