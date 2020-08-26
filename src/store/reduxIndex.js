import {createStore} from 'redux'


const counterReducer = function(state=0,action){
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
const store = createStore(counterReducer)

export default store