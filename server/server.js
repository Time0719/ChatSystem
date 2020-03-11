const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'webapp'
});

connection.connect();

connection.query('SELECT * from users', (err, data, fields) => {
    if (err) {
        console.log(err);
        return;
    };

    app.get('/data', (req, res) => {
        res.json(data);
    });
});

connection.end();

//res.send返回文本 res.json返回json res.rendfile返回文件
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.listen(9093, () => {
    console.log('Node app start at port 9093');
});