const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt'); //for match the password in authenticateUser

function initializer(passport,getNamebyEmail,getNamebyId){
    const authenticateUser = async (email, password, done) => {
        const fname= getNamebyEmail(email) //user define function
        if(fname==null){
            return done(null,false, { message: "Wrong Email !!"})//first param is error , 2nd is user found, 3rd erro message
        }
        try{
            if(await bcrypt.compare(password,fname.password)){//1st which user enter of authenticateUser , 2nd original password of user
                return done(null,fname);
            }
            else{
                return done(null,false, { message: "Password Incorrect !!"});//first param is error , 2nd is user found, 3rd erro message
            }
        }
        catch(e){
            return done(e);
        }
    }

    passport.use(new localStrategy({ usernameField: 'email' },authenticateUser));

    passport.serializeUser((fname,done )=> done(null,fname.id))
    passport.deserializeUser((id,done )=>{
        return done(null,getNamebyId(id))
    })
}

module.exports = initializer