const {MongoClient , ObjectID} = require('mongodb');

const connectionURL = 'mongodb+srv://taskAppDnyanda:<password>@cluster0-cmwlp.mongodb.net/task-manager?retryWrites=true&w=majority';
const databaseName ='task-manager';
MongoClient.connect(connectionURL,{ useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect database');
    }
    const db = client.db(databaseName);
    
  db.collection('users')
  .deleteMany({age:27})
  .then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    });
    
    // console.log('connected correctly');
});