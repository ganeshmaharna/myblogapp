import mongoose from "mongoose";
const postSchema = mongoose.Schema({
        title:{
            type:String,
            required:true,
            trim:true,
        },
        content:{
            type:String,
            required:true,
            trim:true,
        },
        meta:{
            type:String,
            required:true,
            trim:true,
        },
        tags:[String],
        author:{
            type:String,
            default:"Admin",
        },
        slug:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        thumbnail:{
            type:Object,
            url:{
                type:URL,
            },
            public_id:{
                type:String,
            },
        },
},
 {
    timestamps:true,
 }
);
const post = mongoose.model('Post',postSchema);
export default post;