import { useCallback, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const NativeStack = createNativeStackNavigator();

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNavigatorRendered, setIsNavigatorRendered] = useState(true);

  const HomeScreen = useCallback(() => {
    return (
      <View style={styles.contentContainer}>
        <Text>Home</Text>
        <Pressable
          style={styles.button}
          onPress={() => setIsModalVisible(true)}
        >
          <Text>Open Modal</Text>
        </Pressable>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isNavigatorRendered && (
          <NativeStack.Navigator
            screenOptions={{
              headerShown: false,
              gestureDirection: "horizontal",
              fullScreenGestureEnabled: true,
              animation: "slide_from_right",
              presentation: "modal",
            }}
          >
            <NativeStack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                presentation: "modal",
              }}
            />
          </NativeStack.Navigator>
        )}
      </NavigationContainer>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        hardwareAccelerated
        statusBarTranslucent
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.modalContainer}>
          <Text>Modal</Text>

          <Pressable
            style={styles.button}
            onPress={() => setIsNavigatorRendered(!isNavigatorRendered)}
          >
            <Text>Toggle Navigator</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => setIsModalVisible(false)}
          >
            <Text>Close Modal</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "red",
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
});
