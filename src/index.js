const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();
const port = process.env.PORT || 3000;
/******To disabled GET request******/
// app.use((req, res, next) => {
//     if (req.method == 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// });
/******maintenance Mode******/
// app.use((req, res, next) => {
//     res.send('site is currently down. check back soon!');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is running on :', port);
});

/*********
 * // get task id with user details
const Task = require('./models/task');
const main = async () =>{
    const task = await Task.findById('5d0b55c84f3ced53a5e52855');
    await task.populate('owner').execPopulate();
    console.log(task);
}
main(); *****/

const Task = require('./models/task');
const User = require('./models/user');
const main = async () =>{
    const user = await User.findById('5d0b4a7c6aeaab4c7faf380b');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
}
main();