require('../src/db/mongoose');
const Task = require('../src/models/task');
//

// Task.findByIdAndDelete('5cfa3e567c821e43a6e85536',{ completed:false})
// .then((task)=>{
//     console.log(task);
//     return Task.countDocuments({completed:false});
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
// });

const deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false});
    return count;
}
deleteTaskAndCount('5d072ec91970534bc0eb045f').then((result)=>{
    console.log('result is:',result);
}).catch((e)=>{
    console.log('error:',e);
});