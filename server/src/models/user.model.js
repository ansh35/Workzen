const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim : true
        },
        email:{
            type: String,
            required : true,
            unique : true,
            lowercase : true
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type : String,
            enum: ["admin","member"],
            default:"member"
        },
        // reset password feilds

       resetPasswordToken: String,
       resetPasswordExpire: Date,
    },
    { timestamps : true}
);
 // Hash password before saving the user
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate reset token 
userSchema.methods.getResetPasswordToken = function(){
 const resetToken = crypto.randomBytes(20).toString("hex");
 this.resetPasswordToken = crypto 
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
 this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes 
    return resetToken; 
};


module.exports = mongoose.model("User",userSchema);