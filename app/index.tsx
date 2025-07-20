import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

export default function Index() {
  const namaMahasiswa = [
    { nama: "Abdul Naim - 105841113622", font: "ubuntu" },
    { nama: "Syahrul Ramadhan - 105841113722", font: "merriweather" },
    { nama: "Abdullah Khaerunna Anwar - 105841113822", font: "barlowCondensed" },
    { nama: "Muh Irsyad Jafar - 105841113922", font: "oswald" },
    { nama: "Alryadi Asmuadzan - 105841114022", font: "ptsans" },
    { nama: "Wiwin Fuad Sanjaya - 105841114222", font: "raleway" },
    { nama: "Muh Ayyub Hasrul - 105841114322", font: "roboto" },
    { nama: "Muhammad Alif Syafan - 105841114422", font: "rubik" },
    { nama: "Muh Imam Ma'ruf Musni - 105841114522", font: "tiktoksans" },
    { nama: "Muh Abdullah Zufar - 105841114622", font: "tilitium" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}> Daftar Nama</Text>
      {namaMahasiswa.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={[styles.namaText, { fontFamily: item.font }]}>
            {item.nama}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 24,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    width: width * 0.9,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e6ecf1",
  },
  namaText: {
    fontSize: 18,
    color: "#34495e",
  },
});
