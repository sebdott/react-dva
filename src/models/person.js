import queryString from 'query-string';
import _ from 'lodash';
import * as usersService from '../services/users';
import {API} from '../utils';
import {apiRequest as request} from '../services';

const INITIAL_STATE = {
  personList: [],
};

export default {
  namespace: 'personModel',
  state: INITIAL_STATE,
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    removeState(state, {payload}) {
      const newState = _.omit(state, payload);
      return {
        ...newState,
      };
    },
    initializeState(state, {payload}) {
      const initialStates = _.pick(INITIAL_STATE, payload);
      return {
        ...state,
        ...initialStates,
      };
    },
    initializeAll(state, {payload}) {
      let newState = {};
      if (payload) {
        newState = _.omit(INITIAL_STATE, payload);
      } else {
        newState = INITIAL_STATE;
      }

      return {
        ...state,
        ...newState,
      };
    },
  },
  effects: {
    *getPersonList(payloadObj, {put, call, select}) {
      yield put({
        type: 'updateState',
        payload: {
          awaitingResponse: true,
        },
      });

      const {navigationModel} = yield select(state => state);

      let response = null;
      // let params = null;

      // params = {
      //   startTime: `${startDatetime.format('YYYY-MM-DD')}`,
      //   endTime: `${endDatetime.format('YYYY-MM-DD')}`,
      //   start: 0,
      //   size: 100000,
      // };

      // response = yield call(request.to, {
      //   url: `${API.personList}?${queryString.stringify(params)}`,
      //   method: 'get',
      //   headers: {
      //     authorization: `bearer ${accessToken}`,
      //     device_token: appModel.deviceToken,
      //   },
      // });
      response = yield call(request.to, {
        url: 'https://api.github.com/users/codedsphere/repos',
        method: 'get',
      });
      if (response.data) {
        const statusOK = typeof response.data === 'object';
        if (statusOK) {
          yield put({
            type: 'updateState',
            payload: {
              personList: _.cloneDeep(response.data),
            },
          });
        }
      } else if (response.err) {
        if (response.err.statusCode === '401') {
          // yield put({
          //   type: 'userModel/secureAuthentication',
          //   payload: {
          //     msg: response.err.message,
          //   },
          // });
        } else {
          throw new Error(`API Failed，${response.err.message}`);
        }
      }
      yield put({
        type: 'updateState',
        payload: {
          awaitingResponse: false,
        },
      });
    },
  },
};
