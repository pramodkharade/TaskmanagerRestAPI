
const dowWork =async ()=>{
    return "Pramod Kharade"
}

dowWork().then((result)=>{
    throw new Error('Something went wrong');
    console.log('Result is: ',result);
}).catch((e)=>{
    console.log('Error is: ',e);
});