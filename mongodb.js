const {MongoClient , ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName ='task-manager';
MongoClient.connect(connectionURL,{ useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect database');
    }
    const db = client.db(databaseName);
    
  db.collection('users').updateOne({_id: new ObjectID("5cf7a76e6ff0a27c8c1ced5b")},{
        $inc:{
            age:-3
        }
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    });
    
    // console.log('connected correctly');
});