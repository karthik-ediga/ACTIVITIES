const express=require("express");
const app=express();
const port=8080;

app.use("/api",(req,res,next)=>{
    let {token}=req.query;
    if(token==="giveaccess"){
       return next();
    }
   res.send("ACCESS DENIED!");
});

app.get("/api",(req,res)=>{
    res.send("data");
});

app.listen(8080,()=>{
    console.log("listening");
});