import React, { Component } from 'react';
import HomeHeader from '../../components/HomeHeader';
import './index.less';
import Swipe from '../../components/Swipe';
import ScrollList from '../../components/ScrollList'
import host from '../../api/host';
import { get, post } from '../../api';
import * as actions from '../../redux/actions/home';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import util from '../../common//util';
class Home extends Component {

  getLesson = () => {
    this.props.getLesson();
  }
  chooseLesson = (type) => {
    this.props.setLessonType(type);
    this.forceUpdate();
  }
  loadMore = () => {
    this.getLesson();
  }
  componentDidMount() {
    // 判断redux中是否存放了课程列表数据,如果有就不去获取了,否则每次切换到首页都会请求一次数据,列表越来越长
    if(this.props.home.lessons.lessonList.length===0&&this.props.home.lessons.hasMore){
      this.getLesson();
    }else{
      // 将记录的滚动条位置赋值给滚动元素
      this.refs.scroll.scrollTop=util.get('homeScrollTop');
      // 让组件强制更新,否则不会触发scrollList的componentWillReceiveProps,就不会绑定scroll事件了
      this.forceUpdate();
    }
  }
  componentWillUnmount(){
    // 组件销毁时,记录滚动条的位置到sessionStorage中,组件加载时读取记录的值,然后将strollTop设为记录的值
    util.set('homeScrollTop',this.refs.scroll.scrollTop);
  }
  render() {
    let lessons = this.props.home.lessons;
    return (
      <div className="home" style={{height:document.documentElement.clientHeight ||  document.body.clientHeight}}>
        <HomeHeader className="home-header" getLesson={this.getLesson} chooseLesson={this.chooseLesson} />
        <div ref="scroll" className="content" >
          <ScrollList element={this.refs.scroll} hasMore={lessons.hasMore} isLoading={lessons.isLoading} loadMore={this.loadMore}>
            <Swipe className="swipe" />
            {
              lessons.lessonList.length > 0
                ?
                <ul className="lesson-list">
                  {
                    lessons.lessonList.map((item, index) => (
                      <Link to={{ pathname: '/detail', state: item }} key={index}>
                        <li className="lesson-item">
                          <div className="lesson-img"><img src={item.img} /></div>
                          <div className="lesson-text">
                            <p className="name">{item.name}</p>
                            <p className="from">{item.from}</p>
                            <div className="tag">
                              <div className="joinedNumber">
                                <i className="iconfont icon-yonghu1"></i>
                                <span>{item.joinedNumber}</span>
                              </div>
                              <span className="progress">
                                <i className="iconfont icon-shijian"></i>
                                <span>{item.progress.replace('，可查看内容', '')}</span>
                              </span>
                            </div>
                          </div>
                        </li>
                      </Link>
                    ))
                  }
                </ul>
                :
                (lessons.hasMore ?
                  <div className="tips isLoading">正在加载中...</div>
                  :
                  <div className="tips noData">暂时没有数据</div>
                )
            }
            {
              lessons.hasMore ? <div className="tips loadMore" onClick={this.loadMore}>加载更多</div> : <div className="tips noData">没有更多数据了</div>
            }
          </ScrollList>
        </div>
      </div>
    )
  }

}
export default connect(state => ({ ...state }), actions)(Home);