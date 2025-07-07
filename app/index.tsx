import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <View style={{
        width: 0,
        height: 0,
        borderLeftWidth: 55,
        borderRightWidth: 55,
        borderBottomWidth: 95,
        borderLeftColor: 'transparent',
        borderBottomColor: 'yellow',
        borderRightColor: 'transparent'
      }} >
      </View>

      <View style={{
        backgroundColor: 'maroon',
        height: 80,
        width: 250
      }}>
      <Text style= {{
        color: 'yellow',
        fontSize: 25,
      }}>Muhammad Aditya Yudhistira</Text>
      </View>

      <View style={{
        width: 200,
        height: 70,
        borderRadius: 100,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: "center"
      }} >
      <Text style={{
        fontSize: 25,
        color: 'pink'
      }}>105841114122</Text>
      </View>

    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 9,
    justifyContent: "center",
    alignItems: "center"
  }
})
