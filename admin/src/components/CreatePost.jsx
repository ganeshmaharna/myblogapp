import React, { useEffect ,useState} from 'react'
import {useNavigate} from "react-router-dom";
import PostForm, {defaultPost} from './PostForm';
import { createPost } from '../api/post';
import { useNotification } from '../context/NotificationProvider';

const CreatePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const [busy, setBusy] = useState(false);
  const [resetAfterSubmit,setResetAfterSubmit] = useState(false);
  const {updateNotification} = useNotification();
  const navigate = useNavigate();
  const handleSubmit = async (data)=>{
     setBusy(true);
     const {error, post} = await createPost(data);
     setBusy(false);
     console.log(post);
     if(error) return updateNotification('error',error);

     setResetAfterSubmit(true)

     navigate(`/update-post/${post.slug}`);
  }

  useEffect(()=>{
    const result = localStorage.getItem('blogPost')
    if(!result) return

    const oldPost = JSON.parse(result);
    setPostInfo({...defaultPost, ...oldPost});
  }, []);
  return (
    <PostForm 
      onSubmit={handleSubmit} 
      initialPost={postInfo} 
      busy={busy}
      postBtnTitle="Post"
      resetAfterSubmit={resetAfterSubmit}
      />
  );
}

export default CreatePost;
