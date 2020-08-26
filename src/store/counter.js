export const add = num => ({ type: "add", payload: num });
export const minus = () => ({ type: "minus" });
export const asyncAdd = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: "add", payload: 5 });
  }, 1000);
};

export  const counterReducer = function(state=0,action){
    const number = action.payload||1
    switch(action.type){
        case 'add':
            return state+number;
        case 'minus':
            return state-1;
        default:
            return state;
    }
}

export const login=()=>({type:'login'});
export const loginout=()=>({type:'loginout'})
export const loginReducer = function(isLogin=false,action){
  switch(action.type){
    case 'login1':
      return true;
    case 'loginout':
      return false;
    default:
      return isLogin
  }
}