import {observable,computed,action,runInAction,autorun} from 'mobx'


export default class Store{
    @observable  selected;
    @observable unSelected;

    constructor(){
        this.unSelected = 'obj';
        this.selected = 1
    }
    @computed get getSelected(){
        return this.selected
    }
    @action setSelected(value){
        console.log(this.selected)
        this.selected++
    }
    
}

var appState = observable({
    timer: 0
});
appState.resetTimer = action(function reset() {
    appState.timer = 0;
});
autorun(function() {
    console.log('已改变状态')
    console.log(appState.timer)
});

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);

export {appState}