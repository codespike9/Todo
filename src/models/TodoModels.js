const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const todoSchema=new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        enum:['pending','completed'],
        default:'pending',
    },
    priority:{
        type:String,
        enum:['high','medium','low'],
        default:'high'
    },
    due_date:{
        type:Date
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
});

const Todo= mongoose.model('Todo',todoSchema);

module.exports= Todo;