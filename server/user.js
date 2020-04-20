const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = { 'pwd': 0, '__v': 0 };
// Chat.remove({}, (e, d) => {});

Router.get('/list', (req, res) => {
    const { type } = req.query;
    // User.remove({}, (e, d) => { });
    User.find({ type }, (err, doc) => {
        return res.json({ code: 0, data: doc });
    });
});

Router.get('/getmsglist', (req, res) => {
    const user = req.cookies.userid;  //从cookies获取全部用户信息
    User.find({}, (err, userdoc) => {
        let users = {};
        userdoc.forEach(v => {  //返回用户名和头像
            users[v._id] = { name: v.user, avatar: v.avatar };
        });
        Chat.find({ '$or': [{ from: user, to: user }] }, (err, doc) => {
            if (!err) {
                return res.json({ code: 0, msgs: doc, users: users });
            }
        });
    });
});

Router.post('/readmsg', (req, res) => {
    const userid = req.cookies.userid;
    const { from } = req.body;
    console.log(userid,from);
    Chat.update({ from, to: userid }, { '$set': { read: true } }, { 'multi': true }, (err, doc) => {
        console.log(doc);
        //doc n总共有几条数据 nmodified修改了几条数据 ok修改成功了几条
        if (!err) {
            return res.json({ code: 0, num: doc.nModified });
        }
        return res.json({ code: 1, msg: '修改失败' });
    });
});

Router.post('/update', (req, res) => {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.json.dumps({ code: 1 });
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, (err, doc) => {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        return res.json({ code: 0, data });
    });
});

Router.post('/login', (req, res) => {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名或者密码错误' });
        }
        res.cookie('userid', doc._id);
        return res.json({ code: 0, data: doc });
    });
});

Router.post('/register', (req, res) => {
    const { user, pwd, type } = req.body;
    User.findOne({ user }, (err, doc) => {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' });
        }
        const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
        userModel.save((e, d) => {
            if (e) {
                return res.json({ code: 1, msg: '后端出错了' });
            }
            const { user, type, _id } = d;
            res.cookie('userid', _id);
            return res.json({ code: 0, data: { user, type, _id } });
        });
    });
});

Router.get('/info', (req, res) => {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1 });
    }
    User.findOne({ _id: userid }, _filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' });
        }
        if (doc) {
            return res.json({ code: 0, data: doc });
        }
    });
});

const md5Pwd = (pwd) => {
    const salt = 'good_3957x8yza6!@#IUHJh~~';
    return utils.md5(utils.md5(pwd + salt));
};

module.exports = Router;