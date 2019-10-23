import React, { Component } from 'react';
import Input from '../../FormElements/Input/Input';
import axios from 'axios';
import { connect } from 'react-redux';

class EmailVerify extends Component {
    //state which is used to maintain email verify page data
    constructor(props) {
        super(props);
        this.state = {
            varifyCode: {
                code: {
                    value: ''
                },
                firstName: {
                    value: ''
                }
            },
            codes: ''
        };
    }

    //handle onChange event in the form fields and update event.target.value using setState on the state
    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState(prevState => {
            return {
                verifyCode: {
                    ...prevState.verifyCode, [name]: value
                }
            }
        })
    }

    //get the user code value from database by user email field which is stored in redux
    componentDidMount() {
        const email = this.props.user.userName.value;

        //check if user already registered and redirected to this page. Else redirected to register page
        if(email===undefined){
            this.props.history.push("/");
        }
        
        //get request for user's code and update using setState on the state of this component
        axios.get('http://localhost:8080/registrationByEmail/' + email)
            .then(response => {
                const codes = response.data;
                this.setState({ codes });
                console.log(response.data);
                console.log(codes);
            })
            .catch(error => alert(error.message));
    }

    //handle function for resend email option
    handleResendMail = (e) => {
        e.preventDefault();
        //email template defines here
        const templateId = 'template_2uhNtwiu';
        this.sendFeedback(templateId,
            {
                message_html: this.state.codes.code,
                to_mail: this.props.user.userName.value,
                to_name: this.props.user.firstName.value,
                from_name: 'Indus Net Technology',
                reply_to: 'sonalsubhransu@gmail.com'
            })
    }

    //mail sending function to send mails on the user email address provided in the input field
    sendFeedback(templateId, variables) {
        window.emailjs.send(
            'gmail', templateId,
            variables
        ).then(res => {
            alert("Email successfully sent!");
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    //function for matching code to verify user's account
    handleFormSubmit = (e) => {
        e.preventDefault();
        let data = this.state.codes.code.toString();
        let id = this.state.codes.id.toString();
        let valueOfCode = this.state.verifyCode.code;
        const dataa = this.state.codes;
        console.log(dataa);
        if (data === valueOfCode) {

            //put request to update the value of Active in the registration table to verify user's account is activated successfully
            axios.put('http://localhost:8080/registration/' + id, dataa)
                .then(res => console.log(res))
                .catch(error => alert(error.message));
            alert("your account is verified successfuly");
            return this.props.history.push("/business-info");
        }
        else {
            alert("Wrong verification code");
            return this.props.history.push("/email-verify");
        }
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
                                <i className="fa fa-circle fa-stack-2x text-primary bg-white"></i>
                                <span className="fa-stack-1x fa-inverse">2</span>
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

                <p className="text-center">For your security, we want to make sure it's really you. We have sent an email with a 6-digit verification code to the email address you have provided. Please enter the code you received below.</p>
                <div className="card mt-4 shadow mb-5">
                    <div className="card-body">

                        {/* JSX for showing form input fields start */}
                        <form className="container" onSubmit={this.handleFormSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Input
                                        type={'text'}
                                        title={'Verification Code sent in Email'}
                                        value={this.state.code}
                                        changed={this.handleChange}
                                        name={'code'} />
                                </div>
                                <div className="col-md-6">
                                    <div className="form-inline mt-4">
                                        <button type="submit"
                                            style={{ borderRadius: '30px', paddingRight: '', fontWeight: 'bolder' }}
                                            className="btn btn-primary">Verify Email</button>
                                        <button onClick={this.handleResendMail}
                                            style={{ borderRadius: '30px', paddingRight: '', fontWeight: 'bolder' }}
                                            className="btn btn-primary ml-4">Resend Verification Code</button>
                                    </div>
                                </div>
                            </div>
                            <center><span className="text-danger">*</span>These fields are required</center>
                        </form>
                        {/* JSX for showing form input fields end */}
                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.registration
    };
};

export default connect(mapStateToProps)(EmailVerify);
