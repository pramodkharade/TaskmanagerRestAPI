const bcrypt = require('bcrypt');

const passwordBcrypt = async()=>{
    const passwrod ='Blazeclan@2020';
    const hashedpassword = await bcrypt.hash(passwrod,8);

    console.log(passwrod);
    console.log(hashedpassword);
    const isMatch = await bcrypt.compare('Blazeclan@2020',hashedpassword);
    console.log(isMatch);
}
passwordBcrypt();