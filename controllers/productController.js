const productModel=require('../models/productModel');
var jwt = require('jsonwebtoken');
module.exports={
    addProduct:(req,res)=>{
        
        productModel.findOne({productName:req.body.productName},(findErr,findRes)=>{
            if(findErr){
                return res.send({responseCode:500,responseMessage:"Internal Error"});
            }else if(findRes){
                return res.send({responseCode:409,responseMessage:"Product Already exist"});
            }else{
                new productModel(req.body).save((saveErr,saveRes)=>{
                    if(saveErr){
                        return res.send({responseCode:500,responseMessage:"Internal Save Error"});
                    }else{
                        return res.send({responseCode:200,responseMessage:"Product Add Successfully",responseResult:saveRes});
                    }
                })
               
            }
        })
    },
    viewProduct:(req,res)=>{
        productModel.find((findErr,findRes)=>{
            if(findErr){
                return res.send({responseCode:500,responseMessage:"Internal Error"});
            }else{
                return res.send({responseCode:200,responseMessage:"Products",responseResult:findRes})
            }
        })
    }
}