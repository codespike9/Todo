require('dotenv').config();

const app=require("./app");
const dbConnect=require("./db/dbConfig");

const PORT=process.env.PORT || 8001 ;
const SERVER_URL = `http://localhost:${PORT}`;

(async function (){
    try {
        await dbConnect();
        app.on("error",(err)=>{
            console.error("Express app initialization error: ",err);
        })
        app.listen(PORT, ()=>{
            console.log("server started at : ",SERVER_URL);
        })  
    } catch (error) {
        console.error("MONGO db connection failed!!!",err);
    }
})();