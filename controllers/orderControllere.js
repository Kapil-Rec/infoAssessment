const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

module.exports = {
    orderProduct: (req, res) => {
        productModel.findOne({ _id: req.body._id }, (findErr, findRes) => {
            if (findErr) {
                return res.send({ responseCode: 500, responseMessage: "Internal Error" })
            } else if (!findRes) {
                return res.send({ responseCode: 404, responseMessage: "sorry not Found" })
            } else {
                const obj={
                    product_id:findRes._id,
                    productName:findRes.productName,
                    productQuantity:req.body.productQuantity,
                }
                new orderModel(obj).save((saveErr, saveRes) => {
                    if (saveErr) {
                        return res.send({ responseCode: 500, responseMessage: "Internal save Error" });
                    } else {
                        return res.send({ responseCode: 200, responseMessage: "product Order successfully", responseResult: saveRes })
                    }
                })
            }
        })
    },
    viewOrder: (req,res) => {
        orderModel.find((findErr, findRes) => {
            if (findErr) {
                return res.send({ responseCode: 500, responseMessage: "Internal Error" });
            } else {
                return res.send({ responseCode: 200, responseMessage: "user Orders",responseResult:findRes })
            }
        })
    }
}
