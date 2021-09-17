import React from 'react'
class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            first_name: "",
            last_name: "",
            email: "",
            address: "",
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
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li className="error" key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render(){
        return(
            <div className="signup-page-container">
                <div className="signup-page">
                    <img width="30%" src={window.logo}/>
                    <form className="signup-form">
                        <div className="name-form">
                            <label> 
                                <input placeholder="First Name" onChange={this.handleChange('first_name')} type="text" value={this.state.first_name} />
                            </label>
                            <br />
                            <label> 
                                <input placeholder="Last Name" onChange={this.handleChange('last_name')} type="text" value={this.state.last_name} />
                            </label>
                        </div>
                        <br />
                        <label>
                            <input className="signup-input" placeholder="Email" onChange={this.handleChange('email')} type="text" value={this.state.email} />
                        </label>
                        <br />
                        <label>
                            <input className="signup-input" placeholder="Address" onChange={this.handleChange('address')} type="text" value={this.state.address} />
                        </label>
                        <br />
                        <label>
                            <input className="signup-input" placeholder="Password" onChange={this.handleChange('password')} type="password" value={this.state.password} />
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
                    <p>Break free from commission-fees and make unlimited commission-free trades in stocks, funds, and options with Robinhood Financial. Other fees may apply. View our fee schedule to learn more.</p>
                    <h1>Account Protection</h1>
                    <p>Robinhood Financial is a member of SIPC. Securities in your account protected up to $500,000. For details, please see www.sipc.org.</p>
                    <h1>Stay on top of your portfolio</h1>
                    <p>Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.</p>
                </div>
            </div>
        )
    }
}

export default LoginForm