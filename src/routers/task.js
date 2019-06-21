const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/task');
const router = express.Router();

router.post('/tasks',auth, async (req,res)=>{
    //const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner:req.user._id
    });
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
});
router.get('/tasks',auth,async(req,res)=>{
    try{
        //const tasks = await Task.find({owner:req.user._id});
        const tasks = await req.user.populate('tasks').execPopulate();
        res.status(200).send(req.user.tasks);
    }catch(e){
        res.status(500).send();
    }
});
router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params;
    try{
       const task = await Task.findOne({_id,owner:req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});
router.patch('/tasks/:id',auth, async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description","completed"];
    const isValidateOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    });
    if(!isValidateOperation){
        return res.status(400).send({"error":"invalid update"});
    }
    try{
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id});
        console.log(task);
        if(!task){
            return res.status(404).send();
        }
        updates.forEach((update)=>{
            task[update] = req.body[update];
        });
        await task.save();
        res.send(task);
    }catch(e){
        res.status(400).send(e);
    }
});
router.delete('/tasks/:id',async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});
module.exports = router;