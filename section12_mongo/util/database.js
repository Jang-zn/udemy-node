const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongoClient = (callback)=>{
    MongoClient.connect('mongodb+srv://study:OiBulOXAW4jRC6tT@cluster0.nfeomio.mongodb.net/?retryWrites=true&w=majority')
    .then(client=>{
        console.log('Connected to MongoDB');
        //connect를 callback에 반환
        callback(client);
    })
    .catch(err=>console.log(err));
}

module.exports = mongoClient;
