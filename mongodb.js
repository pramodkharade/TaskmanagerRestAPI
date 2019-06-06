const {MongoClient , ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName ='task-manager';
MongoClient.connect(connectionURL,{ useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect database');
    }
    const db = client.db(databaseName);
    
    db.collection('users').findOne({_id: new ObjectID("5cf7a76e6ff0a27c8c1ced5b")},(error,user)=>{
        if(error){
            return console.log('Unable to find user');
        }
        console.log(user);
    });
    db.collection('users').find({ age:30}).toArray((error,users)=>{
        if(error){
            return console.log('Unable to find users');
        }
        console.log(users);
    });
    db.collection('users').find({ age:30}).count((error,count)=>{
        if(error){
            return console.log('Unable to find users count');
        }
        console.log(count);
    });
    // console.log('connected correctly');
});