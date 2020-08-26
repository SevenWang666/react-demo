import React, { Component } from 'react'
import {Button,Input} from 'antd'
import Item from 'antd/lib/list/Item'


function formCreate(Comp){
    return class extends React.Component{
        constructor(props){
            super(props)
            this.options={}
            this.state={}
            this.getFieldDec=this.getFieldDec.bind(this)
            this.validateField=this.validateField.bind(this)
        }
        validateFields=(callback)=>{
            const flag= Object.keys(this.options).every(field=>{
               return  !this.validateField(field)
            })
            callback(flag,this.state)
        }
        validateField(field){
            //校验规则的获取
            const {rules} = this.options[field]
            //校验规则的值
            let ret=rules.some(rule=>{
                if(rule.required){
                    if(!this.state[field]){
                        this.setState({[field+'message']:rule.message})
                        return true
                    }
                }
                this.setState({[field+'message']:''})
                return false 
            })
           return ret
           
        }
        handleChange=(e)=>{
            const {name,value} = e.target
            this.setState({[name]:value},()=>{
                this.validateField(name)
            })
        }
        getFieldDec(field,option){
            this.options[field] = option
            return template=>{
                return (<div>
                  {React.cloneElement(template,{value:this.state[field],name:field||'',onChange:this.handleChange})}
                <div>{this.state[field+'message']&&(<p style={{color:'red'}}>{this.state[field+'message']}</p>)}</div>
                </div>)
            }
        }
        render(){
            return <Comp {...this.props} getFieldDec={this.getFieldDec} validateFields={this.validateFields}></Comp>
        }
    }
}
@formCreate
class KFormTest extends Component {

    validateFields=()=>{
    this.props.validateFields((flag,data)=>{
        if(flag){
            alert('login')
        }else{
            alert('fail')
        }
      })
    }
    render() {
        const {getFieldDec} = this.props
        return (
            <div>
                {getFieldDec("user",{rules:[{required:true,message:'请输入用户'}]})(<Input type="text"/>)}
                {getFieldDec("password",{rules:[{required:true,message:'请输入密码'}]})(<Input type="password"/>)}
                <Button onClick={this.validateFields}>登录</Button> 
            </div>
        )
    }
}

export default KFormTest