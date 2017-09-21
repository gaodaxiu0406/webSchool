import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import './index.less';
export default class Swipe extends Component {
  constructor() {
    super();
    this.state = {
      index: 0
    }
  }
  render() {
    let opts = {
      auto: 2000,
      continuous: true,
      callback: (index) => {
        this.setState({ index });
      }
    }
    let sliders = [
      "http://nos.netease.com/edu-image/482f1953-7c50-4de6-9fce-16fe42a31a1d.jpg?imageView&thumbnail=860y380&quality=100",
      "http://nos.netease.com/edu-image/0422dc76-77c9-458f-a794-c3174fc55323.jpg?imageView&thumbnail=860y380&quality=100",
      "http://nos.netease.com/edu-image/81f06074-5e81-4f13-8e90-4486b2ebf0df.jpg?imageView&thumbnail=860y380&quality=100",
      "http://nos.netease.com/edu-image/1aadf313-ba9f-4e79-9f59-4dffe1a503a9.jpg?imageView&thumbnail=860y380&quality=100",
    ]
    return (
      <div className="swipe">
        <ReactSwipe swipeOptions={opts}>
          {
            sliders.map((item, index) => (
              <div key={index} className="swipe-item">
                <img src={item} />
              </div>
            ))
          }
        </ReactSwipe>
        <div className="dots">
          {
            sliders.map((item, index) => (
              <span className={this.state.index == index ? 'active' : ''} key={index}></span>
            ))
          }
        </div>
      </div>
    )
  }
}