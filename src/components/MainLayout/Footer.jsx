import React, {Component} from 'react';
import {connect} from 'dva';

class Footer extends Component {
  render() {
    return (
      <span>
        <div>2010-2018 © Codedsphere All Rights Reserved.</div>
      </span>
    );
  }
}

const mapStatesToProps = ({userModel, navigationModel}) => {
  return {
    ...userModel,
    ...navigationModel,
  };
};

export default connect(mapStatesToProps)(Footer);
