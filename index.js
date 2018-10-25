var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
}).listen(3000);

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.post('/about', urlencodedParser, function (req, res) {
    console.log(req.body);
    if (!req.body) {
        return res.sendStatus(400);
    }

    res.render('about-success', { data: req.body });
    // res.send('welcome, ' + req.body.username)
});

app.get('/news/:id?', (req, res) => {
    console.log(req.params.id);
    
    var obj = { paragraphs: ['A', 'B', 'C'] };
    res.render('news', { newsID: req.params.id, obj: obj });
});

// app.get('/news', (req, res) => {
//     res.render('news');
// });

// var check = require('syntax-error');
// var fs = require('fs');

// var file = __dirname + '/views/news.ejs';
// var src = fs.readFileSync(file);

// var err = check(src, file);
// if (err) {
//     console.error('ERROR DETECTED' + Array(62).join('!'));
//     console.error(err);
//     console.error(Array(76).join('-'));
// }