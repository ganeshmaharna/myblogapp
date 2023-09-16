import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PostListItem from "./PostListItem";
import { getSimillerPosts, getSinglePost } from "../api/post";

const RelatedPosts = ({ postId ,onPostPress}) => {
  const [posts, setPosts] = useState([]);

  const fetchSimillerPosts = async()=>{
    const { error, posts } = await getSimillerPosts(postId);
    if (error) console.log(error);

    console.log(posts);
    
    setPosts([...posts]);
  }

  useEffect(()=>{
      fetchSimillerPosts()
  },[postId])

  return (
    <View>
      {posts.map((post) => {
        return (
          <PostListItem
            onPress={() => onPostPress(post.slug)}
            key={post.id}
            post={post}
          />
        );
      })}
    </View>
  );
};

export default RelatedPosts;

const styles = StyleSheet.create({});
