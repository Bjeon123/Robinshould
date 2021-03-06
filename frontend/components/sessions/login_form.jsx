import React from 'react'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.demoUser=this.demoUser.bind(this)
    }

    componentDidMount(){
        this.props.clearErrors();
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

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state);
    }

    handleChange(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    demoUser(e){
        this.props.login({email: "demoUser@demo.com", password: "Itsmapassword887766$123"})
    }

    render() {
        return (
            <div className="signin-page">
                <img width="50%" src={window.login}></img>
                <form width="50%" className="login-form">
                    <h1>Welcome to Robinshould</h1>
                    <label> Email
                        <br />
                        <input onChange={this.handleChange('email')} type="text" value={this.state.email} />
                    </label>
                    <br/>
                    <label> Password
                        <br />
                        <input onChange={this.handleChange('password')} type="password" value={this.state.password} />
                    </label>
                    <br />
                    <button className="demo-button" onClick={this.demoUser}>Demo Login</button>
                    <br />
                    {this.renderErrors()}
                    <br/>
                    <button className="signin-button-form" onClick={this.handleSubmit}>Sign In</button>
                </form>

            </div>
        )
    }
}

export default LoginForm