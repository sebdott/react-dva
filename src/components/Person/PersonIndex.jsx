import React, {Component} from 'react';
import {Modal, Form, Input, Button} from 'antd';
import {connect} from 'dva';
import Header from '../MainLayout/Header';

class PersonIndex extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }
  onGetApiValue = () => {
    this.dispatch({
      type: 'personModel/getPersonList',
    });
  };
  renderPersonList() {
    const {personList} = this.props;

    const list = _.map(personList, person => {
      return <div key={person.id}>{person.name}</div>;
    });

    return <div>{list}</div>;
  }
  render() {
    return (
      <span>
        <Header />
        <div>{this.renderPersonList()}</div>
        <Button onClick={this.onGetApiValue} />
      </span>
    );
  }
}

const mapStatesToProps = ({personModel}) => {
  return {
    ...personModel,
  };
};

export default connect(mapStatesToProps)(PersonIndex);
