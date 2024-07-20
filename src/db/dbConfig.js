const mongoose=require('mongoose');
require('dotenv').config();

async function dbConnect(){
    DBURI = `${process.env.DBURI}`;
    DBNAME = `${process.env.DATABASE_NAME}`;

    try {
        const connectionInstance=await mongoose.connect(`${DBURI}/${DBNAME}`);
        console.log(`\n MongoDB connected!! DB HOST:${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection error", error);
        process.exit(1); 
    }
}

module.exports = dbConnect;