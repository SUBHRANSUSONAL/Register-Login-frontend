import React,{Component} from 'react';
import Registration from '../../componenets/Registration/Registration';
import EmailVerify from '../../componenets/EmailVerify/EmailVerify';
import BusinessInfo from '../../componenets/BusinessInfo/BusinessInfo';
import AuthorizedInfo from '../../componenets/AuthorizedInfo/AuthorizedInfo';
import Congratulation from '../../componenets/Congratulation/Congratulation';
import Login from '../../componenets/Login/Login';
import {Route} from 'react-router-dom';

class Main extends Component{
    render(){
        return(
            <div>
                <header className="">
                    <Route path="/" exact component={Registration}></Route>
                    <Route path="/email-verify" component={EmailVerify}></Route>
                    <Route path="/business-info" component={BusinessInfo}></Route>
                    <Route path="/authorized-info" component={AuthorizedInfo}></Route>
                    <Route path="/congratulation" component={Congratulation}></Route>
                    <Route path="/login"  component={Login}></Route>

                </header>
            </div>
        );
    }
}

export default Main;