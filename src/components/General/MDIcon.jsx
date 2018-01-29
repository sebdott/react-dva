import React from 'react';
import classNames from 'classnames';
import 'mdi/css/materialdesignicons.css';
import css from '../../styles/general/icon.less';

function MDIcon({
  iconName,
  className,
  color,
  size,
  style,
  bubbleCount,
  rotated,
}) {
  const classes = classNames(
    css.icon,
    `mdi`,
    `${!color ? '' : `mdi-${color}`}`,
    `${!size ? '' : `mdi-${size}`}`,
    `${`mdi-${iconName}`}`,
    className,
  );
  return (
    <i
      className={classes}
      style={style}
      data-count={bubbleCount}
      data-rotated={rotated}
    />
  );
}

export default MDIcon;
