import React, { Component } from 'react';
import './index.less';
import face from '../../common/img/face.png';
import { Link } from 'react-router-dom';
import * as actions_user from '../../redux/actions/user';
import * as actions_lesson from '../../redux/actions/lesson';
import { connect } from 'react-redux';
class Lesson extends Component {
  componentDidMount() {
    this.props.auth();
    this.props.getSubLessonList();
  }
  render() {
    return (
      <div className="lesson">
        {
          this.props.lesson.mylessonlist.length > 0
            ?
            <div className="lesson-content">
              <p className="btn_all">
                <i className="iconfont icon-liebiao1"></i>全部课程
              </p>
              <div className="lesson-list">
                {
                  this.props.lesson.mylessonlist.map((item, index) => (
                    <li key={index} className="lesson-item">
                      <h3>{item.course.name}</h3>
                      <div className="wrap">
                        <div className="lesson-item-img"><img src={item.course.img} /></div>
                        <div className="lesson-item-text">
                          <span>{item.course.progress}</span>
                          <span>{item.course.from}</span>
                          <span>{item.course.joinedNumber}</span>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </div>
            </div>
            :
            <div className="lesson-empty">
              <img src={face} />
              <p className="tip">您还没有订阅课程,快去订阅吧!</p>
              <div className="to_find">
                <Link to={'/'}>去发现</Link>
              </div>
            </div>
        }
      </div>
    )
  }
}
export default connect(state => ({ ...state }), { ...actions_user, ...actions_lesson })(Lesson);