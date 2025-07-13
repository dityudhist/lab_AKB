import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';

const initialImages = [
  {
    id: 1,
    main: 'https://i.pinimg.com/736x/e3/aa/17/e3aa175ead3fd9064ce4ef128973fd96.jpg',
    alt: 'https://i.pinimg.com/736x/9a/1e/db/9a1edb3a20db9a56dd8c7adc4a32ba6a.jpg',
    isFlipped:false, scale:1
  },
  {
    id: 2,
    main: 'https://i.pinimg.com/736x/e5/b9/8a/e5b98aa4319968c4785b259a9ccdcb2e.jpg',
    alt: 'https://i.pinimg.com/736x/92/39/c5/9239c5a50c50781c82dcf3006350fece.jpg',
    isFlipped:false, scale:1
  },
  {
    id: 3,
    main: 'https://i.pinimg.com/736x/7c/14/c8/7c14c8596bb124afd094a5a4a9b4247b.jpg',
    alt: 'https://i.pinimg.com/736x/83/1d/5b/831d5b81372b8b0192acd49323fb06c6.jpg',
    isFlipped:false, scale:1
  },
  {
    id: 4,
    main: 'https://i.pinimg.com/736x/93/ee/ea/93eeea78e003dd356aa0d22f7a15d91f.jpg',
    alt: 'https://i.pinimg.com/736x/25/38/02/253802fab9b96754dd6356bccc9464bb.jpg',
    isFlipped:false, scale:1
  },
  {
    id: 5,
    main: 'https://i.pinimg.com/736x/4f/40/d3/4f40d35b156f79a0b421296f0d8f5c32.jpg',
    alt: 'https://i.pinimg.com/736x/83/18/58/83185882b35ffebaef4dde926043f16f.jpg',
    isFlipped:false, scale:1
  },
  {
    id: 6,
    main: 'https://i.pinimg.com/736x/c0/0c/ed/c00ceda54d7346b7ffa846edf3be1a08.jpg',
    alt: 'https://i.pinimg.com/736x/11/18/ca/1118ca3ad0419b362f26ae5a1a1c2056.jpg',
    isFlipped:false, scale:1
  },
  {
    id: 7,
    main: 'https://i.pinimg.com/736x/cb/51/43/cb51431ce5984f28b1f29314904437c6.jpg',
    alt: 'https://i.pinimg.com/736x/06/0f/4b/060f4b51059a74ca7880e0a136a25788.jpg',
    isFlipped:false, scale:1
  },
  {
    id: 8,
    main: 'https://i.pinimg.com/736x/51/8f/22/518f22aeb8cb1aae2a08dcbf1ca930b9.jpg',
    alt: 'https://i.pinimg.com/1200x/8f/32/0e/8f320ef24a24f093f8ffa474dfb767c8.jpg',
    isFlipped:false, scale:1
  },
  {
    id: 9,
    main: 'https://i.pinimg.com/736x/24/46/75/24467588c748f4fb716da446e43e5d62.jpg',
    alt: 'https://i.imgur.com/Z3KU4u7.jpg',
    isFlipped:false, scale:1
  },
];

export default function App() {
  const [images, setImages] = useState(
    initialImages.map(img => ({
      ...img,
      isFlipped: false,
      scale: 1.0,
    }))
  );

  const handleImagePress = (id: number) => {
    setImages(prevImages =>
      prevImages.map(img => {
        if (img.id === id && img.scale < 2.4) {
          const nextScale = Math.min(img.scale + 1.2, 2.4);
          return {
            ...img,
            scale: nextScale,
            isFlipped: true,
          };
        }
        return img;
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Segitiga, Nama, NIM */}
      <View style={styles.header}>
        <View style={styles.triangle} />
        <View style={styles.nameBox}>
          <Text style={styles.nameText}>Muhammad Aditya Yudhistira</Text>
        </View>
        <View style={styles.nimBox}>
          <Text style={styles.nimText}>105841114122</Text>
        </View>
      </View>

      {/* Grid Gambar */}
      <View style={styles.gridContainer}>
        {images.map(image => (
          <TouchableOpacity
            key={image.id}
            onPress={() => handleImagePress(image.id)}
            disabled={image.scale >= 2.4}
            style={styles.gridCell}
          >
            <Image
              source={{ uri: image.isFlipped ? image.alt : image.main }}
              style={[
                styles.gridImage,
                { transform: [{ scale: image.scale }] },
              ]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 55,
    borderRightWidth: 55,
    borderBottomWidth: 95,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'yellow',
  },
  nameBox: {
    backgroundColor: 'maroon',
    height: 80,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    color: 'yellow',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nimBox: {
    width: 200,
    height: 70,
    borderRadius: 45,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  nimText: {
    fontSize: 25,
    color: 'pink',
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 330,
  },
  gridCell: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
