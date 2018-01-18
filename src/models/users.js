import queryString from 'query-string';
import * as usersService from '../services/users';

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
