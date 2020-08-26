export const user = (
  state = { isLogin: false, isLoading: false, error: "" },
  action
) => {
  switch (action.type) {
    case "requestLogin":
      return { isLogin: false, loading: true, error: "" };
    case "loginSuccess":
      return { isLogin: true, loading:false, error: "" };
    case "loginFailure":
      return { isLogin: false, loading: true, error: action.message };
    default:
        return state
  }
};

export function loginSaga(name){
    return {type:'login',name}
} 