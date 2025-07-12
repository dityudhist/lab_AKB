import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width / 3;

type ImageItem = {
  id: number;
  main: string;
  alt: string;
};

const images: ImageItem[] = [
  {
    id: 1,
    main: "https://i.pinimg.com/736x/e3/aa/17/e3aa175ead3fd9064ce4ef128973fd96.jpg",
    alt: "https://i.pinimg.com/736x/9a/1e/db/9a1edb3a20db9a56dd8c7adc4a32ba6a.jpg",
  },
  {
    id: 2,
    main: "https://i.pinimg.com/736x/e5/b9/8a/e5b98aa4319968c4785b259a9ccdcb2e.jpg",
    alt: "https://i.pinimg.com/736x/92/39/c5/9239c5a50c50781c82dcf3006350fece.jpg",
  },
  {
    id: 3,
    main: "https://i.pinimg.com/736x/7c/14/c8/7c14c8596bb124afd094a5a4a9b4247b.jpg",
    alt: "https://i.pinimg.com/736x/83/1d/5b/831d5b81372b8b0192acd49323fb06c6.jpg",
  },
  {
    id: 4,
    main: "https://i.pinimg.com/736x/93/ee/ea/93eeea78e003dd356aa0d22f7a15d91f.jpg",
    alt: "https://i.pinimg.com/736x/25/38/02/253802fab9b96754dd6356bccc9464bb.jpg",
  },
  {
    id: 5,
    main: "https://i.pinimg.com/736x/4f/40/d3/4f40d35b156f79a0b421296f0d8f5c32.jpg",
    alt: "https://i.pinimg.com/736x/83/18/58/83185882b35ffebaef4dde926043f16f.jpg",
  },
  {
    id: 6,
    main: "https://i.pinimg.com/736x/c0/0c/ed/c00ceda54d7346b7ffa846edf3be1a08.jpg",
    alt: "https://i.pinimg.com/736x/11/18/ca/1118ca3ad0419b362f26ae5a1a1c2056.jpg",
  },
  {
    id: 7,
    main: "https://i.pinimg.com/736x/cb/51/43/cb51431ce5984f28b1f29314904437c6.jpg",
    alt: "https://i.pinimg.com/736x/06/0f/4b/060f4b51059a74ca7880e0a136a25788.jpg",
  },
  {
    id: 8,
    main: "https://i.pinimg.com/736x/51/8f/22/518f22aeb8cb1aae2a08dcbf1ca930b9.jpg",
    alt: "https://i.pinimg.com/1200x/8f/32/0e/8f320ef24a24f093f8ffa474dfb767c8.jpg",
  },
  {
    id: 9,
    main: "https://i.pinimg.com/736x/24/46/75/24467588c748f4fb716da446e43e5d62.jpg",
    alt: "https://i.imgur.com/Z3KU4u7.jpg",
  },
];

export default function IndexPage() {
  const [useAltImages, setUseAltImages] = useState<boolean[]>(Array(images.length).fill(false));
  const [scales, setScales] = useState<number[]>(Array(images.length).fill(1));
  const [animatedScales] = useState<Animated.Value[]>(
    () => images.map(() => new Animated.Value(1))
  );

  const handlePress = (index: number) => {
    const currentScale = scales[index];
    let nextScale = currentScale * 1.2;

    if (nextScale > 2.0) nextScale = 2.0;

    // Toggle gambar alternatif saat pertama kali diklik
    if (!useAltImages[index]) {
      const updatedAlt = [...useAltImages];
      updatedAlt[index] = true;
      setUseAltImages(updatedAlt);
    }

    // Simpan nilai skala
    const updatedScales = [...scales];
    updatedScales[index] = nextScale;
    setScales(updatedScales);

    Animated.timing(animatedScales[index], {
      toValue: nextScale,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <FlatList
      data={images}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <Pressable onPress={() => handlePress(index)}>
          <Animated.Image
            source={{ uri: useAltImages[index] ? item.alt : item.main }}
            style={[
              styles.image,
              { transform: [{ scale: animatedScales[index] }] },
            ]}
            resizeMode="cover"
          />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
