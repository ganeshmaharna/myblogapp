import { FlatList, Text, View } from "react-native";
import Slider from "./Slider";
import Separator from "./Separator";
import PostListItem from "./PostListItem";
import { useEffect, useState } from "react";
import { getFeaturedPosts, getLatestPosts, getSinglePost } from "../api/post";
import Constants from "expo-constants";


let pageNo = 0;
const limit = 4;
export default function Home({navigation}) {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);

  const fetchFeaturedPosts = async () => {
    const { error, posts } = await getFeaturedPosts();
    if (error) return console.log("This is the error fetch featured post",error.message);

    // console.log("This is BC Post", posts);
    setFeaturedPosts(posts);
  };

  const fetchLatestPosts = async () => {
    const { error, posts } = await getLatestPosts(limit, pageNo);
    if (error) return console.log("This is the error fetch latest post",error.message);

    // console.log("This is MC Posts", posts);
    setLatestPosts(posts);
  };
  const fetchMorePosts = async () => {
    if (reachedToEnd || busy) return;

    pageNo += 1;
    setBusy(true);
    const { error, posts, postCount } = await getLatestPosts(limit, pageNo);
    setBusy(false);
    if (error) return console.log("This is the error fetch more post",error.message);

    if (postCount === latestPosts.length) return setReachedToEnd(true);

    setLatestPosts([...latestPosts, ...posts]);
  };
  
  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestPosts();
  }, []);

  const ListHeaderComponent = () => {
    return (
      <View style={{ paddingTop: Constants.statusBarHeight }}>
        {featuredPosts.length ? (
          <Slider onSlidePress={fetchSinglePost} data={featuredPosts} title="Featured Post" />
        ) : null}
        <View style={{ marginTop: 15 }}>
          <Separator />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 23,
              color: "#000",
              marginTop: 15,
            }}
          >
            Latest Post
          </Text>
        </View>
      </View>
    );
  };


  const fetchSinglePost = async(postInfo)=>{
      const slug = postInfo.slug || postInfo;
      const {error,post} = await getSinglePost(slug);

      if(error) console.log(error);
      navigation.navigate('PostDetail',{post});
  }

  const renderItem = ({ item }) => {
    // console.log(item.slug);
    return (
      <View style={{ marginTop: 15 }}>
        <PostListItem onPress={()=> fetchSinglePost(item.slug)} post={item}/>
      </View>
    );
  };
  const ItemSeparatorComponent = () => (
    <Separator width="100%" style={{ marginTop: 15 }} />
  );

  return (
    <FlatList
      data={latestPosts}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
      onEndReached={()=>fetchMorePosts()}
      onEndReachedThreshold={0}
      ListFooterComponent={() => {
        return reachedToEnd ? (
          <Text
            style={{
              color: "#000",
            }}
          >
            You reachedToEnd
          </Text>
        ) : null;
      }}
    />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     alignSelf: "center",
//     width,
//     paddingTop: 50,
//   }
// });
