import React, {Component} from 'react';
import classnames from 'classnames';
import {Table} from 'antd';
import {} from '../General/';
import css from '../../styles/general/tableContainer.less';

class TableContainer extends Component {
  render() {
    const {
      columns,
      className,
      pagination,
      expandedRowRender,
      expandedRowKeys,
      expandIconColumnIndex,
      expandIconAsCell,
      dataSource,
      scroll,
      onChange,
      loading,
    } = this.props;
    const classnameCombine = classnames(css.tableContainer, className);

    let props = {};
    if (expandedRowRender) {
      props = {
        className: classnameCombine,
        columns,
        pagination,
        dataSource,
        expandedRowRender,
        expandedRowKeys,
        expandIconColumnIndex,
        expandIconAsCell,
        scroll,
        'data-width': scroll ? scroll.x.toString() : '0',
      };
    } else {
      props = {
        className: classnameCombine,
        columns,
        pagination: pagination || false,
        dataSource,
        scroll,
        'data-width': scroll ? scroll.x.toString() : '0',
      };
    }

    if (onChange) {
      props.onChange = onChange;
    }

    return <Table {...props} />;
  }
}

export default TableContainer;
