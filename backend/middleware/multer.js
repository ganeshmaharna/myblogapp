import multer from "multer";
const storage = multer.diskStorage({});
const fileFilter=(req,file,cb)=>{
    console.log(file);
    if(!file.mimetype.includes('image')){
        return cb('error Invalid image format',false);
    }
    cb(null,true);
};
const upload = multer({storage,fileFilter});
export default upload;
