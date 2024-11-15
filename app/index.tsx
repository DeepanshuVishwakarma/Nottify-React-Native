import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
// import Entry from './EntryPoint';
import EntryPoint from "../EntryPoint";
import { store } from "../src/store/store";
import "react-native-gesture-handler";
import colors from "../styles/colors";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <EntryPoint></EntryPoint>
      </View>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
});

// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>hello!!!! Devally.....</Text>
//     </View>
//   );
// }
