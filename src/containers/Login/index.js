import React, { Component } from 'react';
import './index.less';
import { Link } from 'react-router-dom';
import MHeader from '../../components/MHeader';
let login = require('../../common/img/login.png');
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/user';
class Login extends Component {
    clickLogin=()=>{
        let username=this.refs.username.value;
        let password=this.refs.password.value;
        if(username!==""&&password!==""){
            this.props.login({username,password});
        }
        this.forceUpdate;
    } 
    render() {
        return (
            <div className="login">
                <MHeader title={"登录"} />
                <div className="profile">
                    <img src={login} />
                </div>
                <form className="login_form">
                    <input type="text" placeholder="请输入用户名" className="username" ref="username" />
                    <input type="password" placeholder="请输入密码" className="password" ref="password" />
                    <Link to={'/reg'} className="toreg">前往注册</Link>
                    <div className="btn_login" onTouchEnd={this.clickLogin}>登 录</div>
                    <div className="tips">{this.props.user.error}</div>
                </form>
            </div>
        )
    }
}
export default connect(state=>({...state}),actions)(Login);