require('../src/db/mongoose');

const Task = require('../src/models/task');
const main = async () =>{
    const task = await Task.findById('5d0b55c84f3ced53a5e52855');
   await task.populate('owner').execPopulate();
    console.log(task.owner);
}
main();