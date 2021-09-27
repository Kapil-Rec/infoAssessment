const express=require('express');
const app=express();
const db=require('./dbConnection/dbConnect');
const route=require('./router/router');
const bodyParser=require('body-parser');
app.use(bodyParser.json());

app.use('/user',route);
const port=5000;
app.listen(port,(Err,Res)=>{
    if(Err){
        console.log(' Server Err');
    }else{
        console.log(`Server start on porst ${port}`);
    }
})