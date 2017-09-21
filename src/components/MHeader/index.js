import React, { Component } from 'react';
import './index.less';
// import {withRouter} from 'react-router';
export default class MHeader extends Component {
    back=()=>{
        // this.props.history.goBack();
        window.history.back();
    }
    render() {
        return (
            <div className="m-header">               
                <div onClick={this.back} className="m-back"><i className="iconfont icon-back"></i></div>
                <span>{this.props.title}</span>
            </div>
        )
    }
}
// export default withRouter(MHeader);