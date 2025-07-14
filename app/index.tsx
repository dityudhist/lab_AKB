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
 * Tipe properti untuk komponen sel gambar individual
 */
type ImageCellProps = {
  primaryUrl: string;
  alternateUrl: string;
};

/**
 * Komponen individual untuk setiap sel gambar dalam grid
 * - Menangani penskalaan individu (scale)
 * - Berganti ke gambar alternatif saat diklik
 * - Maksimum penskalaan: 2x
 */
const ImageCell: React.FC<ImageCellProps> = ({ primaryUrl, alternateUrl }) => {
  const [useAlternate, setUseAlternate] = useState(false);
  const [scale, setScale] = useState(1);

  /**
   * Saat gambar diklik:
   * - Ganti gambar utama <-> alternatif
   * - Perbesar gambar 1.2x jika belum mencapai skala maksimal
   */
  const handlePress = () => {
    const newScale = scale * 1.2;
    setUseAlternate(prev => !prev);
    setScale(newScale <= 2 ? newScale : 2); // Maksimal 2x
  };

  /**
   * Penanganan jika gambar gagal dimuat
   */
  const handleImageError = () => {
    Alert.alert('Error', 'Gagal memuat gambar.');
  };

  return (
    <Pressable onPress={handlePress} style={[styles.cell, { zIndex: scale > 1 ? 1 : 0 }]}>
      <Image
        source={{ uri: useAlternate ? alternateUrl : primaryUrl }}
        style={[styles.image, { transform: [{ scale }] }]}
        resizeMode="cover"
        onError={handleImageError}
      />
    </Pressable>
  );
};

/**
 * Dataset gambar utama dan alternatif (9 pasang gambar)
 */
const imageData = [
  {
    id: '1',
    primary: 'https://picsum.photos/id/10/200',
    alternate: 'https://picsum.photos/id/1/200',
  },
  {
    id: '2',
    primary: 'https://picsum.photos/id/2/200',
    alternate: 'https://picsum.photos/id/99/200',
  },
  {
    id: '3',
    primary: 'https://picsum.photos/id/12/200',
    alternate: 'https://picsum.photos/id/98/200',
  },
  {
    id: '4',
    primary: 'https://picsum.photos/id/65/200',
    alternate: 'https://picsum.photos/id/96/200',
  },
  {
    id: '5',
    primary: 'https://picsum.photos/id/95/200',
    alternate: 'https://picsum.photos/id/94/200',
  },
  {
    id: '6',
    primary: 'https://picsum.photos/id/93/200',
    alternate: 'https://picsum.photos/id/92/200',
  },
  {
    id: '7',
    primary: 'https://picsum.photos/id/91/200',
    alternate: 'https://picsum.photos/id/90/200',
  },
  {
    id: '8',
    primary: 'https://picsum.photos/id/89/200',
    alternate: 'https://picsum.photos/id/88/200',
  },
  {
    id: '9',
    primary: 'https://picsum.photos/id/87/200',
    alternate: 'https://picsum.photos/id/86/200',
  },
];

/**
 * Komponen utama yang menampilkan semua gambar dalam grid 3x3
 */
export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={imageData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <ImageCell primaryUrl={item.primary} alternateUrl={item.alternate} />
        )}
      />
    </SafeAreaView>
  );
}

/**
 * Gaya dan perhitungan ukuran cell agar semua sel gambar sama besar
 */
const numColumns = 3;
const spacing = 8;
const screenWidth = Dimensions.get('window').width;
const totalSpacing = spacing * (numColumns + 1);
const cellSize = (screenWidth - totalSpacing) / numColumns;

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
