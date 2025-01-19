const express = require("express");
const dotenv = require("dotenv")
const mongoose =  require("mongoose")

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

//Database connection 
async function DBConnection() {

    try {
        await mongoose.connect(DB_URL);
        console.log("Connected with Database !");
    } catch (error) {
        console.log("DATABASE CONNECTION ERROR : "+error );
    }
    
}

DBConnection();



///Router 
const todoroute = require("./Routes/todo.route"); 
const userroute = require("./Routes/user.route"); 
app.use(express.json())
app.use("/todo/api/",todoroute)
app.use("/user/api/",userroute)


//

app.listen(PORT,()=>{
    console.log("Server is Running : "+PORT);
})
