const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const schema=mongoose.Schema;

const userSchema=new schema({
    fullName:{type:String},
    email:{type:String},
    password:{type:String},
    mobileNumber:{type:Number},
    userType:{type:String,
                enum:["USER","ADMIN","OWNER"],
                default:"USER"
            },
    status:{
        type:String,
        enum:["ACTIVE","DELETE,BLOCK"],
        default: "ACTIVE"
    }
});
module.exports=mongoose.model('user',userSchema);

mongoose.model("user", userSchema).findOne({ userType: "OWNER" }, (error, result) => {
    if (error) {
        console.log("Internal server error");
    } else if (result) {
        console.log("ADMIN or OWNER already exist");
    } else {
        var obj = {
            firstName: "kapil",
            lastName: "sahu",
            email: "kapilsahu081098@gmail.com",
            mobileNumber: "8318906037",
            countryCode: "+91",
            userName: "kapil6037",
            password: bcrypt.hashSync("12345"),
            address: " U.P.",
            dateOfBirth: "08/10/1998",
            userType: "OWNER",
        }
        mongoose.model("user", userSchema).create(obj, (error, result) => {
            if (error) {
                console.log("Internal server error");
            }
            else {
                console.log("OWNER or ADMIN successfully created");
            }
        })
    }
})