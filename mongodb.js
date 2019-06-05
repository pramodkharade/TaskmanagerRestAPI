const mogodb = require('mongodb');
const mongoClient = mogodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName ='task-manager';
mongoClient.connect(connectionURL,{ useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect database');
    }
    const db = client.db(databaseName);
    db.collection('users').insertOne({
        name:'Pramod Kharade',
        age:30
    });
    
    console.log('connected correctly');
});