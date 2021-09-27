const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
    addAccount: (req, res) => {
        try {
            const query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] }
            userModel.findOne(query, (findErr, findRes) => {
                if (findErr) {
                    return res.send({ responseCode: 501, responseMessage: "Internal Error" })
                } else if (findRes) {
                    if (findRes.email == req.body.email) {
                        return res.send({ responseCode: 409, responseMessage: "Email Already exist " })
                    } else if (findRes.mobileNumber == req.body.mobileNumber) {
                        return res.send({ responseCode: 409, responseMessage: "mobileNumber Already exist " })
                    }
                } else {
                    req.body.password = bcrypt.hashSync(req.body.password)
                    new userModel(req.body).save((saveErr, saveRes) => {
                        if (saveErr) {
                            return res.send({ responseCode: 500, responseMessage: "Internal save Error " })
                        } else {
                            return res.send({ responseCode: 200, responseMessage: "Account Successfully Add or user Singup", responseResult: saveRes })
                        }
                    })
                }
            })

        } catch (error) {
            return res.send({ responseCode: 500, responseMessage: "Somthing Wrong" })

        }
    },
    userLogIn: (req, res) => {
        const query={$or:[{email: req.body.email },{userType:"USER"}]}
        userModel.findOne(query,(findErr, findRes) => {
            if (findErr) {
                return res.send({ responseCode: 500, responseMessage: "Internal Error" });
            } else if (!findRes) {
                return res.send({ responseCode: 404, responseMessage: "Credantial not found" })
            } else {
                const pass = bcrypt.compareSync(req.body.password,findRes.password);
                if (pass == true) {
                    return res.send({ responseCode: 200, responseMessage: "logIn successfully" ,responseResult:findRes})
                } else {
                    return res.send({ responseCode: 500, responseMessage: "Email or Password Worng" })

                }
            }

        })
    },
    adminLogin: (req, res) => {
        try {
            userModel.findOne({ email: req.body.email, userType: "OWNER" }, (findErr, findRes) => {
                if (findErr) {
                    return res.send({ responseCode: 500, responseMessage: "internal error" });

                }
                else if (!findRes) {
                    return res.send({ responseCode: 404, responseMessage: "does not exist" });
                }
                else {
                    var match = bcrypt.compare(req.body.password, findRes.password)
                    if (match) {
                        var token = jwt.sign({ _id: findRes._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'kapil-sahu', { expiresIn: '2d' });
                        var obj = {
                            userId: findRes._id,
                            firstName: findRes.firstName,
                            token: token,
                            email: findRes.email,
                            mobileNumber: findRes.mobileNumber,
                            userType: findRes.userType
                        }
                        return res.send({ responseMessage: "OWNER or Admin Login Successfull", obj });
                    }
                    else {
                        return res.send({ responseMessage: "password worng" });
                    }
                }
            })
        } catch (error) {
            return res.send({ responseMessage: "somthing worng" });
        }
    },

}