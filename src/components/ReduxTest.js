import React, { Component } from 'react'
import store from "../store/reduxIndex.js"

export default class ReduxTest extends Component {
    componentDidMount(){
        store.subscribe(()=>{
            this.forceUpdate()
        })
    }
    render() {
        return (
            <div>
                {store.getState()}
                <button onClick={()=>{store.dispatch({type:'add'})}}>加一 </button>
            </div>
        )
    }
}
