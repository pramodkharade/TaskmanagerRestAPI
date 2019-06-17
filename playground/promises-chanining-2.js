require('../src/db/mongoose');
const Task = require('../src/models/task');
//

Task.findByIdAndDelete('5cfa3e567c821e43a6e85536',{ completed:false})
.then((task)=>{
    console.log(task);
    return Task.countDocuments({completed:false});
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});