import React, { useState, useMemo ,useCallback,memo,useRef,forwardRef} from 'react';
// , PureComponent, memo, useState, useMemo, useCallback

function Count(props) {
  return <div>子组件count值：{props.count}</div>
}
function ComponentA(props,ref){
    console.log('重新渲染A')
    return <div ref={ref} onClick={props.onClick}>{props.a}</div>
}
const EnhanceComponentA = forwardRef(ComponentA)
function ComponentB(props){
    console.log('重新渲染B')
    return <div onClick={props.onClick}>{props.b}</div>
}
const EnhanceComponent = memo(ComponentB)

function App(props) {
  const buttonRef = useRef(null)
  const [count, setCount] = useState(0);
  const [valueA, setValueA] = useState(1)
  const [valueB, setValueB] = useState(2)
  //第一个参数是要执行的函数
  //第二个参数是执行函数依赖的变量组成的数据
  //这里只有count发生变化double才会重新计算
  const double = useMemo(() => {  //
    return count * 2;
  }, [count])
// useCallback是useMemo的变体
//   useMemo(()=>return fn);
//   //等价
//   useCallback(fn);
  
  const handClickA = ()=>{
    setValueA(valueA+1)
  }
  //useCallback可以保证在所依赖的state不变的情况下,组件重渲染后，onClick还是上一次渲染的那一个(每次组件重渲染后，onClick都会重新定义).
  //结合memo,父组件渲染后，当子组件的属性没有变化，将不再触发子组件渲染
  const handClickB = useCallback(()=>{
    setValueB(valueB+3)
    console.log('更新监听函数')
  },[valueB])
  return (
    <div className="app">
      <p>父组件count值：{count}</p>
      <Count count={count} />
      {/* useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。 */}
      <button
        onClick={() => {
            console.log(buttonRef.current)
          setCount(count + 1)
        }}>
        Add
     </button>
      <div>double值：{double}</div>
      <EnhanceComponentA  ref={buttonRef} a={valueA} onClick={handClickA}/>
      <EnhanceComponent b={valueB} onClick={handClickB}/>
    </div>
  )
}

export default App;
