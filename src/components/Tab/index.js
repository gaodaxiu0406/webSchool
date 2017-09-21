import React, { Component } from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';
import './index.less';
export default class Tab extends Component {

    render() {
        return (
            <Router>
                <nav className="footer">
                    <NavLink exact to={"/"} activeClassName="active">
                        <i className="iconfont icon-iconset0455"></i>
                        <span>首页</span>
                    </NavLink>
                    <NavLink to={"/lesson"} activeClassName="active"> 
                        <i className="iconfont icon-ljkc"></i>
                        <span>我的课程</span>
                    </NavLink>
                    <NavLink to={"/profile"} activeClassName="active">
                        <i className="iconfont icon-yonghu"></i>
                        <span>个人中心</span>
                    </NavLink>
                </nav>
            </Router>
        )
    }

}