const bcrypt = require('bcrypt');
const model = require('../models/model');
require('dotenv').config();
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);
const sgMail = require('@sendgrid/mail');
const CryptoJS = require("crypto-js");
const OTPKEY = process.env.OTPKEY
const VERIFYKEY = process.env.VERIFYKEY


class OtpHelper {
  checkSource(source) {
    console.log("source", source)
    const emailReg =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (/^\d{10}$/.test(source)) {
      return 'phoneNumber';
    } else if (emailReg.test(source)) {
      return 'email';
    }
    return 'userName';
  }

  async checkEmail(email) {
    console.log("inside checkEmail")
    if (!email) return false
    const userData = await model.findOne({ email: email }, 'userName email').exec();
    if (!userData) return false
    return true;
  }

  genrateRandamNo  () {
    return Math.floor(1000 + Math.random() * 9000);
  }

  async encryptOTP(otp) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(otp.toString(), salt);
  }

 generateOtpToken(encData){
   let token = CryptoJS.AES.encrypt(JSON.stringify(encData), OTPKEY).toString();
   return token
  }

  decryptOtpToken(token){
  
    let bytes = CryptoJS.AES.decrypt(token, OTPKEY);
    let check = (bytes.toString(CryptoJS.enc.Utf8));
    console.log("CHECK IS",check)
    if(!check) throw "invalid token"
    let decryptedData = JSON.parse(check)
    console.log("DATA IS ",decryptedData)
    return decryptedData
  } 
   verifydecryptOtpToken(token){
  
    let bytes = CryptoJS.AES.decrypt(token, VERIFYKEY);
    let check = (bytes.toString(CryptoJS.enc.Utf8));
    console.log("CHECK IS ",check)
    if(!check) throw "invalid token"
    let decryptedData = JSON.parse(check)
    console.log("DATA IS ",decryptedData)
    return decryptedData
  }

 verifytoken(encData){
      let Token = CryptoJS.AES.encrypt(JSON.stringify(encData), VERIFYKEY).toString();
      return Token
 }
  
  sendOTPOnMobile(otp) {
    client.messages
      .create({
        body: `Your OTP is ${otp}`,
        from: '+12058283986',
        to: '+918872512811'
      })
  }

  async sendOTPOnEmail(otp) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'harishrana5492@gmail.com',
      from: 'rana5492@gmail.com',
      subject: 'OTP for Re-generate Password',
      text: 'Your OTP',
      html: `<strong>Your OTP is ${otp} Please Use it carefully</strong>`,
    }
    await sgMail.send(msg);
  }

}

module.exports = new OtpHelper();