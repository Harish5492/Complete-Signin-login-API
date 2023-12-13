const mongoose = require('mongoose')

const OTP = new mongoose.Schema({
  phoneNumber: { type: Number, required:false [ "Phone Number is Required"] },
  email: { type: String, unique: true, required: [true, "User email is Required"] },
  otp : { type: String, required: [true, ] },
  created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OTPgeneration', OTP)