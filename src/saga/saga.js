//call 异步方法 put状态更新，takeEvery监听
import { call, put, takeEvery } from "redux-saga/effects";

//模拟登陆
export const UserService = {
  login(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name === "wang") {
          resolve({ name: "wang" });
        } else {
          reject({ message: "登录失败" });
        }
      }, 1000);
    });
  }
};
//worker saga
function* login(action) {
  try {
    yield put({ type: "requestLogin" });
    const result = yield call(UserService.login, action.name);
    yield put({ type: "loginSuccess", result });
  } catch (error) {
    yield put({ type: "loginFailure", payload: error });
  }
}
//watcher saga
function* mySaga() {
  yield takeEvery("login", login);
}
export default mySaga;