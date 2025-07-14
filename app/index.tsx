import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  FlatList,
} from 'react-native';

// Data gambar utama dan gambar alternatif
const dataGambar = [
  { id: '1', utama: 'https://i.pinimg.com/736x/5b/be/35/5bbe354ee3c7c044039dbafe876ffb39.jpg', alternatif: 'https://i.pinimg.com/736x/98/05/d1/9805d186ebd59bfad0853c652a43b00a.jpg' },
  { id: '2', utama: 'https://i.pinimg.com/736x/7f/5e/de/7f5ede97a8c8c46b05a9e6322e2b12d1.jpg', alternatif: 'https://i.pinimg.com/736x/8d/ae/b1/8daeb1e49c043b0df2f9fcbb0f89a1db.jpg' },
  { id: '3', utama: 'https://i.pinimg.com/736x/64/70/d2/6470d283de499f1fc6ce8208f602c0f4.jpg', alternatif: 'https://i.pinimg.com/736x/2b/ca/d6/2bcad6870b9318b3085ec6c7643fbb14.jpg' },
  { id: '4', utama: 'https://i.pinimg.com/736x/2e/20/ba/2e20baa1b9fa8f61df7e10acaa4413b5.jpg', alternatif: 'https://i.pinimg.com/1200x/af/70/49/af7049655e197c83a0d4089a5332eb01.jpg' },
  { id: '5', utama: 'https://i.pinimg.com/736x/93/19/5e/93195e1a6322841441bc62d8172b3a32.jpg', alternatif: 'https://i.pinimg.com/736x/37/8a/51/378a5114a78f37b3798f559fa434b381.jpg' },
  { id: '6', utama: 'https://i.pinimg.com/736x/8d/b5/a2/8db5a20a2b2855c3cf256600fb18470d.jpg', alternatif: 'https://i.pinimg.com/736x/dc/28/d0/dc28d0c0fd6d31ca53330c5b66e8d80f.jpg' },
  { id: '7', utama: 'https://i.pinimg.com/736x/bd/66/94/bd6694b312091fa4333aa90e089fb55a.jpg', alternatif: 'https://i.pinimg.com/1200x/01/bb/0a/01bb0a8180d67c35e139c02b10f41553.jpg' },
  { id: '8', utama: 'https://i.pinimg.com/736x/e3/aa/17/e3aa175ead3fd9064ce4ef128973fd96.jpg', alternatif: 'https://i.pinimg.com/736x/2e/fb/a9/2efba901d4ae5c004c363252a0bb54e6.jpg' },
  { id: '9', utama: 'https://i.pinimg.com/736x/dc/14/91/dc1491d3f5fa357926c873be8036943c.jpg', alternatif: 'https://i.pinimg.com/736x/7d/f1/dd/7df1ddb428a923cc01c0825e0db42c7a.jpg' },
];

// Komponen sel individual dalam grid gambar
const SelGambar = ({ urlUtama, urlAlternatif }: { urlUtama: string; urlAlternatif: string }) => {
  const [gunakanAlternatif, setGunakanAlternatif] = useState(false);
  const [skala, setSkala] = useState(1);

  // Fungsi saat gambar ditekan: tukar gambar & perbesar skala
  const saatDitekan = () => {
    setGunakanAlternatif(sebelumnya => !sebelumnya);
    const skalaBaru = skala * 1.2;
    setSkala(skalaBaru <= 2 ? skalaBaru : 2);
  };

  // Tentukan URL gambar yang akan ditampilkan
  const urlGambar = gunakanAlternatif ? urlAlternatif : urlUtama;

  // Gaya dinamis untuk urutan tampilan (zIndex)
  const gayaKontainer = {
    zIndex: skala > 1 ? 99 : 1,
  };

  // Gaya dinamis untuk transformasi skala gambar
  const gayaGambar = {
    transform: [{ scale: skala }],
  };

  return (
    <Pressable
      onPress={saatDitekan}
      style={[gaya.selKontainer, gayaKontainer]}
    >
      <Image
        source={{ uri: urlGambar }}
        style={[gaya.gambar, gayaGambar]}
        resizeMode="cover"
      />
    </Pressable>
  );
};

// Komponen utama untuk menampilkan grid gambar
export default function Beranda() {
  return (
    <SafeAreaView style={gaya.areaAman}>
      <FlatList
        data={dataGambar}
        renderItem={({ item }) => (
          <SelGambar
            urlUtama={item.utama}
            urlAlternatif={item.alternatif}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        key={'tiga-kolom'}
      />
    </SafeAreaView>
  );
}

// Konstanta untuk ukuran grid
const jumlahKolom = 3;
const jarak = 8;
const lebarLayar = Dimensions.get('window').width;

// Hitung ukuran sel berdasarkan jumlah kolom dan jarak antar sel
const totalJarakHorizontal = jarak * (jumlahKolom + 1);
const ukuranSel = (lebarLayar - totalJarakHorizontal) / jumlahKolom;

// Objek gaya untuk seluruh komponen
const gaya = StyleSheet.create({
  areaAman: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: jarak / 2,
  },
  selKontainer: {
    width: ukuranSel,
    height: ukuranSel,
    margin: jarak / 2,
    backgroundColor: '#eee',
    overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',

  },
  gambar: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
