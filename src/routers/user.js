const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
router.post('/users', async(req,res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({user,token});
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
router.get('/users',auth,async (req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).send(users);
    } catch(e){
        res.status(500).send();
    }
});
router.post('/users/logout',auth,async(req,res)=>{
  try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
  }catch(e){
    res.status(500).send();
  }  
});
router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
});
router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user);
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
router.patch('/users/me',auth, async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name","email","age","password"];
    const isValidateOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    });
    if(!isValidateOperation){
        return res.status(400).send({"error":"invalid update"});
    }
    try {
        updates.forEach((update)=>{
            req.user[update] = req.body[update];
        }) ;
        await req.user.save();
       // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        
        res.send(req.user);
    }catch(e){
        res.status(400).send(e);
    }
});
router.delete('/users/me',auth,async(req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user){
        //     res.status(404).send();
        // }
        req.user.remove();
        res.send(req.user);
    }catch(e){
        res.status(500).send();
    }
});
const upload = multer({
    dest:'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        ///!file.originalname.endsWith('.pdf')
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)){
           return cb(new Error('Please Upload a image '));
        }
        cb(undefined,true);
    }
});
router.post('/users/me/avatar',upload.single('avatar'),(req,res)=>{
    res.send('uploaded');
},(error,req,res,next)=>{
    res.status(400).send({error:error.message});
});
module.exports = router;