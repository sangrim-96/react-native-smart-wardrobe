import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.8;
const translateWidth = width * 0.1;

const RecommendationCard = ({ item, index, scrollX }) => {
  const navigation = useNavigation();
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [1.2, 1, 1.2],
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-translateWidth, 16, 0],
  });

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('RecommendationDetail', {
            item: item,
          });
        }}
      >
        <Animated.View
          style={[
            styles.imgContainer,
            {
              transform: [{ translateX: translateX }],
            },
          ]}
        >
          <Animated.Image
            source={{ uri: item.recommendImageURL }}
            style={[
              styles.image,
              {
                transform: [{ scale: scale }],
              },
            ]}
          />
          {/* <LinearGradient
            // Background Linear Gradient
            colors={['transparent', 'transparent', 'rgba(0,0,0,0.8)']}
            style={styles.overlay}
          /> */}
          {/* <View style={styles.detailContainer}>
            <Text style={styles.detail}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </View> */}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: 360,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 360,
    zIndex: 2,
  },
  imgContainer: {
    width: cardWidth,
    height: 360,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  image: {
    width: cardWidth,
    height: 360,
    borderRadius: 10,
    zIndex: 1,
  },
  detailContainer: {
    width: cardWidth,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 3,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  id: {
    fontFamily: 'SFPro-Text-Bold',
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
  },
  detail: {
    fontFamily: 'SFPro-Text-Regular',
    fontSize: 14,
    color: '#FFF',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FA6400',
    width: 48,
    height: 28,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecommendationCard;
