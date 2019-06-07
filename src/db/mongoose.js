const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
                    {
                        useNewUrlParser:true,
                        useCreateIndex:true
                    });
const User = mongoose.model('User',{
    name:{
        type:String
    },
    age:{
        type:Number
    }
});

// const me  = new User({
//     name:'Pramod Kharade',
//     age:30
// });

// me.save()
//   .then(()=>{
//       console.log('Result is: ',me);
//   })
//   .catch((error)=>{
//     console.log('error is: ',error);
//   });

  const Task = mongoose.model('Task',{
      description:{
          type:String
      },
      completed:{
          type:Boolean
      }
  });
const task = new Task({
    description:" Cleaning the code",
    completed:false
});

task.save()
.then((taskResult)=>{
 console.log('Task is:',taskResult);
})
.catch((error)=>{
    console.log('error',error);
});