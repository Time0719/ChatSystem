import Axios from 'axios';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USER_DATA = 'USER_DATA';
const initState = {
    isAuth: false,
    user: '李云龙',
    age: 20
};

export const auth = (state = initState, action) => {
    console.log(state, action);
    switch (action.type) {
        case LOGIN:
            return { ...state, isAuth: true };
        case LOGOUT:
            return { ...state, isAuth: false };
        case USER_DATA:
            return { ...state, user: action.payload[0].name, age: action.payload[0].age };
        default:
            return state;
    }
};

export const getUserData = () => {
    //dispatch用来通知数据修改
    return dispatch => {
        Axios.get('/data').then(res => {
            if (res.status === 200) {
                console.log(res.data);
                dispatch(userData(res.data));
            }
        });
    }
};

export const userData = (data) => {
    return { type: USER_DATA, payload: data };
};

export const login = () => {
    return { type: LOGIN };
};

export const logout = () => {
    return { type: LOGOUT };
};