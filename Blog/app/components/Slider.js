import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

// const data = [
//   {
//     id: 123,
//     thumbnail:
//       "https://media.istockphoto.com/id/1344252159/photo/dedicated-male-freelancer-having-online-meeting-while-working-from-modern-cafeteria.jpg?s=1024x1024&w=is&k=20&c=PAx7t1HcUFxE5LIY7x-IAy9WZsxMMOA3RullopQHTRA=",
//     title: "Know everything about money",
//     author: "Admin",
//   },
//   {
//     id: 867,
//     thumbnail:
//       "https://media.istockphoto.com/id/1450268558/photo/summer-selfie.jpg?s=1024x1024&w=is&k=20&c=mkksk_FLmmmpevE7-JPzm6cTCuEqDc_OjFl0s7gY0Xc=",
//     title: "Know everything about money1",
//     author: "Admin",
//   },
//   {
//     id: 343,
//     thumbnail:
//       "https://media.istockphoto.com/id/1344252964/photo/dedicated-female-student-of-asian-ethnicity-having-online-class-via-laptop-from-the-modern.jpg?s=1024x1024&w=is&k=20&c=4zpdthDraPOGGGaYC33cU1Fc2xDDtde70nLZgP9gZpc=",
//     title: "Know everything about money2",
//     author: "Admin",
//   },
//   {
//     id: 545,
//     thumbnail:
//       "https://media.istockphoto.com/id/1431021822/photo/happy-hiker-with-raised-arms-on-top-of-the-mountain.jpg?s=1024x1024&w=is&k=20&c=G5ZgCdHmYTL2A126lypnqLr-922SpdURBVolvXRdMDQ=",
//     title: "Know everything about money3",
//     author: "Admin",
//   },
// ];

const width = Dimensions.get("window").width - 20;
let currentSlideIndex = 0;
let intervalId = 0;
export default function Slider({ data, title, onSlidePress }) {
  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    // console.log(viewableItems);
    currentSlideIndex = viewableItems[0]?.index || 0;
    // console.log("Hello this is" + currentSlideIndex);
    setVisibleSlideIndex(currentSlideIndex);
  });
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const flatList = useRef(null);

  const handleScrollTo = (index) => {
    flatList.current?.scrollToIndex({ animated: false, index });//This is error part that I solved
  };
  const startSlider = () => {
    if (currentSlideIndex <= dataToRender.length - 2) {
      intervalId = setInterval(() => {
        flatList.current?.scrollToIndex({
          animated: true,
          index: currentSlideIndex + 1,
        });
      }, 4000);
    } else {
      pauseSlider();
    }
  };
  const pauseSlider = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    if (dataToRender.length && flatList.current) {
      startSlider();
    }

    return ()=>{
      pauseSlider()
    }
  }, [dataToRender.length]);

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];

    setDataToRender([...newData]); // Set the new data array to state
  }, [data.length]);

  useEffect(() => {
    // reset slide to first
    const length = dataToRender.length;
    // console.log("This is the length :" + length);
    // console.log("Visible SLide index is " + visibleSlideIndex);
    if (visibleSlideIndex === length - 1 && length) {
      handleScrollTo(1);
    }
    // reset slide to last
    if (visibleSlideIndex === 0 && length) {
      console.log("Inside the visible");
      handleScrollTo(length - 2);
    }
    const lastSlide = currentSlideIndex === length - 1;
    const firstSlide = currentSlideIndex === 0;

    if (lastSlide && length) setActiveSlideIndex(0);
    else if (firstSlide && length) setActiveSlideIndex(length - 2);
    else setActiveSlideIndex(currentSlideIndex - 1);
  }, [visibleSlideIndex]);

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={()=>onSlidePress(item)}>
        <View>
          <Image source={{ uri: item.thumbnail }} style={styles.slideImage} />
          <View style={{ width }}>
            <Text
              numberOfLines={2}
              style={{ fontWeight: "700", fontSize: 23, color: "#000" }}
            >
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderHead}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.slideIndicatorContainer}>
          {/* //This is a component */}
          {/* <SlideIndicators data={data} activeSlideIndex={activeSlideIndex}/> */}
          {data.map((item, index) => {
            // console.log("This is the index1 "+index);
            return (
              <View
                key={item.id}
                style={[
                  styles.slides,
                  {
                    backgroundColor:
                      activeSlideIndex === index ? "#383838" : "transparent",
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
      <FlatList
        ref={flatList}
        data={dataToRender}
        keyExtractor={(item, index) => item.id + index}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // initialScrollIndex={1}
        // getItemLayout={(_, index) => ({
        //   length: width,
        //   offset: width * index,
        //   index,
        // })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        onScrollBeginDrag={pauseSlider}
        onScrollEndDrag={startSlider}
        renderItem={renderItem}
      />
    </View>
  );
}

// const SlideIndicators = ({ data, activeSlideIndex}) => {
//   {
//     data.map((item, index) => {
//       // console.log("This is the index1 "+index);
//       return (
//         <View
//           key={item.id}
//           style={[
//             styles.slides,
//             {
//               backgroundColor:
//                 activeSlideIndex === index ? "#383838" : "transparent",
//             },
//           ]}
//         />
//       );
//     });
//   }
// };

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width,
    // paddingTop: 40,
  },
  sliderHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  title: { fontWeight: "700", fontSize: 23, color: "#000" },
  slideIndicatorContainer: { flexDirection: "row", alignItems: "center" },
  slides: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginLeft: 5,
  },
  slideImage: { width, height: width / 1.7, borderRadius: 7 },
});
