import client from "./client"

export const getPosts = async(pageNo,limit)=>{
    try{
        const {data} = await client(`/posts?pageNo=${pageNo}&limit=${limit}`)
        console.log("Bc this is the required data",data);
        return data;
    }catch(error){
        const {response}=error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
}

export const deletePost = async (postId)=>{
    try{
        const {data} = await client.delete(`/${postId}`);
        return data;
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
};


export const searchPost = async (query)=>{
    try{
        const {data} = await client(`/search?title=${query}`);
        return data;
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
};

export const uploadImage = async (formData)=>{
    try{
        console.log(formData);
        const {data} = await client.post(`/upload-image`,formData);
        console.log(data);
        return data;
    }catch(error){
        const {response} = error;
        console.log(response);
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
};

export const createPost = async (formData)=>{
    try{
        console.log(formData);
        const {data} = await client.post(`/create`,formData);
        console.log(data);
        return data;
    }catch(error){
        const {response} = error;
        console.log(response);
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
};

export const getPost = async (slug)=>{
    try{
        const {data} = await client(`/single/${slug}`);
        console.log(data);
        return data;
    }catch(error){
        const {response} = error;
        console.log(response);
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
};

export const updatePost = async (postId, formData)=>{
    try{
        console.log(formData);
        const {data} = await client.put(`/${postId}`,formData);
        console.log(data);
        return data;
    }catch(error){
        const {response} = error;
        console.log(response);
        if(response?.data){
            return response.data;
        }
        return {error: error.message || error};
    }
};