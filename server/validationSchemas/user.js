const Joi = require('joi')

const validationSchema = Joi.object().keys({
  name : Joi.string(),
  email : Joi.string().email().required().error( err => { err[0].message= "Invalid email!"; return err; } ),

  password : Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required()
  .error(err=>{
     err[0].message= 'must be between 6-16 characters, have at least one capital letter, one lowercase letter, one digit, and one special character' 
     return err 
    })
  
})

const validateUser=(name,email,password)=>{

const {error}=validationSchema.validate({ name, email, password })   
if(error)
throw new Error(error.message) 

}
module.exports = { validateUser }
