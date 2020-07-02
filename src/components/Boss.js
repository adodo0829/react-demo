import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

const style = {
  fontSize: "24px",
};

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
    };

    this.toggle = this.toggle.bind(this);
  }

  render() {
    return (
      <div>
        {/* <h2 className={ this.state.isShow ? 'show' : 'hide' } style={style}>BOSS: huhua</h2> */}
        {/* 动画组件 */}
        <CSSTransition
          in={this.state.isShow}
          timeout={2000}
          classNames="fade"
          // unmountOnExit会移除dom
          unmountOnExit
        >
          <h2 style={style}>BOSS: huhua</h2>
        </CSSTransition>
        <button onClick={this.toggle}>单击切换状态</button>
      </div>
    );
  }

  toggle() {
    this.setState({ isShow: !this.state.isShow });
  }
}

export default Boss;
