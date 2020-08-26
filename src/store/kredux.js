export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentValue = undefined;
  const callbackList = [];

  function getStore() {
    return currentValue;
  }
  function dispatch(options) {
    currentValue = reducer(currentValue, options);
    callbackList.forEach(v => v());
    return options;
  }
  dispatch({ type: "123" }); //初始化时调用
  function subscribe(cb) {
    callbackList.push(cb);
  }

  return { getStore, dispatch, subscribe };
}
export function applyMidderware(...middlerwares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    const midApi = {
      getState: store.getState,
      dispath: (...args) => {
        dispatch(...args);
      }
    };
    
    //middlerwares中间件本来就是函数，
    const chain = middlerwares.map(mw => mw(midApi));

    //中间件格式
    // function logger({dispatch,store}){
    //     return dispatch=>action=>{
    //         console.log(action.type+'任务执行')
    //         return dispatch(action)
    //     }
    // }
    dispatch = compose(...chain)(store.dispatch); //返回的是一个被中间件加强的dispatch,相当于function(action){}部分

    return {
      ...store,
      dispatch
    };
  };
}
//返回嵌套函数(dispatch)=>{fn3(fn2(fn1(dispatch)))}
function compose(...chain) {
  if (chain.length === 0) {
    return args => args;
  }
  if (chain.length === 1) {
    return chain[0];
  }
  return chain.reduce((left, right) => (...args) => {
    console.log(left)  
    return right(left(...args))});
}
