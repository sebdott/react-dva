import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import {connect} from 'dva';
import Header from '../MainLayout/Header'

const FormItem = Form.Item;

class PersonIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const props = {location: "/person"};
    return (
      <span>
        <Header {...props}/>
       <div>Test</div>
      </span>
    );
  }
}

const mapStatesToProps = ({users}) => {
  return {
    ...users,
  };
};

export default connect(mapStatesToProps)(PersonIndex);
