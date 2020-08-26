import {createStore,applyMiddleware,combineReducers} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {counterReducer,loginReducer} from './counter.js'
import createSagaMiddleware  from 'redux-saga'
import mySaga from '../saga/saga.js'
import {user} from '../saga/user.js'
//1.创建saga中间件
const mid=createSagaMiddleware();

const store = createStore(combineReducers({counter:counterReducer,login:loginReducer,user:user}),applyMiddleware(logger,logger2,mid))
function logger2({ dispatch, store }) {
    return dispatch => action => {
      console.log(action.type + "任务执行2");
      return dispatch(action);
    };
  }
//2. 执行监听
mid.run(mySaga)
export default store