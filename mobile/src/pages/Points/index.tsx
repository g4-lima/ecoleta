import React, { useState, useEffect } from 'react';
import { Feather as Icon} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';
import api from '../../services/api';

import styles from './styles';

interface Items {
  id: number;
  title: string;
  image_url: string;
}

const Points = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState<Items[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialposition, setInitialPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Oooops...', 'Precisamos de sua permisão para obter a localização');
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([
        latitude,
        longitude
      ]);
    }

    loadPosition();
  }, [])

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail() {
    navigation.navigate('Detail');
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          { initialposition[0] !== 0 && (
            <MapView 
            style={styles.map}
            loadingEnabled={initialposition[0] === 0} 
            initialRegion={{
              latitude: initialposition[0],
              longitude: initialposition[1],
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }} 
            >
              <Marker
                style={styles.mapMarker}
                onPress={handleNavigateToDetail} 
                coordinate={{
                  latitude: -23.0422703,
                  longitude: -46.9707956,
                }}
              >
                <View style={styles.mapMarkerContainer}>
                  <Image style={styles.mapMarkerImage} source={{ uri: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' }} />
                  <Text style={styles.mapMarkerTitle}>Mercado</Text>
                </View>
              </Marker>
            </MapView>
          ) }
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map(item => (
            <TouchableOpacity 
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]} 
              onPress={() => handleSelectItem(item.id)}
              key={String(item.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          
        </ScrollView>
      </View>
    </>

  );
}

export default Points;