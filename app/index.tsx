import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  FlatList,
  Text,
  Dimensions,
} from "react-native";

// --- DATA GAMBAR ---
// Array yang berisi 9 pasang gambar (utama dan alternatif)
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

// --- PENGATURAN RESPONSIVE ---
// Menghitung ukuran sel gambar agar pas di layar
const { width } = Dimensions.get("window");
const numColumns = 3;
// Variabel marginSize sekarang sudah didefinisikan dengan benar
const marginSize = 8; 
const itemSize = (width - marginSize * (numColumns * 2)) / numColumns;

export default function App() {
  // --- STATE MANAGEMENT ---
  // Inisialisasi state untuk setiap gambar.
  // Menggunakan useRef agar Animated.Value tidak dibuat ulang setiap render.
  // Ini menangani 'Inisialisasi Animated.Value' dan 'penskalaan individual'.
  const imageStates = useRef(
    images.map(() => ({
      isAlt: false,
      scale: new Animated.Value(1),
      clickCount: 0,
    }))
  ).current;

  // State untuk memicu re-render setelah state di useRef berubah
  const [_, setForceRender] = useState(0);

  // --- LOGIKA UTAMA ---
  // Fungsi ini menangani semua logika saat gambar ditekan.
  const handlePress = (index: number) => {
    const imageToUpdate = imageStates[index];

    // 1. Batasan Penskalaan Maksimum: Jika sudah diklik 2x, hentikan.
    if (imageToUpdate.clickCount >= 2) {
      return;
    }

    // 2. Penskalaan Bertahap: Tentukan skala berikutnya.
    // Klik pertama -> 1.2, Klik kedua -> 2.4
    const nextScale = imageToUpdate.clickCount === 0 ? 1.2 : 2.4;

    // 3. Jalankan Animasi Penskalaan: Implementasi logika penskalaan.
    Animated.timing(imageToUpdate.scale, {
      toValue: nextScale,
      duration: 300,
      useNativeDriver: true, // Penting untuk performa animasi yang mulus
    }).start();

    // 4. Penggantian Gambar & Update State: Implementasi logika penggantian gambar.
    imageToUpdate.isAlt = true;
    imageToUpdate.clickCount += 1;

    // Paksa komponen untuk re-render agar perubahan gambar (isAlt) terlihat
    setForceRender(val => val + 1);
  };

  // --- RENDER KOMPONEN ---
  // Fungsi untuk merender setiap item dalam FlatList
  const renderItem = ({ item, index }: { item: typeof images[0], index: number }) => {
    const state = imageStates[index];

    return (
      <Pressable onPress={() => handlePress(index)}>
        {/* Wrapper ini penting agar 'scale' tidak terpotong */}
        <View style={styles.imageWrapper}>
          <Animated.Image
            // Pilih gambar 'alt' jika isAlt true, jika tidak tampilkan 'main'
            source={{ uri: state.isAlt ? item.alt : item.main }}
            style={[
              styles.image,
              {
                // Terapkan animasi skala dari state
                transform: [{ scale: state.scale }],
                // zIndex memastikan gambar yang membesar tampil di atas yang lain
                zIndex: state.clickCount > 0 ? 10 : 1,
              },
            ]}
            resizeMode="cover"
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
        contentContainerStyle={styles.listContentContainer}
      />
      <View style={styles.footer}>
        <Text style={styles.name}>Muhammad Aditya Yudhistira</Text>
        <Text style={styles.nim}>105841114122</Text>
      </View>
    </View>
  );
}

// --- STYLESHEET ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
  },
  listContentContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: marginSize,
  },
  imageWrapper: {
    width: itemSize,
    height: itemSize,
    margin: marginSize,
    // Gaya ini penting agar gambar yang membesar tidak terpotong oleh batas view
    overflow: "visible",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: '#ccc' // Warna placeholder jika gambar lambat dimuat
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: '#fff',
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
