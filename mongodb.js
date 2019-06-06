const {MongoClient , ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName ='task-manager';
const id = new ObjectID();
console.log('ID Is: ',id);
console.log('TimeStamp: ',id.getTimestamp());
MongoClient.connect(connectionURL,{ useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect database');
    }
    const db = client.db(databaseName);
    db.collection('users').insertOne({
        _id:id,
        name:'Dnyanda Kharade',
        age:1
    });
    // db.collection('users')
    // .insertMany([
    //     {name:'Shital Bari',age:29}
    //     ,{name:'Kishor Vitekar',age:30}
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('unable to insert Users..!');
    //     }
    // });
    // db.collection('tasks')
    // .insertMany([
    //     {description:'Clanning the house',completed:true},
    //     {description:'Pot to plants',completed:false},
    //     {description:'Servicing the Bike',completed:false}
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('unable to insert tasks..!');
    //     }
    //     console.log(result.ops);
    // });
    
    
    // console.log('connected correctly');
});