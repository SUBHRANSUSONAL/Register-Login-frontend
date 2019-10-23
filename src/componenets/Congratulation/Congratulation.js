import React, { Component } from 'react';
import Button from '../../FormElements/Button/Button';
import { connect } from 'react-redux';

class Congratulation extends Component {

    //handle button onClick event to send mail and redirect to login page
    handleSubmit = (e) => {
        e.preventDefault();

        //template of email
        const templateId = 'template_2uhNtwiu';
        this.sendFeedback(templateId,
            {
                message_html: 'You have successfully submitted the Business Information and Authorized Signer Information',
                to_mail: this.props.user.userName.value,
                to_name: this.props.user.firstName.value,
                from_name: 'Indus Net Technology',
                reply_to: 'sonalSubhransu@gmail.com'
            })
        this.props.history.push("/login");
    }

    //email function that trigger on submit handler to send mail
    sendFeedback(templateId, variables) {
        window.emailjs.send(
            'gmail', templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    //JSX code to render on screen
    render() {
        return (
            <div className="container">
                <hr className="mt-5"></hr>
                <h1 className="text-primary text-center">Congratulations!</h1>
                <div className="card mb-5 shadow">
                    <div className="card-body text-center">
                        <span className="fa-stack fa-3x">
                            <i className="fa fa-circle fa-stack-2x text-success bg-white w-100"></i>
                            <span className="fa-stack-1x fa-inverse fa fa-check"></span>
                        </span>
                        <Button action={this.handleSubmit} title={'PROCEED'}></Button>
                    </div>
                </div>
            </div>
        );
    }
}

//redux values of registration fields
const mapStateToProps = state => {
    return {
        user: state.registration
    };
};

export default connect(mapStateToProps)(Congratulation);