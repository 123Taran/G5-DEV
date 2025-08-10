//REQUIRE OR IMPORT ALL THE MODULES HERE ONLY
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const UserModel = require("./models/userModel");

//SET INSTANCES HERE ONLY
const app = express();



//VARIABLE DECLARATION HERE ONLY
const PORT = process.env.PORT || 4888;

app.set("view engine","ejs");

// I WANT TO RUN A MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(function(req,res,next){
  
  next()
})

//WE WILLL MAKE ROUTES

//END POINTS : USER

app.get("/",(req,res)=>{
  // res.send({message:"THIS IS DASHBOARD"})
  res.render("index");

})

app.post("/create",(req,res)=>{
  // const { firstName, lastName, emailId} = req.body;

  console.log(req.body);

  
})

app.use("/api/user",userRouter)


async function dbConnect() {
  await mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log("DB CONNECTED");
  });
}

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
  });
});