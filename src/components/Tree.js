import React, { Component } from 'react'


class TreeNode extends Component{
    constructor(props){
        super(props)
        this.state={open:false}
    }
    get isFolder(){
        return this.props.data.children&&this.props.data.children.length>0
    }
    toggle =()=>{
        this.setState({open:!this.state.open})
    }
    render(){
        return (<div>
            <ul>
                <li> 
                    <div onClick={this.toggle}>
                        {this.props.data.title}
                        {this.isFolder?<span>{this.state.open?'-':'+'}</span>:''}
                    </div>
                    {this.isFolder? <div style={{display:this.state.open?'block':'none'}}>
                        {this.props.data.children.map(child=>(
                         <TreeNode data={child} key={child.title}></TreeNode>
                    ))}</div>:null}
                </li>
            </ul>
        </div>)
    }
}




export default class Tree extends Component {
    constructor(props){
        super(props)
        this.data={
            title:"水果",
            children:[
                {
                    title:'香蕉',  
                    children:[{
                            title:'香蕉子' 
                        }
                    ]
                },
                {
                    title:'苹果',
                    children:[
                        {
                            title:'苹果籽'
                        }
                    ]
                    
                },
                {
                    title:'西瓜'
                },
                {
                    title:"琉璃",
                    children:[
                        {
                            title:'琉璃灯'
                        }
                    ]
                }
            ]
        }
    }
    render() {
        return (
            <div>
                <TreeNode data={this.data}/>
            </div>
        )
    }
}
