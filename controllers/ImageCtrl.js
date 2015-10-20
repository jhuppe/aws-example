var Image = require('../models/ImageModel');
var AWS = require('../services/AmazonService');


module.exports.get = function(req, res) {
    Image.find({}, function(err, data) {
        if (err) {
            console.log(err)
        }
        res.send(data);
    })
}

module.exports.create = function(req, res) {
    
    var buf = new Buffer(req.body.fileBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    var fileObj = {
        name: req.body.fileName,
        body: buf,
        type: req.body.fileType
    }
    
    AWS.uploadToS3(fileObj, function(err, data){
        if (err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            new Image({ imageUrl : data.Location })
            .save(function(err, image) {
                if (err) {
                    console.log(err)
                    res.status(500).send(err)
                } else {
                    res.send(image)
                }
            })
        }
    })
}




