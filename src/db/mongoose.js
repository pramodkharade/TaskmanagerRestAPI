const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
                    {
                        useNewUrlParser:true,
                        useCreateIndex:true
                    });
const User = mongoose.model('User',{
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
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
    }
});

const me  = new User({
    name:' Pramod Kharade',
    email:' PRAMOD.KHARADE@blazeClan.com ',
    password:'Pramod@1234'
});

// me.save()
//   .then(()=>{
//       console.log('Result is: ',me);
//   })
//   .catch((error)=>{
//     console.log('error is: ',error);
//   });

  const Task = mongoose.model('Task',{
      description:{
          type:String,
          require:true,
          trim:true
      },
      completed:{
          type:Boolean,
          default:false
      }
  });
const task = new Task({
    description:" Revap the regisration flow ",
    
});

task.save()
.then((taskResult)=>{
 console.log('Task is:',taskResult);
})
.catch((error)=>{
    console.log('error',error);
});