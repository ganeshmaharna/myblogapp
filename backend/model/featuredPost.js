import mongoose from "mongoose";
const FeaturedPostSchema = mongoose.Schema(
{
  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
    required:true,
  },
},
 {
    timestamps:true,
 }
);
const featuredpost = mongoose.model('FeaturedPost',FeaturedPostSchema);
export default featuredpost;