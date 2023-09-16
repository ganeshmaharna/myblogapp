import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import { searchPosts } from "../api/post";
import PostListItem from "./PostListItem";
import { getSinglePost } from "../api/post";

const Search = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const handleSubmit = async () => {
    if (!query.trim()) return;

    const { error, posts } = await searchPosts(query);
    setQuery("");
    if (error) return console.log(error);

    if (!posts.length) return setNotFound(true);

    setResults([...posts]);
    setNotFound(false);
  };
  const handlePostPress = async (slug) => {
    const { error, post } = await getSinglePost(slug);

    if (error) return console.log(error);
    navigation.navigate("PostDetail", { post });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        value={query}
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={handleSubmit}
      />

      <ScrollView>
        {notFound ? (
          <Text style={{
            textAlign:"center",
            fontSize:30,
            fontWeight:600,
          }}> 
            Result not found
          </Text>
        ) : (
          results.map((post) => {
            return (
              <View key={post.id} style={{ marginTop: 10 }}>
                <PostListItem
                  post={post}
                  onPress={() => handlePostPress(post.slug)}
                />
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    marginTop: 15,
    padding: 10,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: "#383838",
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
  },
});
