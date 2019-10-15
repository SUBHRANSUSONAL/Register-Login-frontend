import React,{Component} from 'react';
import Button from '../../FormElements/Button/Button';


class Congratulation extends Component{

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.history.push("/login");
    }

    render(){
        return(
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

export default Congratulation;