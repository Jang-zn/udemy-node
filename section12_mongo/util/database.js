const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoClient = (callback)=>{
    MongoClient.connect('mongodb+srv://study:OiBulOXAW4jRC6tT@cluster0.nfeomio.mongodb.net/?retryWrites=true&w=majority')
    .then(client=>{
        console.log('Connected to MongoDB');
        _db = client.db();
        callback();
    })
    .catch(err=>{
        console.log(err);
        throw err;
    });
}

const getDB = ()=>{
    if(_db){
        return _db;
    }
    throw 'No Database Connection';
}

exports.mongoClient = mongoClient;
exports.getDB = getDB;
