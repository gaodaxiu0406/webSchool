import React, { Component } from 'react';
import './index.less';
import { Link } from 'react-router-dom';
import MHeader from '../../components/MHeader';
import * as actions from '../../redux/actions/user';
import {connect} from 'react-redux';

let regImg = require('../../common/img/reg.png');

class Reg extends Component {
    constructor(){
        super();
        this.state={
            flag:true
        }
    }
    handleClick=()=>{
        this.setState({flag:!this.state.flag});
    }
    clickReg=()=>{
        let username=this.refs.username.value;
        let password=this.refs.password.value;
        if(username!==""&&password!==""){
            this.props.reg({username,password});
        }
    }
    render() {
        return (
            <div className="reg">
                <MHeader title={"注册"}/>
                <div className="profile">
                    <img src={regImg} />
                </div>
                <form className="reg_form">
                    <input type="text" placeholder="请输入用户名" className="username" ref='username'/>
                    <input type="password" placeholder="请输入密码" className="password" ref="password"/>
                    <input type="checkbox" checked={this.state.flag} onChange={this.handleClick} name="agreement" className="agreement" id="agreement"/>
                    <label htmlFor="agreement"></label>                     
                    <label htmlFor="agreement">同意《用户注册协议》</label> 
                    <div className="btn_reg" onTouchEnd={this.clickReg}>立即注册</div>
                    <div className="tips">{this.props.user.error}</div>
                </form>
            </div>

        )
    }

}
export default connect(state=>({...state}),actions)(Reg);