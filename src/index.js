import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import Fingerprint2 from 'fingerprintjs2';
import { message } from 'antd';
import './index.css';
import { encryptAES, decryptAES } from './utils/encrypt'

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// Moved to router.js

// 4. Router
app.router(require('./router'));

const getFingerprint = () =>
  new Promise(resolve => {
    new Fingerprint2().get((result, components) => resolve(result));
  });

const main = async () => {
  const deviceToken = await getFingerprint();
  window.sessionStorage.id = new Date().getTime();
  window.sessionStorage.init = encryptAES(
    deviceToken,
    window.sessionStorage.id,
  );
  app.model({
    namespace: 'appModel',
    state: {deviceToken},
  });
  return app.start('#root');
};

const getToken = async () => {
  if (window.sessionStorage.init && window.sessionStorage.id) {
    var value = decryptAES(
      window.sessionStorage.init,
      window.sessionStorage.id,
    );
    if (value) {
      app.model({
        namespace: 'appModel',
        state: {deviceToken: value},
      });
      return app.start('#root');
    }
  }
  main();
};

getToken();