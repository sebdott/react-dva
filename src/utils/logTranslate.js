import _ from 'lodash';

export function logTranslate(msg) {
  let translatedMsg = msg || '';
  if (translatedMsg) {
    translatedMsg = _.lowerCase(msg);
    translatedMsg = _.replace(translatedMsg, 'error', '错误');
    translatedMsg = _.replace(translatedMsg, 'undefined', '未定义');
    translatedMsg = _.replace(translatedMsg, 'is not a function', '不是功能');
    translatedMsg = _.replace(
      translatedMsg,
      'unexpected end of json input',
      '无法解析空值数据',
    );
    translatedMsg = _.replace(
      translatedMsg,
      'uncaught type error',
      '未捕获类型错误',
    );
    translatedMsg = _.replace(
      translatedMsg,
      'uncaught range error',
      '未捕获范围错误',
    );
    translatedMsg = _.replace(
      translatedMsg,
      'uncaught uri error',
      '未捕获范围错误',
    );
    translatedMsg = _.replace(
      translatedMsg,
      'unexpected token',
      '发现意外语法或标记',
    );
    translatedMsg = _.replace(
      translatedMsg,
      'cannot set property',
      '无法设置属性',
    );
    translatedMsg = _.replace(translatedMsg, 'of null', '给与null');
    translatedMsg = _.replace(translatedMsg, 'of undefined', '给与undefined');
    translatedMsg = _.replace(
      translatedMsg,
      'failed to fetch',
      '未能获取该请求信息',
    );
    translatedMsg = _.replace(translatedMsg, 'cannot load', '无法加载');
    translatedMsg = _.replace(translatedMsg, 'invalid state error', '状态错误');
    translatedMsg = _.replace(
      translatedMsg,
      'uncaught syntax error',
      '未捕获语法错误',
    );
    translatedMsg = _.replace(
      translatedMsg,
      'maximum call stack size exceeded',
      '超过尝试极限',
    );
    translatedMsg = _.replace(
      translatedMsg,
      'uncaught reference error',
      '未知参考错误',
    );
    translatedMsg = _.replace(
      translatedMsg,
      'converting circular structure to json',
      '将循环结构转换为JSON',
    );
    translatedMsg = _.replace(
      translatedMsg,
      'no ‘access control allow origin’ header is present on the requested resource',
      '未满足同源策略',
    );
    translatedMsg = _.replace(
      translatedMsg,
      'an attempt was made to use an object that is not, or is no longer, usable',
      '对象的状态或运行时间有误',
    );
    return translatedMsg;
  }
}
