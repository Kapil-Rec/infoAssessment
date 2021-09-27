var jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const productModel= require('../models/productModel');

exports.verifyToken = (req,res,next)=>{
        if (req.headers.token) {
            jwt.verify(req.headers.token, 'kapil-sahu', (err, result) => {
                if (err) {
                    return res.send({ responseCode: 500, responseMessage: "incorrect Token" });
                }
                else {
                    userModel.findOne({ _id: result._id }, (findErr, findRes) => {
                        if (findErr) {
                            return res.send({ responseCode: 404, responseMessage: "internal server error" });
                        }
                        else if (!findRes) {
                            return res.send({ responseCode: 404, responseMessage: "Does not exist" });
                        }
                        else {
                            if (findRes.status == "BLOCK") {
                                return res.send({ responseMessage: "Block by Admin" });
                            }
                            else if (findRes.status == "DELETE") {
                                return res.send({ responseMessage: "Delete by admin" });
                            }
                            else {
                                req.userId=result._id
                                req.userDetails = result
                            next();
                            }
                        }
                    })
                }
            })
        }
}