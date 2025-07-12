import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const imageData = [
  {
    id: 1,
    main: 'https://i.pinimg.com/736x/e3/aa/17/e3aa175ead3fd9064ce4ef128973fd96.jpg',
    alt: 'https://i.pinimg.com/736x/9a/1e/db/9a1edb3a20db9a56dd8c7adc4a32ba6a.jpg',
  },
  {
    id: 2,
    main: 'https://i.pinimg.com/736x/e5/b9/8a/e5b98aa4319968c4785b259a9ccdcb2e.jpg',
    alt: 'https://i.pinimg.com/736x/92/39/c5/9239c5a50c50781c82dcf3006350fece.jpg',
  },
  {
    id: 3,
    main: 'https://i.pinimg.com/736x/7c/14/c8/7c14c8596bb124afd094a5a4a9b4247b.jpg',
    alt: 'https://i.pinimg.com/736x/83/1d/5b/831d5b81372b8b0192acd49323fb06c6.jpg',
  },
  {
    id: 4,
    main: 'https://i.pinimg.com/736x/93/ee/ea/93eeea78e003dd356aa0d22f7a15d91f.jpg',
    alt: 'https://i.pinimg.com/736x/25/38/02/253802fab9b96754dd6356bccc9464bb.jpg',
  },
  {
    id: 5,
    main: 'https://i.pinimg.com/736x/4f/40/d3/4f40d35b156f79a0b421296f0d8f5c32.jpg',
    alt: 'https://i.pinimg.com/736x/83/18/58/83185882b35ffebaef4dde926043f16f.jpg',
  },
  {
    id: 6,
    main: 'https://i.pinimg.com/736x/c0/0c/ed/c00ceda54d7346b7ffa846edf3be1a08.jpg',
    alt: 'https://i.pinimg.com/736x/11/18/ca/1118ca3ad0419b362f26ae5a1a1c2056.jpg',
  },
  {
    id: 7,
    main: 'https://i.pinimg.com/736x/cb/51/43/cb51431ce5984f28b1f29314904437c6.jpg',
    alt: 'https://i.pinimg.com/736x/06/0f/4b/060f4b51059a74ca7880e0a136a25788.jpg',
  },
  {
    id: 8,
    main: 'https://i.pinimg.com/736x/51/8f/22/518f22aeb8cb1aae2a08dcbf1ca930b9.jpg',
    alt: 'https://i.pinimg.com/1200x/8f/32/0e/8f320ef24a24f093f8ffa474dfb767c8.jpg',
  },
  {
    id: 9,
    main: 'https://i.pinimg.com/736x/24/46/75/24467588c748f4fb716da446e43e5d62.jpg',
    alt: 'https://i.imgur.com/Z3KU4u7.jpg',
  },
];

export default function Index() {
  const [images, setImages] = useState(
    imageData.map(item => ({
      ...item,
      scale: 1.0,
      isAlt: false,
      loading: true,
      error: false,
    }))
  );

  const handlePress = (id: number) => {
    setImages(prev =>
      prev.map(img => {
        if (img.id === id && img.scale < 2.4) {
          const nextScale = Math.min(img.scale + 1.2, 2.4);
          return {
            ...img,
            scale: nextScale,
            isAlt: true,
          };
        }
        return img;
      })
    );
  };

  const handleLoadEnd = (id: number) => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, loading: false } : img
      )
    );
  };

  const handleError = (id: number) => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, error: true, loading: false } : img
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {images.map(image => (
          <TouchableOpacity
            key={image.id}
            onPress={() => handlePress(image.id)}
            disabled={image.scale >= 2.4}
            style={styles.cell}
          >
            {image.loading && !image.error && (
              <ActivityIndicator style={styles.loader} color="#999" size="small" />
            )}
            {image.error ? (
              <View style={styles.errorBox}>
                <Image
                  source={{
                    uri: "https://via.placeholder.com/100x100?text=Error",
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <Image
                source={{ uri: image.isAlt ? image.alt : image.main }}
                onLoadEnd={() => handleLoadEnd(image.id)}
                onError={() => handleError(image.id)}
                style={[
                  styles.image,
                  { transform: [{ scale: image.scale }] },
                ]}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 330,
  },
  cell: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#eee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
  errorBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
