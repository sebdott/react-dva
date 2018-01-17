import React, {Component} from 'react';
import {Modal, Form, Input} from 'antd';
import {connect} from 'dva';
import Header from '../MainLayout/Header';

class PersonIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    return (
      <span>
        <Header />
        <div>Test</div>
      </span>
    );
  }
}

const mapStatesToProps = ({userModel}) => {
  return {
    ...userModel,
  };
};

export default connect(mapStatesToProps)(PersonIndex);
