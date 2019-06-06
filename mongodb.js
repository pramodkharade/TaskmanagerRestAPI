const {MongoClient , ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName ='task-manager';
MongoClient.connect(connectionURL,{ useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect database');
    }
    const db = client.db(databaseName);
    
    db.collection('users').findOne({name:'Dnyanda Kharade',age:1},(error,user)=>{
        if(error){
            return console.log('Unable to find user');
        }
        console.log(user);
    });
    // console.log('connected correctly');
});