/**
 * Created by eddy on 14-12-16.
 */
var express = require('express')
var app = express()

app.use(express.static('www'));

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.post('/store', function (req, res) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})