import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const stambukPatokan = 105841114122;

const namaMahasiswa = [
  { nama: "Abdul Naim - 105841113622", font: "ubuntu" },
  { nama: "Syahrul Ramadhan - 105841113722", font: "barlowCondensed" },
  { nama: "Abdullah Khaerunna Anwar - 105841113822", font: "ptsans" },
  { nama: "Muh Irsyad Jafar - 105841113922", font: "rubik" },
  { nama: "Alryadi Asmuadzan - 105841114022", font: "tilitium" },
  { nama: "Wiwin Fuad Sanjaya - 105841114222", font: "merriweather" },
  { nama: "Muh Ayyub Hasrul - 105841114322", font: "oswald" },
  { nama: "Muhammad Alif Syafan - 105841114422", font: "raleway" },
  { nama: "Muh Imam Ma'ruf Musni - 105841114522", font: "roboto" },
  { nama: "Muh Abdullah Zufar - 105841114622", font: "tiktoksans" },
];

// Urutkan berdasarkan stambuk (low index numbers dulu)
const sortedNama = [...namaMahasiswa].sort((a, b) => {
  const stambukA = parseInt(a.nama.split("-")[1].trim());
  const stambukB = parseInt(b.nama.split("-")[1].trim());
  return stambukA - stambukB;
});

// Pisahkan sebelum dan sesudah patokan
const sebelum = sortedNama.filter((item) => {
  const stambuk = parseInt(item.nama.split("-")[1].trim());
  return stambuk < stambukPatokan;
});

const sesudah = sortedNama.filter((item) => {
  const stambuk = parseInt(item.nama.split("-")[1].trim());
  return stambuk > stambukPatokan;
});

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daftar Nama Mahasiswa</Text>

      <Text style={styles.subTitle}>Sebelum Stambuk {stambukPatokan}</Text>
      {sebelum.map((item, index) => (
        <View key={`sbl-${index}`} style={styles.card}>
          <Text style={[styles.namaText, { fontFamily: item.font }]}>
            {item.nama}
          </Text>
        </View>
      ))}

      <Text style={styles.subTitle}>Sesudah Stambuk {stambukPatokan}</Text>
      {sesudah.map((item, index) => (
        <View key={`ssd-${index}`} style={styles.card}>
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
    paddingVertical: 40,
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
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#34495e",
    alignSelf: "flex-start",
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
