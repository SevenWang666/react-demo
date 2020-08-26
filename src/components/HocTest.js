import React from 'react'


const data=[
    {title:'fruit',name:'水果'},
    {title:'animal',name:'动物'},
    {title:'people',name:'人类'}
]
function comp(props){
    return <div>{props.title}-----{props.name}</div>
}

const widthContent=Template=>props=>{
    return <Template {...data[props.id]}></Template>
}
const withLogCom=function(Template){
    return class extends React.Component{
        componentDidMount(){
            console.log(`已挂载${this.props.id}`)
        }
        render(){
            return <Template {...this.props}/>
        }
    }
}

//创建高阶组件
const componentsTem=Template=>prop=>{
    return <Template {...data[prop.id]}></Template>
}
const FactoryCom=withLogCom(widthContent(comp))

@withLogCom
@widthContent
class Comp2 extends React.Component{
    render(){
        return <div>{this.props.title}----{this.props.name}</div>
    }
}
export default function HocTest() {
    return (
        <div>
            {/* {[0,0,0].map((item,index)=>(<FactoryCom id={index} key={index}></FactoryCom>))} */}
            {[0,0,0].map((item,index)=>(<Comp2 id={index} key={index}></Comp2>))}
        </div>
    )
}
