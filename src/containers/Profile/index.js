import React, { Component } from 'react';
import profile from '../../common/img/profile.png';
import { Link } from 'react-router-dom';
import './index.less';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/user';


class Profile extends Component {
  logoutClick = () => {
    this.props.logout();
  }
  componentDidMount() {
    this.props.auth();
  }
  render() {
    return (
      <div className="profile">
        <div className="profile-bg">
          <img src={profile} />
          {
            this.props.user.userInfo.username
              ?
              <span className="btn_login">{this.props.user.userInfo.username}</span>
              :
              <Link to={'/login'} className="btn_login">登录</Link>
          }
        </div>
        <ul className="profile-list">
          <li className="profile-item"><i className="iconfont icon-4xiugaimima left-icon"></i>修改密码<i className="iconfont icon-zuojiantou right-icon"></i>
          </li>
          <li className="profile-item"><i className="iconfont icon-faq left-icon"></i>常见问题<i className="iconfont icon-zuojiantou right-icon"></i>
          </li>
          <li className="profile-item"><i className="iconfont icon-guanyuwomen left-icon"></i>关于我们<i className="iconfont icon-zuojiantou right-icon"></i>
          </li>
        </ul>
        {
          this.props.user.userInfo.username
            ?
            <div className="btn_logout" onTouchEnd={this.logoutClick}>注销登录</div>
            :
            null
        }
      </div>
    )
  }
}
export default connect(state => ({ ...state }), actions)(Profile);