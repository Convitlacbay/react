import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isShowPassword: false
        }
    }

    handleChangeUserName = (event) => {
        this.setState({ userName: event.target.value })
        console.log(event.target.value)
    }

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value })
        console.log(event.target.value)

    }

    handleLogin = () => {
        console.log('username: ', this.state.userName, 'password: ', this.state.password)
        console.log('all state: ', this.state)
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='login'>Login</div>
                        <div className='content-user-password'>
                            <label>Username:</label>
                            <input type='text' className='userName'
                                value={this.state.userName}
                                onChange={
                                    (event) => this.handleChangeUserName(event)}></input>
                            <label>Password:</label>
                            <input type={this.state.isShowPassword ? 'text' : 'password'} className='password'
                                value={this.state.password}
                                onChange={
                                    (event) => this.handleChangePassword(event)
                                }></input>
                            <span className='show-password'
                                onClick={() => this.handleShowHidePassword()}>
                                <i class=
                                    {
                                        this.state.isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                                    }></i>
                            </span>
                            <button type='button' className='button'
                                onClick={() => { this.handleLogin() }}>Login</button>
                            <a href='/'>Forgot your password ?</a>
                            <div className='content-icon'>
                                <i>icon 1 mxh </i>
                                <i>icon 2 mxh </i>
                                <i>icon 3 mxh </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
