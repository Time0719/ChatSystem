import Axios from 'axios';


const USER_LIST = 'USER_LIST';
const initState = {
    userlist: [{
        _id: 0,
        title: '',
        avatar: '',
        user: '',
        desc: ''
    }]
};

export const chatuser = (state = initState, action) => {
    switch (action.type) {
        case USER_LIST:
            return { ...state, userlist: action.payload }
        default:
            return state;
    }
};

const userList = (data) => {
    return { type: USER_LIST, payload: data }
};

export const getUserList = (type) => {
    return dispatch => {
        Axios.get('/user/list?type=' + type)
            .then(res => {
                if (res.data.code === 0) {
                    dispatch(userList(res.data.data));
                }
            });
    }
};