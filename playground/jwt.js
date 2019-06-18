const jwt = require('jsonwebtoken');

const jsonTokenGeneration = async() =>{
    const token = jwt.sign({_id:1231234123},'thisisnewnodejslogin',{ expiresIn:'7 days'});
    console.log(token);
    /*******To verify the token******/
    const data = jwt.verify(token,'thisisnewnodejslogin');
    console.log(data);
}
jsonTokenGeneration();