import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';

/**
 * Image dataset: each item contains a primary and an alternate image URL.
 * These will be displayed in a 3x3 grid.
 */
const imageData = [
  { id: '1', primary: 'https://i.pinimg.com/736x/5b/be/35/5bbe354ee3c7c044039dbafe876ffb39.jpg', alternate: 'https://i.pinimg.com/736x/98/05/d1/9805d186ebd59bfad0853c652a43b00a.jpg' },
  { id: '2', primary: 'https://i.pinimg.com/736x/7f/5e/de/7f5ede97a8c8c46b05a9e6322e2b12d1.jpg', alternate: 'https://i.pinimg.com/736x/8d/ae/b1/8daeb1e49c043b0df2f9fcbb0f89a1db.jpg' },
  { id: '3', primary: 'https://i.pinimg.com/736x/64/70/d2/6470d283de499f1fc6ce8208f602c0f4.jpg', alternate: 'https://i.pinimg.com/736x/2b/ca/d6/2bcad6870b9318b3085ec6c7643fbb14.jpg' },
  { id: '4', primary: 'https://i.pinimg.com/736x/2e/20/ba/2e20baa1b9fa8f61df7e10acaa4413b5.jpg', alternate: 'https://i.pinimg.com/1200x/af/70/49/af7049655e197c83a0d4089a5332eb01.jpg' },
  { id: '5', primary: 'https://i.pinimg.com/736x/93/19/5e/93195e1a6322841441bc62d8172b3a32.jpg', alternate: 'https://i.pinimg.com/736x/37/8a/51/378a5114a78f37b3798f559fa434b381.jpg' },
  { id: '6', primary: 'https://i.pinimg.com/736x/8d/b5/a2/8db5a20a2b2855c3cf256600fb18470d.jpg', alternate: 'https://i.pinimg.com/736x/dc/28/d0/dc28d0c0fd6d31ca53330c5b66e8d80f.jpg' },
  { id: '7', primary: 'https://i.pinimg.com/736x/bd/66/94/bd6694b312091fa4333aa90e089fb55a.jpg', alternate: 'https://i.pinimg.com/1200x/01/bb/0a/01bb0a8180d67c35e139c02b10f41553.jpg' },
  { id: '8', primary: 'https://i.pinimg.com/736x/e3/aa/17/e3aa175ead3fd9064ce4ef128973fd96.jpg', alternate: 'https://i.pinimg.com/736x/2e/fb/a9/2efba901d4ae5c004c363252a0bb54e6.jpg' },
  { id: '9', primary: 'https://i.pinimg.com/736x/dc/14/91/dc1491d3f5fa357926c873be8036943c.jpg', alternate: 'https://i.pinimg.com/736x/7d/f1/dd/7df1ddb428a923cc01c0825e0db42c7a.jpg' },
];

/**
 * ImageCell component:
 * - Handles individual image display and interaction
 * - Each cell can be scaled independently
 * - Toggle between primary and alternate image on press
 */
const ImageCell = ({ primaryUrl, alternateUrl }: { primaryUrl: string; alternateUrl: string }) => {
  const [useAlternate, setUseAlternate] = useState(false);
  const [scale, setScale] = useState(1);

  const handlePress = () => {
    setUseAlternate(prev => !prev);
    const newScale = scale * 1.2;
    setScale(newScale <= 2 ? newScale : 2); // Max scale is 2x
  };

  const handleImageError = () => {
    Alert.alert("Image Load Failed", "One of the images could not be loaded.");
  };

  const imageUrl = useAlternate ? alternateUrl : primaryUrl;

  return (
    <Pressable onPress={handlePress} style={[styles.cell, { zIndex: scale > 1 ? 99 : 1 }]}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { transform: [{ scale }] }]}
        resizeMode="cover"
        onError={handleImageError} // Handle invalid/missing image
      />
    </Pressable>
  );
};

/**
 * HomeScreen:
 * - Renders the 3x3 image grid
 * - Each image uses ImageCell component
 */
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={imageData}
        renderItem={({ item }) => (
          <ImageCell
            primaryUrl={item.primary}
            alternateUrl={item.alternate}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        key="grid"
      />
    </SafeAreaView>
  );
}

/////////////////////////
// Layout Calculations //
/////////////////////////
const columns = 3;
const spacing = 8;
const screenWidth = Dimensions.get('window').width;
const totalSpacing = spacing * (columns + 1);
const cellSize = (screenWidth - totalSpacing) / columns;

//////////////////////
// Styling Section  //
//////////////////////
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: spacing / 2,
  },
  cell: {
    width: cellSize,
    height: cellSize,
    margin: spacing / 2,
    backgroundColor: '#eee',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
