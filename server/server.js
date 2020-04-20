const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./model');
const path = require('path');

const Chat = model.getModel('chat');
const app = express();
//配合express使用socket.io进行通信
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('sendmsg', (data) => {
        // console.log(data);
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
            // console.log(doc._doc);
            io.emit('recvmsg', Object.assign({}, doc._doc));
        });
    })
});


const userRouter = require('./user');
// 中间件
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use((req, res, next) => {  //build打包编译 设置白名单
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next();
    }
    return res.sendFile(path.resolve('build/index.html'));
});
app.use('/', express.static(path.resolve('build')));

server.listen(9093, () => {
    console.log('Node app start at port 9093');
});