/**
 * Created by AnshumanTripathi on 4/21/17.
 */
var mongoose = require('mongoose');
var schema = require('./schema');
var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789";
var base = alphabet.length;
var Q = require('q');
var config = require('./config');
mongoose.connection.on('open', function (ref) {
    console.log('Connected to Mongo Server ' + ref);
});

mongoose.connection.on('error', function (err) {
    console.log('Error occured connecting to DB: ' + err);
});

exports.shorten = function (req, res) {
    var longUrl = req.body.url;
    var jsonResponse = {};

    encode(longUrl.length).then(function (encodedUrl) {

        schema.findOne({"actualUrl": longUrl})
            .then(function (result) {
                if (result) {
                    jsonResponse.statusCode = 200;
                    jsonResponse.shortenedUrl= result.shortenedUrl;
                    jsonResponse.actualUrl = result.actualUrl;
                    res.send(jsonResponse);
                } else {
                    var newUrl = schema({
                        "shortenedUrl": encodedUrl,
                        "actualUrl": longUrl
                    });

                    newUrl.save()
                        .then(function (result) {
                            jsonResponse.statusCode = 200;
                            jsonResponse.shortenedUrl = result.shortenedUrl;
                            jsonResponse.actualUrl = result.actualUrl;
                            res.send(jsonResponse);
                        })
                        .catch(function (err) {
                            jsonResponse.statusCode = 500;
                            jsonResponse.error = err;
                            res.send(jsonResponse);
                        });
                }
            })
            .catch(function (err) {
                jsonResponse.statusCode = 500;
                jsonResponse.error = err;
                res.send(jsonResponse);
            });
    });
};

exports.getAll = function (req,res) {
     var jsonResponse = {};
    schema.find({},function (err, urls) {
        if(err){
            console.log("Error Occured while fetching all urls from server: "+err);
            jsonResponse.statusCode = 500;
            jsonResponse.error = err;
        } else if(urls.length > 0){
            jsonResponse.statusCode = 200;
            jsonResponse.urls = urls;
        }
        res.send(jsonResponse);
    });
};

function encode(num) {

    var deferred = Q.defer();

    var encoded = "";
    while (num) {
        var rem = num % base;
        num = Math.floor(num / base);
        encoded += alphabet[rem].toString();
    }

    encoded = config.webhost + encoded;
    console.log("Encoded value: " + encoded);

    deferred.resolve(encoded);

    return deferred.promise;
}