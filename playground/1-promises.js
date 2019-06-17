import { Promise } from "mongoose";

const dowWorkPromise = new Promise((resolve,reject)=>{
    setInterval(()=>{
        resolve([1,3,4]);
        //reject('Things went wrong');
    },2000);
});

dowWorkPromise.then((result)=>{
    console.log('Sucess!',result);
}).catch((error)=>{
    console.log('Error',error);
});