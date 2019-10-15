import React,{Component} from 'react';
import Button from '../../FormElements/Button/Button';
import Input from '../../FormElements/Input/Input';
import Select from '../../FormElements/Select/Select';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class BusinessInfo extends Component{
    state={
        businessInfo:{
            companyName:{
                value:'',
                valid: false,
                validationRules: {
                minLength: 3,
                required: true
                },
                touched: false
            },
            tax:{
                value:'',
                valid: false,
                validationRules: {
                minLength: 8,
                required: true
                },
                touched: false
            },
            streetAddress:{
                value:'',
                valid: false,
                validationRules: {
                minLength: 2,
                required: true
                },
                touched: false
            },
            zipCode:{
                value:'',
                valid: false,
                validationRules: {
                minLength: 6,
                maxLength:6,
                required: true,
                isNumeric:true
                },
                touched: false
            },
            companyPhone:{
                value:'',
                valid: false,
                validationRules: {
                minLength: 10,
                maxLength:10,
                required: true,
                isNumeric:true
                },
                touched: false
            },
            website:{
                value:'',
                valid: false,
                validationRules: {
                minLength: 4,
                required: true
                },
                touched: false
            },
            dateOfIncorporation:{
                value:'',
                valid: false,
                validationRules: {
                
                required: true
                },
                touched: false
            },
            country:{
                value:'',
                valid: false,
                validationRules: {
                
                required: true
                },
                touched: false
            },
            statee:{
                value:'',
                valid: false,
                validationRules: {
                
                required: true
                },
                touched: false
            },
            city:{
                value:'',
                valid: false,
                validationRules: {
                
                required: true
                },
                touched: false
            },
            stateOfInc:{
                value:'',
                valid: false,
                validationRules: {
                
                required: true
                },
                touched: false
            },
            cityOfInc:{
                value:'',
                valid: false,
                validationRules: {
                
                required: true
                },
                touched: false
            }
        },
            countryOption:['India','Russia'],
            stateOption:['Andhra Pradesh','Assam','Bihar'],
            cityOption:['kolkata','Patna','Gaya'],
            stateOfIncOption:['Andhra Pradesh','Assam','Bihar'],
            cityOfIncOption:['kolkata','Patna','Gaya'],
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

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    handleChange=(event)=>{
        let value=event.target.value;
        let name=event.target.name;

        const updatedInfo = {
           ...this.state.businessInfo
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
         businessInfo: updatedInfo,
         formIsValid: formIsValid
     });
   }

   handleFormSubmit=(e)=>{
    e.preventDefault();
    const businessInfo={};
    for(let regisId in this.state.businessInfo)
    {
        businessInfo[regisId]=this.state.businessInfo[regisId].value;
    }
    
    axios.post('http://localhost:8080/registration/1/business',businessInfo)
    .then(response=>{
        console.log(response);
        console.log(response.data);
        this.props.history.push("/authorized-info");
    });

}


    render(){
        return(
            <div className="container">
            <hr className="mt-5"></hr>
            <h3 className="text-primary text-center">Welcome ABC Ltd</h3>
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
                        <i className="fa fa-circle fa-stack-2x text-primary bg-white"></i>
                        <span className="fa-stack-1x fa-inverse">3</span>
                      </span>
                        <p>BUSINESS DETAILS</p>
                    </div>
                </div>
            </div>
            <div className="card mt-4 shadow mb-5">
                <div className="card-body">
                    <form className="container" onSubmit={this.handleFormSubmit}>
                        <div className="container ">
                            <nav className="navbar navbar-expand-sm justify-content-center">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink to="/business-info" className="nav-link">BUSINESS INFORMATION</NavLink>  
                                    </li>
                                    <li className="nav-item">
                                        <p className="mt-2 ml-3 mr-3 fa fa-arrow-right text-secondary"></p>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/authorized-info" className="nav-link text-secondary">AUTHORIZED SIGNER INFORMATION</NavLink>  
                                    </li>
                                </ul>
                            </nav>
                            
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Input 
                                    type={'text'} 
                                    changed={this.handleChange} 
                                    title={'Company Name'} 
                                    value={this.state.businessInfo.companyName.value} 
                                    touched={this.state.businessInfo.companyName.touched}
                                    valid={this.state.businessInfo.companyName.valid} 
                                    name={'companyName'} />
                            </div>
                            <div className="col-md-6">
                                <Input 
                                type={'text'} 
                                changed={this.handleChange} 
                                title={'Business Tax ID/SSN'} 
                                value={this.state.businessInfo.tax.value} 
                                touched={this.state.businessInfo.tax.touched}
                                valid={this.state.businessInfo.tax.valid}
                                name={'tax'} />
                            </div>
                            <div className="col-md-6">
                                <Input 
                                type={'text'} 
                                changed={this.handleChange} 
                                title={'Street Address'} 
                                value={this.state.businessInfo.streetAddress.value} 
                                touched={this.state.businessInfo.streetAddress.touched}
                                valid={this.state.businessInfo.streetAddress.valid}
                                name={'streetAddress'} />
                            </div>
                            <div className="col-md-6">
                                <Select title={'Country'} name={'country'}
                                placeholder={'Select Country'}
                                options={this.state.countryOption}
                                value={this.state.businessInfo.country.value} 
                                touched={this.state.businessInfo.country.touched}
                                valid={this.state.businessInfo.country.valid}
                                changed={this.handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                    <Select title={'State'} name={'statee'}
                                    options={this.state.stateOption}
                                    value={this.state.businessInfo.statee.value} 
                                    touched={this.state.businessInfo.statee.touched}
                                    valid={this.state.businessInfo.statee.valid}
                                    changed={this.handleChange}
                                    placeholder={'Select State'}
                                    />
                                    </div>
                                    <div className="col-md-6">
                                    <Select title={'City'} name={'city'}
                                    options={this.state.cityOption}
                                    value={this.state.businessInfo.city.value} 
                                    touched={this.state.businessInfo.city.touched}
                                    valid={this.state.businessInfo.city.valid}
                                    changed={this.handleChange}
                                    placeholder={'Select City'}
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <Input 
                                type={'number'} 
                                changed={this.handleChange} 
                                title={'ZIP Code'} 
                                value={this.state.businessInfo.zipCode.value} 
                                touched={this.state.businessInfo.zipCode.touched}
                                valid={this.state.businessInfo.zipCode.valid}
                                name={'zipCode'}/>
                            </div>
                            <div className="col-md-6">
                                <Input 
                                type={'number'} 
                                changed={this.handleChange} 
                                title={'Company Phone'} 
                                value={this.state.businessInfo.companyPhone.value} 
                                touched={this.state.businessInfo.companyPhone.touched}
                                valid={this.state.businessInfo.companyPhone.valid}
                                name={'companyPhone'} />
                            </div>
                            <div className="col-md-6">
                                <Input 
                                type={'text'} 
                                changed={this.handleChange} 
                                title={'Website'} 
                                value={this.state.businessInfo.website.value} 
                                touched={this.state.businessInfo.website.touched}
                                valid={this.state.businessInfo.website.valid}
                                name={'website'} />
                            </div>
                            <div className="col-md-6">
                                <Input 
                                type={'date'} 
                                changed={this.handleChange} 
                                title={'Date of Incorporation'} 
                                value={this.state.businessInfo.dateOfIncorporation.value} 
                                touched={this.state.businessInfo.dateOfIncorporation.touched}
                                valid={this.state.businessInfo.dateOfIncorporation.valid}
                                name={'dateOfIncorporation'} />
                            </div>
                            <div className="col-md-6">
                            <div className="row">
                                    <div className="col-md-6">
                                    <Select title={'State of Incorporation'} name={'stateOfInc'}
                                    options={this.state.stateOfIncOption}
                                    value={this.state.businessInfo.stateOfInc.value} 
                                    touched={this.state.businessInfo.stateOfInc.touched}
                                    valid={this.state.businessInfo.stateOfInc.valid}
                                    changed={this.handleChange}
                                    placeholder={'Select State'}
                                    />
                                    </div>
                                    <div className="col-md-6">
                                    <Select title={'City of Incorporation'} name={'cityOfInc'}
                                    options={this.state.cityOfIncOption}
                                    value={this.state.businessInfo.cityOfInc.value} 
                                    touched={this.state.businessInfo.cityOfInc.touched}
                                    valid={this.state.businessInfo.cityOfInc.valid}
                                    changed={this.handleChange}
                                    placeholder={'Select City'}
                                    />
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <center><span className="text-danger">*</span>These fields are required</center>
    
                        <Button title={'NEXT'} disab={!this.state.formIsValid}></Button>
                    </form>
                </div>
            </div>
            </div>
    );
    }
}


export default BusinessInfo;