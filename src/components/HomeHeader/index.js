import React, { Component } from 'react';
import './index.less';
let logo = require('../../common/img/logo.png');
import { CSSTransition, TransitionGroup } from 'react-transition-group';
export default class HomeHeader extends Component {
    constructor() {
        super();
        this.state = { isShow: false, type: '' }
    }
    changeShow = () => {
        this.setState({ isShow: !this.state.isShow })
    }
    choose = (e) => {
        this.props.chooseLesson(e.target.type);
        this.changeShow();
        this.props.getLesson();
    }

    render() {
        return (
            <div className="home-header">
                <img src={logo} />
                <div className="home-menu" onTouchEnd={this.changeShow} >
                    { 
                        this.state.isShow ?
                            <i className="iconfont icon-guanbi"></i>
                            :
                            <i className="iconfont icon-shiliangzhinengduixiang"></i>
                    }
                </div>
                <TransitionGroup>
                    {this.state.isShow ?
                        <CSSTransition timeout={1000} classNames="fadeIn">
                            <ul className="menu-list" onTouchEnd={this.choose}>
                                <li type="all">全部</li>
                                <li type="computer">计算机</li>
                                <li type="eco-management">经济管理</li>
                                <li type="psychology">心理学</li>
                                <li type="foreign-language">外语</li>
                                <li type="literary-history">文学历史</li>
                                <li type="engineering">工学</li>
                                <li type="science">理学</li>
                                <li type="law">法学</li>
                                <li type="philosophy">哲学</li>
                                <li type="teaching-method">教育科学</li>
                                <li type="biomedicine">生命科学</li>
                                <li type="art-design">艺术设计</li>
                            </ul>
                        </CSSTransition>
                        :
                        null
                    }
                </TransitionGroup>
            </div>
        )
    }
}