import React from 'react'
import { Link } from 'react-router-dom';
class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            first_name: "",
            last_name: "",
            email: "",
            address: "none",
            password: "",
            total_capital: 0
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.renderErrors=this.renderErrors.bind(this)
    }

    componentDidMount(){
        this.props.clearErrors()
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.signup(this.state);
    }

    handleChange(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    renderErrors() {
        let errors=[]
        for(let i=0;i< this.props.errors.length;i++){
            const error = this.props.errors[i];
            if(error === "First name can't be blank"){
                errors.push(
                    <li className="error" key={`error-${i}`}>
                        Please enter your first name.
                    </li>
                )
            }
            else if(error ==="Last name can't be blank"){
                errors.push(
                    <li className="error" key={`error-${i}`}>
                        Please enter your last name.
                    </li>
                )
            }
            else if(error ==="Password is too short (minimum is 6 characters)")
            {
                errors.push(
                    <li className="error" key={`error-${i}`}>
                        Your password must be at least 6 characters.
                    </li>
                )
            }
            else if(error === "Email can't be blank"){
                errors.push(
                    <li className="error" key={`error-${i}`}>
                        Please enter your email.
                    </li>
                )
            }
            else{
                errors.push(
                    <li className="error" key={`error-${i}`}>
                        {error}
                    </li>
                )
            }
        }
        return (
            <ul>
                {errors}
            </ul>
        );
    }

    render(){
        return(
            <div className="signup-page-container">
                <div className="signup-page">
                    <Link to={'/'}>
                        <img width="30%" src={window.logo}/>
                    </Link>
                    <div className="signup-header">
                        <h1>Make Your Money Move</h1>
                        <p>Robinshould lets you invest in companies you love, commission-free.</p>
                    </div>
                    <p id="caution">Please enter your full legal name. Your legal name should match any form of government ID.</p>
                    <form className="signup-form">
                        <div className="name-form">
                                <input placeholder="First Name" onChange={this.handleChange('first_name')} type="text" value={this.state.first_name} />
                            <br />
                                <input placeholder="Last Name" onChange={this.handleChange('last_name')} type="text" value={this.state.last_name} />
                        </div>
                        <br />
                        <label>
                            <input className="signup-input" placeholder="Email" onChange={this.handleChange('email')} type="text" value={this.state.email} />
                        </label>
                        {/* <br />
                        <label>
                            <input className="signup-input" placeholder="Address" onChange={this.handleChange('address')} type="text" value={this.state.address} />
                        </label> */}
                        <br />
                        <label>
                            <input className="signup-input" placeholder="Password (min. 6 characters)" onChange={this.handleChange('password')} type="password" value={this.state.password} />
                        </label>
                        <br />
                        <button onClick={this.handleSubmit}>Continue</button>
                        <br/>
                        <br/>
                        {this.renderErrors()}
                    </form>
                </div>
                <div className="signup-page-description">
                    <h1>Commission-free trading</h1>
                    <p>Break free from commission-fees and make unlimited commission-free trades in stocks, funds, and options with Robinshould Financial. Other fees may apply. View our fee schedule to learn more.</p>
                    <h1>Account Protection</h1>
                    <p>Robinshould Financial is a member of SIPC. Securities in your account protected up to $500,000. For details, please see www.sipc.org.</p>
                    <h1>Stay on top of your portfolio</h1>
                    <p>Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.</p>
                </div>
            </div>
        )
    }
}

export default LoginForm