import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  FlatList,
  Text,
  Image,
  Dimensions,
} from "react-native";

// Array data gambar
const images = [
  { id: 1, main: "https://i.pinimg.com/736x/e3/aa/17/e3aa175ead3fd9064ce4ef128973fd96.jpg", alt: "https://i.pinimg.com/736x/9a/1e/db/9a1edb3a20db9a56dd8c7adc4a32ba6a.jpg" },
  { id: 2, main: "https://i.pinimg.com/736x/e5/b9/8a/e5b98aa4319968c4785b259a9ccdcb2e.jpg", alt: "https://i.pinimg.com/736x/92/39/c5/9239c5a50c50781c82dcf3006350fece.jpg" },
  { id: 3, main: "https://i.pinimg.com/736x/7c/14/c8/7c14c8596bb124afd094a5a4a9b4247b.jpg", alt: "https://i.pinimg.com/736x/83/1d/5b/831d5b81372b8b0192acd49323fb06c6.jpg" },
  { id: 4, main: "https://i.pinimg.com/736x/93/ee/ea/93eeea78e003dd356aa0d22f7a15d91f.jpg", alt: "https://i.pinimg.com/736x/25/38/02/253802fab9b96754dd6356bccc9464bb.jpg" },
  { id: 5, main: "https://i.pinimg.com/736x/4f/40/d3/4f40d35b156f79a0b421296f0d8f5c32.jpg", alt: "https://i.pinimg.com/736x/83/18/58/83185882b35ffebaef4dde926043f16f.jpg" },
  { id: 6, main: "https://i.pinimg.com/736x/c0/0c/ed/c00ceda54d7346b7ffa846edf3be1a08.jpg", alt: "https://i.pinimg.com/736x/11/18/ca/1118ca3ad0419b362f26ae5a1a1c2056.jpg" },
  { id: 7, main: "https://i.pinimg.com/736x/cb/51/43/cb51431ce5984f28b1f29314904437c6.jpg", alt: "https://i.pinimg.com/736x/06/0f/4b/060f4b51059a74ca7880e0a136a25788.jpg" },
  { id: 8, main: "https://i.pinimg.com/736x/51/8f/22/518f22aeb8cb1aae2a08dcbf1ca930b9.jpg", alt: "https://i.pinimg.com/1200x/8f/32/0e/8f320ef24a24f093f8ffa474dfb767c8.jpg" },
  { id: 9, main: "https://i.pinimg.com/736x/24/46/75/24467588c748f4fb716da446e43e5d62.jpg", alt: "https://i.pinimg.com/736x/7c/36/85/7c36859aa49c9360c09e1214fb494199.jpg" },
];

// Menghitung ukuran sel agar responsif
const { width } = Dimensions.get("window");
const numColumns = 3;
const marginSize = 5;
const itemSize = (width - (marginSize * (numColumns + 1)) * 2) / numColumns;


export default function App() {
  // Inisialisasi state untuk setiap gambar
  const [imageStates, setImageStates] = useState(
    images.map(() => ({
      isAlt: false,
      scale: new Animated.Value(1),
      clickCount: 0,
    }))
  );

  // Fungsi yang dijalankan saat gambar ditekan
  const handlePress = (index: number) => {
    const currentState = imageStates[index];

    // Jika sudah diklik 2 kali, jangan lakukan apa-apa
    if (currentState.clickCount >= 2) return;

    // Tentukan skala berikutnya berdasarkan jumlah klik
    const nextScale = currentState.clickCount === 0 ? 1.2 : 2.4;

    // Jalankan animasi scaling
    Animated.timing(currentState.scale, {
      toValue: nextScale,
      duration: 300, // Durasi animasi sedikit diperlambat agar lebih halus
      useNativeDriver: true, // Penting untuk performa
    }).start();

    // --- BAGIAN YANG DIREVISI ---
    // Perbarui state dengan cara immutable (membuat array baru)
    setImageStates(currentStates =>
      currentStates.map((state, i) => {
        if (i === index) {
          // Jika ini adalah gambar yang diklik, kembalikan objek state baru
          return {
            ...state,
            isAlt: true, // Gambar selalu berubah ke alternatif dan tidak kembali
            clickCount: state.clickCount + 1,
          };
        }
        // Jika bukan, kembalikan state yang lama tanpa perubahan
        return state;
      })
    );
  };

  // Fungsi untuk merender setiap item dalam FlatList
  const renderItem = ({ item, index }: { item: typeof images[0], index: number }) => {
    const state = imageStates[index];

    return (
      <Pressable onPress={() => handlePress(index)}>
        <View style={styles.imageWrapper}>
            <Animated.Image
              source={{ uri: state.isAlt ? item.alt : item.main }}
              style={[
                styles.image,
                {
                  transform: [{ scale: state.scale }],
                  // Z-index agar gambar yang membesar tampil di atas yang lain
                  zIndex: state.clickCount > 0 ? 10 : 1,
                },
              ]}
              resizeMode="cover"
              onError={() => console.warn(`Gagal memuat gambar id: ${item.id}`)}
            />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        scrollEnabled={false}
        // Menambahkan style untuk konten FlatList agar rapi
        contentContainerStyle={styles.listContentContainer}
      />
      <View style={styles.footer}>
        <Text style={styles.name}>Muhammad Aditya Yudhistira</Text>
        <Text style={styles.nim}>105841114122</Text>
      </View>
    </View>
  );
}

// Stylesheet untuk komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: 'center', // Pusatkan konten secara vertikal
  },
  listContentContainer: {
    alignItems: 'center', // Pusatkan grid di tengah layar
    padding: marginSize,
  },
  imageWrapper: {
    width: itemSize,
    height: itemSize,
    margin: marginSize,
    // Menambahkan overflow: 'visible' agar scale tidak terpotong
    overflow: 'visible',
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '50%',
    height: '50%',
    borderRadius: 14,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  nim: {
    fontSize: 16,
    color: "#555",
  },
});
