require('../src/db/mongoose');
const User = require('../src/models/user');
//

User.findByIdAndUpdate('5d070df5e697631eb08d804c',{ age:1})
.then((user)=>{
    console.log(user);
    return User.countDocuments({age:1});
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});