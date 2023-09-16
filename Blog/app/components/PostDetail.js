import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import dateFormat from "dateformat";
import Markdown from "react-native-markdown-display";
import { Linking, Alert } from "react-native";
import RelatedPosts from "./RelatedPosts";
import { getSinglePost } from "../api/post";
import Separator from "./Separator";

const width = Dimensions.get("window").width;
const MY_WEBSITE_LINKS = "https://pwskills.com/courses";

const PostDetail = ({ route, navigation }) => {
  const post = route.params?.post;

  const getImage = (uri) => {
    if (uri) return { uri };

    return require("../../assets/blank.jpg");
  };

  const handleSinglePostFetch = async(slug)=>{
      const {error, post} = await getSinglePost(slug);

      if(error) return console.log(error);
      navigation.push("PostDetail",{post});

      return false;
  }

  const handleLinkPress = async (url) => {
    // if(url.includes(MY_WEBSITE_LINKS)){
    //   const slug = url.split(MY_WEBSITE_LINKS + "/")[1];

    //   if(!slug) return false;
    // handleSinglePostFetch(slug);

    // }

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      try {
        await Linking.openURL(url);
      } catch (error) {
        Alert.alert("Error", "Failed to open the link.");
      }
    } else {
      Alert.alert("Error", "This link cannot be opened.");
    }
  };
  if (!post) return null;
  const { title, thumbnail, tags, createdAt, author, content } = post;
  // console.log(route.params)
  return (
    <ScrollView style={{}}>
      <Image
        source={getImage(thumbnail)}
        style={{ width, height: width / 1.7 }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "700", fontSize: 23, color: "#000" }}>
          {title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>By {author}</Text>
          <Text>{dateFormat(createdAt, "mediumDate")}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#d3d3d3" }}>Tags</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {tags.map((tag, index) => (
              <Text style={{ marginLeft: 5, color: "blue" }} key={tag + index}>
                #{tags}
              </Text>
            ))}
          </View>
        </View>
        <Markdown style={styles} onLinkPress={handleLinkPress}>
          {content}
        </Markdown>
      </View>
      {/* This is for the related post component */}
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 22,
            color: "#000",
            marginBottom: 15,
          }}
        >
          Related Post
        </Text>
        <Separator style={{marginBottom:15}}/>
        <RelatedPosts onPostPress={handleSinglePostFetch} postId={post.id} />
      </View>
    </ScrollView>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  paragraph: {
    lineHeight: 22,
  },
  body: {
    fontSize: 22,
  },
  link: {
    color: "#7784f8",
  },
});
