import React, { Component } from 'react';
export default class ScrollList extends Component {
  constructor(){
    super();
    this.state={flag:false};
  }
  componentWillReceiveProps(nextProps){
    //console.log(nextProps);
    //console.log(this.props);
    if(nextProps.element&&!this.state.flag){
      nextProps.element.addEventListener('scroll',()=>{
        // 定时器节流
        clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
          let {scrollTop,offsetHeight,scrollHeight} = nextProps.element;
          //console.log(scrollTop,offsetHeight,scrollHeight);
          if(scrollTop+offsetHeight+40>scrollHeight&&this.props.hasMore&&!this.props.isLoading){
            this.props.loadMore();
          }
        },50)
      })
      // flag 只绑定一次scroll事件
      this.setState({flag:true});
    }
  }
  render() {

    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}