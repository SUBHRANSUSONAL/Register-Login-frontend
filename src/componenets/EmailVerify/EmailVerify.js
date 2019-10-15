import React,{Component} from 'react';
import Input from '../../FormElements/Input/Input';
import axios from 'axios';

class EmailVerify extends Component{
    state={
        varifyCode:{
            code:{
                value:''
            },
            firstName:{
                value:''
            },
            active:{
                value:1
            }
        },
        codes:''
    }

   
        
    handleChange=(event)=>{
        let value=event.target.value;
        let name=event.target.name;
        this.setState(prevState=>{
            return{
                verifyCode:{
                    ...prevState.verifyCode,[name]:value
                }
            }
        })
  
   }

   componentDidMount(){

    axios.get('http://localhost:8080/registration/1')
    .then(response=>{
        const codes=response.data;
        this.setState({codes});
    })
    
}

handleResendMail=(e)=>{
    e.preventDefault();

        const templateId ='template_2uhNtwiu';

        this.sendFeedback(templateId, 
            {message_html: this.state.codes.code, from_name: 'subhransu', reply_to: 'sonalsubhransu@gmail.com'})
}

sendFeedback (templateId, variables) {
    window.emailjs.send(
      'gmail', templateId,
      variables
      ).then(res => {
          alert("Email successfully sent!");
        console.log('Email successfully sent!')
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }

//this.state.codes.map(codee=>{return codee.name});

   handleFormSubmit=(e)=>{
       e.preventDefault();
    //   let data=this.state.codes.code;
     //  let valueOfCode=this.state.verifyCode.code;
        
       let data=this.state.codes.code.toString();
       let valueOfCode=this.state.verifyCode.code.toString();
        const dataa={
            active:1,
            firstName:this.state.codes.firstName,
                lastName:this.state.codes.lastName,
                userName:this.state.codes.userName,
                companyName:this.state.codes.companyName,
                password:this.state.codes.password,
                code:this.state.codes.code,
                id:this.state.codes.id
        }
        console.log(dataa);
       if(data===valueOfCode){
        axios.put('http://localhost:8080/registration/1',{
                dataa
                
        },{
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>
            console.log(res.data)).catch(error=>{console.log(error.res)});
   
            alert("your account is verified successfuly");
            return this.props.history.push("/business-info");
        }
       else{
           console.log(data);
            console.log(valueOfCode);
           alert("Wrong verification code");
           return this.props.history.push("/email-verify");
           
       }
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
            <p className="text-center">For your security, we want to make sure it's really you. We have sent an email with a 6-digit verification code to the email address you have provided. Please enter the code you received below.</p>

            <div className="card mt-4 shadow mb-5">

                <ul>
                    {this.state.codes.code}
                </ul>

                <div className="card-body">
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
                                    style={{borderRadius:'30px',paddingRight:'',fontWeight:'bolder'}}
                                    className="btn btn-primary">Verify Email</button>
                                    <button onClick={this.handleResendMail}
                                    style={{borderRadius:'30px',paddingRight:'',fontWeight:'bolder'}}
                                    className="btn btn-primary ml-4">Resend Verification Code</button>
                                </div>
                            </div>
                        </div>
                        <center><span className="text-danger">*</span>These fields are required</center>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

export default EmailVerify;