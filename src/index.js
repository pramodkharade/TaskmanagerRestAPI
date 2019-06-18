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