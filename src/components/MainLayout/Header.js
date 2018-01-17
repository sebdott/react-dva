import React, {Component} from 'react';
import {connect} from 'dva';
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';

// function Header({ location }) {
//   return (
//     <Menu
//       selectedKeys={[location.pathname]}
//       mode="horizontal"
//       theme="dark"
//     >
//       <Menu.Item key="/users">
//         <Link to="/users"><Icon type="bars" />Users</Link>
//       </Menu.Item>
//       <Menu.Item key="/person">
//         <Link to="/person"><Icon type="bars" />Users</Link>
//       </Menu.Item>
//       <Menu.Item key="/">
//         <Link to="/"><Icon type="home" />Home</Link>
//       </Menu.Item>
//       <Menu.Item key="/404">
//         <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
//       </Menu.Item>
//       <Menu.Item key="/antd">
//         <a href="https://github.com/dvajs/dva">dva</a>
//       </Menu.Item>
//     </Menu>
//   );
// }

class Header extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }
  onClick = ({item, key, keyPath}) => {
    this.dispatch({
      type: 'navigationModel/updateState',
      payload: {
        currentPage: key,
      },
    });
  };
  render() {
    const {currentPage} = this.props;
    return (
      <Menu
        selectedKeys={[currentPage]}
        mode="horizontal"
        theme="dark"
        onClick={this.onClick}>
        <Menu.Item key="/users">
          <Link to="/users">
            <Icon type="bars" />Users
          </Link>
        </Menu.Item>
        <Menu.Item key="/person">
          <Link to="/person">Person</Link>
        </Menu.Item>
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="home" />Home
          </Link>
        </Menu.Item>
        <Menu.Item key="/404">
          <Link to="/page-you-dont-know">
            <Icon type="frown-circle" />404
          </Link>
        </Menu.Item>
        <Menu.Item key="/antd">
          <a href="https://github.com/dvajs/dva">dva</a>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStatesToProps = ({userModel, navigationModel}) => {
  return {
    ...userModel,
    ...navigationModel,
  };
};

export default connect(mapStatesToProps)(Header);
