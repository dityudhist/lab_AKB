import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  FlatList,
  Text,
  View,
} from 'react-native';

const dataGambar = [
  {
    id: '1',
    utama: 'https://i.pinimg.com/736x/e3/aa/17/e3aa175ead3fd9064ce4ef128973fd96.jpg',
    alternatif: 'https://i.pinimg.com/736x/9a/1e/db/9a1edb3a20db9a56dd8c7adc4a32ba6a.jpg',
  },
  {
    id: '2',
    utama: 'https://i.pinimg.com/736x/e5/b9/8a/e5b98aa4319968c4785b259a9ccdcb2e.jpg',
    alternatif: 'https://i.pinimg.com/736x/92/39/c5/9239c5a50c50781c82dcf3006350fece.jpg',
  },
  {
    id: '3',
    utama: 'https://i.pinimg.com/736x/7c/14/c8/7c14c8596bb124afd094a5a4a9b4247b.jpg',
    alternatif: 'https://i.pinimg.com/736x/83/1d/5b/831d5b81372b8b0192acd49323fb06c6.jpg',
  },
  {
    id: '4',
    utama: 'https://i.pinimg.com/736x/93/ee/ea/93eeea78e003dd356aa0d22f7a15d91f.jpg',
    alternatif: 'https://i.pinimg.com/736x/25/38/02/253802fab9b96754dd6356bccc9464bb.jpg',
  },
  {
    id: '5',
    utama: 'https://i.pinimg.com/736x/4f/40/d3/4f40d35b156f79a0b421296f0d8f5c32.jpg',
    alternatif: 'https://i.pinimg.com/736x/83/18/58/83185882b35ffebaef4dde926043f16f.jpg',
  },
  {
    id: '6',
    utama: 'https://i.pinimg.com/736x/c0/0c/ed/c00ceda54d7346b7ffa846edf3be1a08.jpg',
    alternatif: 'https://i.pinimg.com/736x/11/18/ca/1118ca3ad0419b362f26ae5a1a1c2056.jpg',
  },
  {
    id: '7',
    utama: 'https://i.pinimg.com/736x/cb/51/43/cb51431ce5984f28b1f29314904437c6.jpg',
    alternatif: 'https://i.pinimg.com/736x/06/0f/4b/060f4b51059a74ca7880e0a136a25788.jpg',
  },
  {
    id: '8',
    utama: 'https://i.pinimg.com/736x/51/8f/22/518f22aeb8cb1aae2a08dcbf1ca930b9.jpg',
    alternatif: 'https://i.pinimg.com/1200x/8f/32/0e/8f320ef24a24f093f8ffa474dfb767c8.jpg',
  },
  {
    id: '9',
    utama: 'https://i.pinimg.com/736x/24/46/75/24467588c748f4fb716da446e43e5d62.jpg',
    alternatif: 'https://i.imgur.com/Z3KU4u7.jpg',
  },
];

const SelGambarGrid = ({ utama, alternatif }: { utama: string; alternatif: string }) => {
  // State untuk menyimpan apakah gambar sedang menunjukkan versi alternatif
  const [diganti, setDiganti] = useState(false);

  // State untuk menyimpan nilai skala gambar (default 1.0)
  const [skala, setSkala] = useState(1);

  // Fungsi yang dipanggil saat gambar ditekan
  const saatDitekan = () => {
    // Ubah gambar antara utama dan alternatif
    setDiganti(prev => !prev);

    // Hitung skala baru: tambahkan 20% dari skala saat ini
    const skalaBaru = skala * 1.2;

    // Tetapkan skala maksimal 2x (tidak boleh lebih dari 2)
    setSkala(skalaBaru <= 2 ? skalaBaru : 2);
  };

  // Tentukan URL gambar yang akan ditampilkan
  const urlGambar = diganti ? alternatif : utama;

  return (
    <Pressable
      onPress={saatDitekan}
      style={[gaya.wadahSel, { zIndex: skala > 1 ? 99 : 1 }]}
    >
      <Image
        source={{ uri: urlGambar }}
        style={[gaya.gambar, { transform: [{ scale: skala }] }]} // Terapkan transformasi skala
        resizeMode="cover"
      />
    </Pressable>
  );
};


export default function Beranda() {
  return (
    <SafeAreaView style={gaya.areaAman}>
      <FlatList
        data={dataGambar}
        renderItem={({ item }) => (
          <SelGambarGrid utama={item.utama} alternatif={item.alternatif} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        key={'tiga-kolom'}
        ListFooterComponent={
          <View style={gaya.wadahInfo}>
            <Text style={gaya.teksNama}>Muhammad Aditya Yudhistira</Text>
            <Text style={gaya.teksNomor}>105841114122</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const jumlahKolom = 3;
const jarak = 8;
const lebarLayar = Dimensions.get('window').width;
const totalJarakHorizontal = jarak * (jumlahKolom + 1);
const ukuranSel = (lebarLayar - totalJarakHorizontal) / jumlahKolom;

const gaya = StyleSheet.create({
  areaAman: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: jarak / 2,
  },
  wadahSel: {
    width: ukuranSel,
    height: ukuranSel,
    margin: jarak / 2,
    backgroundColor: '#eee',
  },
  gambar: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  wadahInfo: {
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  teksNama: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  teksNomor: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
