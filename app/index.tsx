import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const initialGridImages = [
  {
    id: 1,
    mainSrc: "https://i.pinimg.com/736x/e3/aa/17/e3aa175ead3fd9064ce4ef128973fd96.jpg",
    altSrc: "https://i.pinimg.com/736x/9a/1e/db/9a1edb3a20db9a56dd8c7adc4a32ba6a.jpg",
    isFlipped: false,
    scale: 1,
  },
  {
    id: 2,
    mainSrc: "https://i.pinimg.com/736x/e5/b9/8a/e5b98aa4319968c4785b259a9ccdcb2e.jpg",
    altSrc: "https://i.pinimg.com/736x/92/39/c5/9239c5a50c50781c82dcf3006350fece.jpg",
    isFlipped: false,
    scale: 1,
  },
  {
    id: 3,
    mainSrc: "https://i.pinimg.com/736x/7c/14/c8/7c14c8596bb124afd094a5a4a9b4247b.jpg",
    altSrc: "https://i.pinimg.com/736x/83/1d/5b/831d5b81372b8b0192acd49323fb06c6.jpg",
    isFlipped: false,
    scale: 1,
  },
  {
    id: 4,
    mainSrc: "https://i.pinimg.com/736x/93/ee/ea/93eeea78e003dd356aa0d22f7a15d91f.jpg",
    altSrc: "https://i.pinimg.com/736x/25/38/02/253802fab9b96754dd6356bccc9464bb.jpg",
    isFlipped: false,
    scale: 1,
  },
  {
    id: 5,
    mainSrc: "https://i.pinimg.com/736x/4f/40/d3/4f40d35b156f79a0b421296f0d8f5c32.jpg",
    altSrc: "https://i.pinimg.com/736x/83/18/58/83185882b35ffebaef4dde926043f16f.jpg",
    isFlipped: false,
    scale: 1,
  },
  {
    id: 6,
    mainSrc: "https://i.pinimg.com/736x/c0/0c/ed/c00ceda54d7346b7ffa846edf3be1a08.jpg",
    altSrc: "https://i.pinimg.com/736x/11/18/ca/1118ca3ad0419b362f26ae5a1a1c2056.jpg",
    isFlipped: false,
    scale: 1,
  },
  {
    id: 7,
    mainSrc: "https://i.pinimg.com/736x/cb/51/43/cb51431ce5984f28b1f29314904437c6.jpg",
    altSrc: "https://i.pinimg.com/736x/06/0f/4b/060f4b51059a74ca7880e0a136a25788.jpg",
    isFlipped: false,
    scale: 1,
  },
  {
    id: 8,
    mainSrc: "https://i.pinimg.com/736x/51/8f/22/518f22aeb8cb1aae2a08dcbf1ca930b9.jpg",
    altSrc: "https://i.pinimg.com/1200x/8f/32/0e/8f320ef24a24f093f8ffa474dfb767c8.jpg",
    isFlipped: false,
    scale: 1,
  },
  {
    id: 9,
    mainSrc: "https://i.pinimg.com/736x/24/46/75/24467588c748f4fb716da446e43e5d62.jpg",
    altSrc: "https://i.imgur.com/Z3KU4u7.jpg",
    isFlipped: false,
    scale: 1,
  },
];

export default function ImageGridOnly() {
  const [gridImages, setGridImages] = useState(initialGridImages);

  const handleImagePress = (imageId: number) => {
    setGridImages(prev =>
      prev.map(image => {
        if (image.id === imageId) {
          if (image.scale >= 2.4) return image;
          const newScale = Math.min(image.scale * 1.2, 2.4);
          return {
            ...image,
            scale: newScale,
            isFlipped: true,
          };
        }
        return image;
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {gridImages.map(image => (
          <TouchableOpacity
            key={image.id}
            onPress={() => handleImagePress(image.id)}
            disabled={image.scale >= 2.4}
            style={styles.gridCell}
          >
            <Image
              source={{ uri: image.isFlipped ? image.altSrc : image.mainSrc }}
              style={[
                styles.gridImage,
                { transform: [{ scale: image.scale }] }
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
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 330,
  },
  gridCell: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
