const{ faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express=require("express");
const app=express();
const path=require('path');
const methodOverride=require("method-override");
const { v4: uuidv4 } = require('uuid');

app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set(path.join("views",__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password:'karthik4321@2005'
  });

let getRandomUser=() => {
    return [
       faker.string.uuid(),
       faker.internet.username(), 
       faker.internet.email(),
       faker.internet.password()
    ];
  };
 
  app.get("/",(req,res)=>{
    let q='select count(*) from users';
    try{
      connection.query(q,(err,result)=>{
        if(err) throw err;
        let count=result[0]["count(*)"];
        console.log(count);
        res.render("home.ejs",{count});
      });
    }catch(err){
      console.log(err);
      res.send("some error  in DB");
    }
  });

  app.get("/user",(req,res)=>{
    let q='select * from users';
    try{
      connection.query(q,(err,users)=>{
        if(err) throw err;
        console.log(users);
        res.render("show.ejs",{users});
      });
    }catch(err){
      console.log(err);
      res.send("some error  in DB");
    }
  });

  app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let q=`select * from users where id='${id}'`;
    try{
      connection.query(q,(err,result)=>{
        if(err) throw err;
        let user=result[0];
        res.render("edit.ejs",{user});
      });
    }catch(err){
      console.log(err);
      res.send("some error  in DB");
    }
  });

  app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let q=`select * from users where id='${id}'`;
    let {username:name,password:pass}=req.body;
    try{
      connection.query(q,(err,result)=>{
        if(err) throw err;
        let user=result[0];
        if(pass!=user.password){
          res.send("Wrong Password");
        }
        else{
          let q2=`update users set username='${name}' where id='${id}'`;
          connection.query(q2,(err,result)=>{
            if(err) throw err;
          res.redirect("/user");
          });
        }
      });
    }catch(err){
      console.log(err);
      res.send("some error  in DB");
    }
  });

  app.get("/user/new",(req,res)=>{
    res.render("new.ejs");
  });

  app.post("/user/new",(req,res)=>{
    let {username,password,email}=req.body;
    let id=uuidv4();
    let q=`INSERT INTO users (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}')`;
    try{
      connection.query(q,(err,result)=>{
        if(err) throw err;
        res.redirect("/user");
      });
    }catch(err){
      console.log(err);
      res.send("some error  in DB");
    }
  });

  app.get("/user/:id/delete",(req,res)=>{
    let { id } = req.params;
    let q = `SELECT * FROM users WHERE id='${id}'`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        res.render("delete.ejs", { user });
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });

  app.delete("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password}=req.body;
    let q=`SELECT * FROM users WHERE id='${id}'`;
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        if (user.password != password) {
          res.send("WRONG Password entered!");
        }
        else {
          let q2 = `DELETE FROM users WHERE id='${id}'`; //Query to Delete
          connection.query(q2, (err, result) => {
            if (err) throw err;
            else {
              console.log(result);
              console.log("deleted!");
              res.redirect("/user");
            }
          });
        }
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });
  app.listen("8080",()=>{
    console.log("server is listening to port 8080");
  });

