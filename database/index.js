const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('../config/mongodb');

const connect = () => {
    console.log('Call connect to database');

    return new Promise((resolve, reject) => {

        MongoClient.connect(config.url, config.option, (err, client) => {
            try {
                if (err) {
                    console.log(`Can't connect to database with config`, config.toString());
                    reject(err);
                } else {
                    resolve(client);
                }
            }
            catch (err) {
                console.log(`Can't connect to database ${err.toString()}`);
                reject(err);
            }
        });
    })
}

const find = (db, collection) =>{
    return new Promise((resolve, reject) => {
        try{
            db.collection(collection).find().toArray((err, result)=>{
                return (err || !result) ? resolve(null) : resolve(result);
            })
        }catch(err){
            reject(err);
        }
    })
}

const findOne = (db, collection, query, options = {}) => {
    return new Promise((resolve, reject) => {
        try{
            db.collection(collection).findOne(query, options, (err, result)=>{
                return (err || !result) ? resolve(null) : resolve(result);
            });
        }catch(err){
            reject(err);
        }
    })
}
module.exports = {
    connect,
    find,
    findOne
};