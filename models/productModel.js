const mongoose=require('mongoose');
const schema=mongoose.Schema;

const productSchema=new schema({
    productName:{type:String},
    productQuantity:{type:Number},
    status:{
        type:String,
        enum:["ACTIVE","DELETE,BLOCK"],
        default: "ACTIVE"
    }
});
module.exports=mongoose.model('product',productSchema);