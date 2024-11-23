import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const BounceScrollView = ({ children }) => {
  const translateY = useRef(new Animated.Value(0)).current; // Tracks overscroll
  const scrollViewRef = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.dy > 0 || gestureState.dy < 0, // Detect vertical movement
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          // Pull down (overscroll at the top)
          translateY.setValue(gestureState.dy / 2); // Dampen effect
        } else if (gestureState.dy < 0) {
          // Pull up (overscroll at the bottom)
          translateY.setValue(gestureState.dy / 2);
        }
      },
      onPanResponderRelease: () => {
        // Animate back to normal position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateY }] }, // Apply the bounce effect
        ]}
        {...panResponder.panHandlers}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
  },
  animatedContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  extraContent: {
    height: 1200, // Make the content taller than the screen
    // backgroundColor: "#ddd",
  },
});

export default BounceScrollView;
