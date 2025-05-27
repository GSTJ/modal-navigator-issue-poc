import { useCallback, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const BrokenNativeStack = createNativeStackNavigator();
const WorkingNormalStack = createStackNavigator();

const Stack = BrokenNativeStack;

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
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureDirection: "horizontal",
              fullScreenGestureEnabled: false,
              animation: "slide_from_right",
              presentation: "card",
              animationTypeForReplace: "push",
              autoHideHomeIndicator: true,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>

      <Modal
        visible={isModalVisible}
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
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
});
