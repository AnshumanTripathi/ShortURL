/**
 * Created by AnshumanTripathi on 4/21/17.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    autoincrement = require('mongoose-auto-increment');

autoincrement.initialize(mongoose.connection);

var encodedUrlSchema = new schema({
    "_id": {type: Number, required: true},
    "shortenedUrl": {type: String, required: true},
    "actualUrl": {type: String, required: true}
}, {
    collection: "urlEncoding"
});

encodedUrlSchema.plugin(autoincrement.plugin,'encodedUrl');

var encodedURl = mongoose.model('encodedUrlSchema', encodedUrlSchema);

module.exports = encodedURl;