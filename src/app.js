//package imports
const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const morgan=require('morgan');

const apiRouter=require('./routes/apiRouter');

//express app initialization
const app=express();

//cross origin resource sharing set up
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//Middleware setup for express app
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api',apiRouter);

module.exports=app;
