import queryString from 'query-string';
import * as usersService from '../services/users';
import {API, type as TYPE} from '../utils';

export default {
  namespace: 'userModel',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
    },
  },
  effects: {
    *fetch({payload: {page = 1}}, {call, put}) {
      const {data, headers} = yield call(usersService.fetch, {page});
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({payload: id}, {call, put}) {
      yield call(usersService.remove, id);
      yield put({type: 'reload'});
    },
    *patch({payload: {id, values}}, {call, put}) {
      yield call(usersService.patch, id, values);
      yield put({type: 'reload'});
    },
    *create({payload: values}, {call, put}) {
      yield call(usersService.create, values);
      yield put({type: 'reload'});
    },
    *reload(action, {put, select}) {
      const page = yield select(state => state.users.page);
      yield put({type: 'fetch', payload: {page}});
    },
    *secureAuthentication({payload}, {put}) {
      const msg = payload.msg || '登入已过期';
      const authenticationState = payload.authenticationState || 'LOGIN';
      // localStorage.removeItem(TYPE.accessToken);
      // localStorage.removeItem(TYPE.sessionId);
      yield put({type: 'initializeAll'});
      yield put({type: 'teamModel/initializeAll'});
      yield put({type: 'transactionModel/initializeAll'});
      yield put({type: 'orderModel/initializeAll'});
      yield put({type: 'transferModel/initializeAll'});
      yield put({
        type: 'layoutModel/updateState',
        payload: {
          shouldShowProfileModal: false,
          shouldShowAuthModel: payload.showLogin,
        },
      });
      yield put({
        type: 'updateState',
        payload: {authenticationState},
      });
      if (payload.showLogin) {
        yield put({
          type: 'formModel/updateState',
          payload: {
            responseMsg: {
              msg,
              icon: 'close-circle-outline',
              color: 'red',
            },
          },
        });
      } else {
        throw new Error(msg);
      }
    },
    // *putUserLogin(payloadObj, {call, put, select}) {
    //   yield put({type: 'updateState', payload: {awaitingResponse: true}});
    //   const {formModel, appModel} = yield select(state => state);
    //   const {username, password, varifyCode, webUniqueCode} = formModel;
    //   const encodedPassword = obse7(password.value);
    //   const hash = yield obsw7({
    //     username: username.value,
    //     password: password.value,
    //     doubleHash: appModel.deviceToken,
    //   });
    //   const body = {
    //     hash,
    //     password: encodedPassword,
    //     username: username.value,
    //     validateCode: varifyCode.value,
    //     webUniqueCode,
    //   };
    //   const response = yield call(request.to, {
    //     url: API.webLogin,
    //     method: 'post',
    //     headers: {device_token: appModel.deviceToken},
    //     body,
    //   });
    //   const {err, data} = response;
    //   if (data) {
    //     const accessToken = data.oauthToken.access_token;
    //     const sessionId = data.sessionId;
    //     window.history.replaceState({}, document.title, '.');
    //     yield localStorage.setItem(TYPE.accessToken, accessToken);
    //     yield localStorage.setItem(TYPE.sessionId, sessionId);
    //     yield put({type: 'updateState', payload: {accessToken, sessionId}});
    //     yield put({type: 'getCurrentUser'});
    //     yield put({type: 'getCardsAndWithdrawDetail'});
    //     yield put({
    //       type: 'formModel/initializeState',
    //       payload: ['username', 'password', 'varifyCode'],
    //     });
    //     yield put({
    //       type: 'updateState',
    //       payload: {awaitingResponse: false},
    //     });
    //     yield put({
    //       type: 'layoutModel/updateState',
    //       payload: {shouldShowAuthModel: false},
    //     });
    //   } else if (err) {
    //     yield put({type: 'formModel/getValidatePic'});
    //     yield put({
    //       type: 'formModel/updateState',
    //       payload: {
    //         responseMsg: {
    //           msg: err.message,
    //           icon: 'checkbox-marked-circle-outline',
    //           color: 'red',
    //         },
    //       },
    //     });
    //     yield put({
    //       type: 'updateState',
    //       payload: {awaitingResponse: false},
    //     });
    //   }
    // },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, search}) => {
        const query = queryString.parse(search);
        if (pathname === '/users') {
          dispatch({type: 'fetch', payload: query});
        }
      });
    },
  },
};
