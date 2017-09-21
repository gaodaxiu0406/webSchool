import React, { Component } from 'react';
import './index.less';
import MHeader from '../../components/MHeader/index';
import * as actions from '../../redux/actions/lesson';
import { connect } from 'react-redux';
class Detail extends Component {
  componentWillMount() {
    if(this.props.location.state){
      let { detailUrl } = this.props.location.state;
      this.props.getLessonDetail(detailUrl);
    }
  }

  clickSubscibe = (_id) => {
    this.props.subscibe(_id);
  }
  render() {
    let detailData = this.props.location.state
    return (
      <div className="lesson-detial">
        <div id="lesson-header"><MHeader title="课程详情" /></div>
        <div id="lesson-body">
          <div className="lesson-pic">
            <img src={detailData.img} />
          </div>
          <h3>【课程简介】</h3>
          <div dangerouslySetInnerHTML={{ __html: this.props.lesson.lessonDetail.description }} className="description" />
          <div className="btn_subscibe" onTouchEnd={() => this.clickSubscibe(detailData._id)}>立即订阅</div>
          <div className="tips">{this.props.lesson.error}{this.props.lesson.success}</div>
        </div>
      </div>
    )
  }

}
export default connect(state => ({ ...state }), actions)(Detail);