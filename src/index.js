const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.post('/users',(req,res)=>{
    const user = new User(req.body);
    user.save()
        .then(()=>{
            res.send(user);
            console.log(user);
        })
        .catch((error)=>{
            res.send(error);
            console.log('Error is: ',error);
        });
    
});

app.listen(port,()=>{
    console.log('Server is running on :',port);
});