import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
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

    handleLogin = async () => {
        // console.log('username: ', this.state.userName, 'password: ', this.state.password)
        // console.log('all state: ', this.state)
        this.setState({
            errMessage: '', //trc moi lan login deu clear loi
        })
        try {
            let data = await handleLoginApi(this.state.userName, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.Message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log(`login success`)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.Message
                    })
                }
            }
            console.log('error ', e.response)
            // console.log('error')
            // 
        }
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
                            <span className="error-message">{this.state.errMessage}</span>
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
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
