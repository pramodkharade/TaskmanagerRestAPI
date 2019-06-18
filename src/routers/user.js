const express = require('express');
const User = require('../models/user');
const router = express.Router();
router.post('/users', async(req,res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        res.status(200).send(user);
    } catch(error){
        res.status(400).send(error);
    }
    // user.save()
    //     .then(()=>{
    //         res.status(200).send(user);
    //     })
    //     .catch((error)=>{
    //         res.status(400).send(error);
    //     });
    
});
router.post('/users/login',async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    }catch(e){
        res.status(404).send();
    }
});
router.get('/users',async (req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).send(users);
    } catch(e){
        res.status(500).send();
    }
});
router.get('/users/:id', async(req,res)=>{
    const _id = req.params;
    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
    
});
router.patch('/users/:id', async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name","email","age","password"];
    const isValidateOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    });
    if(!isValidateOperation){
        return res.status(400).send({"error":"invalid update"});
    }
    try {
        const user = await User.findById(req.params.id);
        updates.forEach((update)=>{
            user[update] = req.body[update];
        }) ;
        await user.save();
       // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(400).send(e);
    }
});
router.delete('/users/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
});


module.exports = router;