import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

// 9 pasangan gambar utama dan alternatif
const imagePairs = [
  {
    main: "https://i.pinimg.com/736x/e3/aa/17/e3aa175ead3fd9064ce4ef128973fd96.jpg",
    alt: "https://i.pinimg.com/736x/9a/1e/db/9a1edb3a20db9a56dd8c7adc4a32ba6a.jpg",
  },
  {
    main: "https://i.pinimg.com/736x/e5/b9/8a/e5b98aa4319968c4785b259a9ccdcb2e.jpg",
    alt: "https://i.pinimg.com/736x/92/39/c5/9239c5a50c50781c82dcf3006350fece.jpg",
  },
  {
    main: "https://i.pinimg.com/736x/7c/14/c8/7c14c8596bb124afd094a5a4a9b4247b.jpg",
    alt: "https://i.pinimg.com/736x/83/1d/5b/831d5b81372b8b0192acd49323fb06c6.jpg",
  },
  {
    main: "https://i.pinimg.com/736x/93/ee/ea/93eeea78e003dd356aa0d22f7a15d91f.jpg",
    alt: "https://i.pinimg.com/736x/25/38/02/253802fab9b96754dd6356bccc9464bb.jpg",
  },
  {
    main: "https://i.pinimg.com/736x/4f/40/d3/4f40d35b156f79a0b421296f0d8f5c32.jpg",
    alt: "https://i.pinimg.com/736x/83/18/58/83185882b35ffebaef4dde926043f16f.jpg",
  },
  {
    main: "https://i.pinimg.com/736x/c0/0c/ed/c00ceda54d7346b7ffa846edf3be1a08.jpg",
    alt: "https://i.pinimg.com/736x/11/18/ca/1118ca3ad0419b362f26ae5a1a1c2056.jpg",
  },
  {
    main: "https://i.pinimg.com/736x/cb/51/43/cb51431ce5984f28b1f29314904437c6.jpg",
    alt: "https://i.pinimg.com/736x/06/0f/4b/060f4b51059a74ca7880e0a136a25788.jpg",
  },
  {
    main: "https://i.pinimg.com/736x/51/8f/22/518f22aeb8cb1aae2a08dcbf1ca930b9.jpg",
    alt: "https://i.pinimg.com/1200x/8f/32/0e/8f320ef24a24f093f8ffa474dfb767c8.jpg",
  },
  {
    main: "https://i.pinimg.com/736x/24/46/75/24467588c748f4fb716da446e43e5d62.jpg",
    alt: "https://i.imgur.com/Z3KU4u7.jpg",
  },
];

// Ukuran dinamis untuk grid 3x3
const IMAGE_SIZE = Dimensions.get('window').width / 3 - 20;

export default function Index() {
  // State tiap gambar: clickCount & apakah alt image aktif
  const [states, setStates] = useState(
    imagePairs.map(() => ({
      clickCount: 0,
      isAlt: false,
    }))
  );

  const handleImageClick = (index: number) => {
    setStates(prev =>
      prev.map((item, i) => {
        if (i !== index) return item;

        const newClickCount = item.clickCount + 1;
        const newScale = 1 + newClickCount * 1.2;

        // Jika melebihi batas klik (2) atau skala (2.4), jangan ubah
        if (newClickCount > 2 || newScale > 2.4) return item;

        return {
          clickCount: newClickCount,
          isAlt: true, // aktifkan gambar alternatif setelah klik pertama
        };
      })
    );
  };

  return (
    <View style={styles.container}>
      {imagePairs.map((pair, index) => {
        const { clickCount, isAlt } = states[index];
        const scale = 1 + clickCount * 1.2;
        const isMaxed = scale >= 2.4;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (!isMaxed) handleImageClick(index);
            }}
            activeOpacity={0.9}
            style={{ transform: [{ scale }] }}
          >
            <ExpoImage
              source={{ uri: isAlt ? pair.alt : pair.main }}
              style={styles.image}
              contentFit="cover"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    padding: 16,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 10,
  },
});
