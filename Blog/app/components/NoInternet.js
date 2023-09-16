import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const NoInternet = ({onRefreshPress}) => {
  return (
    <View style={styles.container}>
      <Feather name="wifi-off" size={35} color="black" />
      <Text>No Internet Connection</Text>
      <Pressable onPress={onRefreshPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Feather name="refresh-cw" size={18} color="black" />
        <Text
          style={{
            fontSize: 18,
            paddingVertical: 5,
            marginLeft:10
          }}
        >
          Try Again
        </Text>
      </Pressable>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
