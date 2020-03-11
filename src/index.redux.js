// import { createStore } from 'redux';
//根据老的state和action 生成新的state
const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';

export const counter = (state = 0, action) => {
    switch (action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return 10;
    };
};

export const addGun = () => {
    return { type: ADD_GUN };
};

export const removeGun = () => {
    return { type: REMOVE_GUN };
};

export const addGunAsync = () => {  //dispatch异步的函数
    //thunk插件的作用，这里可以返回函数
    return dispatch => {
        setTimeout(() => {
            dispatch(addGun());
        }, 2000);
    };
};

// //新建store
// const store = createStore(counter);

// const init = store.getState();
// console.log(init);
// //状态订阅 更新通知
// const listener = () => {
//     const current = store.getState();
//     console.log(`现在有机枪${current}把`);
// };
// store.subscribe(listener);

// //派发事件 传递action
// store.dispatch({ type: '加机关枪' });
// console.log(store.getState());