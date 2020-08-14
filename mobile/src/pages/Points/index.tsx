import React from 'react';
import { Feather as Icon} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';

import styles from './styles';

const Points = () => {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail() {
    navigation.navigate('Detail');
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
          <MapView 
            style={styles.map} 
            initialRegion={{
              latitude: -23.0422703,
              longitude: -46.9707956,
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
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://10.0.0.108:3333/uploads/lampada.svg" />
            <Text style={styles.itemTitle}>Lâmpada</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://10.0.0.108:3333/uploads/lampada.svg" />
            <Text style={styles.itemTitle}>Lâmpada</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://10.0.0.108:3333/uploads/lampada.svg" />
            <Text style={styles.itemTitle}>Lâmpada</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://10.0.0.108:3333/uploads/lampada.svg" />
            <Text style={styles.itemTitle}>Lâmpada</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://10.0.0.108:3333/uploads/lampada.svg" />
            <Text style={styles.itemTitle}>Lâmpada</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://10.0.0.108:3333/uploads/lampada.svg" />
            <Text style={styles.itemTitle}>Lâmpada</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>

  );
}

export default Points;