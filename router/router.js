const route=require('express').Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderControllere');
const auth=require('../middleWare/auth')

route.post('/addAccount',userController.addAccount);
route.post('/userLogIn',userController.userLogIn);
route.post('/ownerLogin',userController.adminLogin);
route.post('/addProduct',auth.verifyToken,productController.addProduct);
route.get('/viewProduct',productController.viewProduct);
route.post('/orderProduct',orderController.orderProduct);
route.get('/viewOrder',orderController.viewOrder);


module.exports = route;