import { combineReducers} from 'redux';
import { user } from './redux/user.redux';
import { chatuser } from './redux/chatuser.redux';
import { chat } from './redux/chat.redux';


export default combineReducers({ user, chatuser, chat });


//迷你redux实现
// export const createStore = (reducer,enhancer) => {
//     let currentState = {};
//     let currentListeners = [];

//     const getState = () => currentState;

//     const subscribe = (listener) => {
//         currentListeners.push(listener);
//     };

//     const dispatch = (action) => {
//         currentState = reducer(currentState, action);
//         currentListeners.foeEach(v => v());
//         return action;
//     };

//     dispatch({ type: '@IMOOC/WONIU-REDUX' });
//     return { getState, subscribe, dispatch };  
//     getState 直接返回状态，subscribe 做订阅，dispatch调用reducer根据旧的状态和action生成新的State然后把createStore每行都执行
// };

//1.负责接受一个组件，把state里的一些数据放进去，返回一个组件
//2.数据变化的时候，能够通知组件
// export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {  //双层函数(高级函数)
//     return class ConnectComponent extends React.Component {
//         static contextTypes = {
//             store: checkPropTypes.object
//         };
//         constructor(props, context) {
//             super(props, context);
//             this.state = {
//                 props: []
//             };
//         };
//         componentDidMount() {
//             const { store } = this.context;
//             store.subscribe(() => this.update());
//             this.update();
//         };
//         update() {
//             const { store } = this.context;
//             const stateProps = mapStateToProps(store.getState());
//             const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
//             this.setState({
//                 props: {
//                     ...this.state.props,
//                     ...stateProps,
//                     ...dispatchProps
//                 }
//             });
//         };
//         render() {
//             return <WrapComponent {...this.state.props}></WrapComponent>
//         };
//     }
// }
//connect(mapStateToProps = state => state, mapDispatchToProps = {})(WrapComponent)  //双层传参及调用（柯里化）

// const bindActionCreators = (creator, dispatch) => {  //不需要中间件的函数
//     return (...args) => dispatch(creator(...args));
// };

// export const bindActionCreators = (creator, dispatch) => {
//     return Object.keys(creators).reduce((ret, item) => {
//         ret[item] = bindActionCreators(creator[item], dispatch);
//         return ret;
//     }, {});
// };

// export const applyMiddleware = (...middlewares) => {  //想加入中间件机制，就需要到applyMiddleware函数 
//     return createStore => (...args) => {
//         const store = createStore(...args);
//         let dispatch = store.dispatch;

//         const midApi = {
//             getState: store.getState,
//             dispatch: (...args) => dispatch(...args)
//         }
//         const middlewareChain = middlewares.map(middleware => middleware(midApi));
//         dispatch = compose(...middlewareChain)(store.dispatch);
//         return {
//             ...store,
//             dispatch
//         }
//     };
// };

// const think = ({ dispatch, getState }) => next => action => {  //创建redux-thunk
//     if (typeof action === 'function') {
//         return action(dispatch, getState);
//     }
//     return next(action);
// }
// export default thunk;

// let obj = { name: 1 };  //检测页面性能
// let obj1 = { name: 1 };
// const compareObj = (obj1, obj2) => {
//     if (obj1 === obj2) {
//         return true;
//     }
//     if (Object.keys(obj1).length !== Object.keys(obj2).length) {
//         return false;
//     }
//     for (let k in obj1) {
//         if (obj1[k] !== obj2[k]) {  //react建议，只做浅层对比
//             return false
//         }
//         return true
//         // if (typeof obj1[k] === 'object') {
//         //     return compareObj(obj1[k], obj2[k]);  //递归(递归对比，复杂度太高，不可接受)
//         // } else if (obj1[k] !== obj2[k]) {         
//         //     return false
//         // }
//         // return true
//     }
// };
// console.log(compareObj(obj, obj1));

// import { Map } from 'immutable';  //immutable库的使用
// let obj = Map({ 'name': 1, 'course': 'time' });
// let obj1 = Map({ 'name': 1, 'course': 'time' });
// console.log(obj.get('course') === obj1.get('course'));  //get直接取出变量作比较
// console.log(is(obj, obj1)); //is直接比较两个对象是否相等