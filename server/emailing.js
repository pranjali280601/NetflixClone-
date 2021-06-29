const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')


const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:process.env.SENDGRID_API
    }
}))
module.exports = {
    signUpEmail : function(user){
        transporter.sendMail({
            to:user.email,
            from:"pranjalsharma2806@gmail.com",
            subject:"Signup Success",
            html:"<h1>Welcome to Netflix</h1?"
        })
    },

    resetPswdEmail : function(user,token){
        console.log(token)
        transporter.sendMail({
            to:user.email,
            from:"pranjalsharma2806@gmail.com",
            subject:"Password Reset",
            html:`
            <p>A request for password reset has been generated from your account.</p>
            <h5>Click on this <a href="${process.env.EMAIL}/reset/${token}">Link</a> to reset password</h5>
            `
        })
    }
}
