const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
                    {
                        useNewUrlParser:true,
                        useCreateIndex:true,
                        useFindAndModify:false
                    });


// const me  = new User({
//     name:' Pramod Kharade',
//     email:' PRAMOD.KHARADE@blazeClan.com ',
//     password:'Pramod@1234'
// });

// me.save()
//   .then(()=>{
//       console.log('Result is: ',me);
//   })
//   .catch((error)=>{
//     console.log('error is: ',error);
//   });

  
