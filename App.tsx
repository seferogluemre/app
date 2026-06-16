import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { ToastProvider, useToast } from './src/components/ToastContext';
import { DiscoveryScreen } from './src/features/reservations/DiscoveryScreen';
import { Colors } from './src/theme/colors';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_300Light } from '@expo-google-fonts/inter';
import { Place } from './src/features/reservations/mockData';

function MainApp() {
  const { showToast } = useToast();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleSelectPlace = (place: Place) => {
    setSelectedPlace(place);
    showToast(`${place.name} seçildi. Rezervasyon ekranı hazırlanıyor...`, 'info');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <DiscoveryScreen onSelectPlace={handleSelectPlace} />
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
