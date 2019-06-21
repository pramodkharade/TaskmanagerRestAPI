const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid.');
            }
        }
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can\'t contain "password"');
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be postive number');
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
});
/***Mapping user with task**/
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},'thisisnodejsrestapi');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}
 userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({email:email});
    
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("Unable to login");
    }
    
    return user;
}
/********
 * Hash the plain text password before saving 
 * 
 * ********/
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
});
/**********
 *  Delete the user task when user is removed
 * *
 * *
 * *********/
userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({owner:user._id});
    next();
});
const User = mongoose.model('User',userSchema);

module.exports = User;