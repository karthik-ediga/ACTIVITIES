const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

main()
.then(()=>{
  console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
    {
    from:"neha",
    to:"priya",
    message:"send me your exam sheets",
    created_at:new Date() 
  },
  {
    from:"rohit",
    to:"mohith",
    message:"send me result ",
    created_at:new Date() 
  },
  {
    from:"giri",
    to:"mani",
    message:"your exam sheets",
    created_at:new Date() 
  },
];
  
  Chat.insertMany(allChats);