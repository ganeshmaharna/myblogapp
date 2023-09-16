import client from "./client";
export const getFeaturedPosts = async()=>{
    try{
        const {data} = await client.get("/featured-posts")
        // console.log("This is BC the required data",data);
        return data;
    }catch(error){
        const {response}=error;
        if(response?.data){
            return "This is the data",response.data;
        }
        return {error: error.message || error};
    }
}
//These methods call to the route,then controller,then modal,modal performs database operation
export const getLatestPosts = async(limit,pageNo)=>{
    try{
        const {data} = await client(`/posts?limit=${limit}&pageNo=${pageNo}`)
        // console.log("This is MC required data",data);
        return data;
    }catch(error){
        const {response}=error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
}
export const getSinglePost = async(slug)=>{
    try{
        const {data} = await client(`/single/${slug}`)
        // console.log("This is MC required data",data);
        return data;
    }catch(error){
        const {response}=error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
}
export const getSimillerPosts = async(id)=>{
    try{
        const {data} = await client(`/related-posts/${id}`)
        // console.log("This is MC required data",data);
        return data;
    }catch(error){
        const {response}=error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
}
export const searchPosts = async(query)=>{
    try{
        const {data} = await client(`/search?title=${query}`);
        // console.log("This is MC required data",data);
        return data;
    }catch(error){
        const {response}=error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
}