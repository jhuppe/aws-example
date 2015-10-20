var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    AWS = require('aws-sdk'),
    port = 9090;


var ImageCtrl = require('./controllers/ImageCtrl');

app.use(express.static(__dirname + '/public/'));
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));




//AMAZON S3
app.get('/images', ImageCtrl.get);
app.post('/images', ImageCtrl.create);



var mongoURI = 'mongodb://localhost/AWSpractice'

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
    console.log('database :', mongoURI)
})

app.listen(port, function() {
    console.log('listening on port', port);
})