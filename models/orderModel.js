const mongoose=require('mongoose');
const schema=mongoose.Schema;

const orderSchema=new schema({
    //_id:mongoose.Schema.Types.ObjectId,
    product_id:{type:String},
    productName:{type:String},
    //productName:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
    productQuantity:{type:Number,default:1},
    
});
module.exports=mongoose.model('order',orderSchema);