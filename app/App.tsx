import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { ToastProvider, useToast } from './src/components/ToastContext';
import { DiscoveryScreen } from './src/features/reservations/DiscoveryScreen';
import { BookingModal } from './src/features/reservations/BookingModal';
import { Colors } from './src/theme/colors';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_300Light } from '@expo-google-fonts/inter';
import { Place } from './src/features/reservations/mockData';

function MainApp() {
  const { showToast } = useToast();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelectPlace = (place: Place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const handleConfirmBooking = (booking: { date: string, time: string }) => {
    setModalVisible(false);
    // Burada backend'e istek atacağız ileride
    setTimeout(() => {
      showToast(`${selectedPlace?.name} için ${booking.date} saat ${booking.time} rezervasyonun alındı!`, 'success');
    }, 500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <DiscoveryScreen onSelectPlace={handleSelectPlace} />
      <BookingModal
        isVisible={isModalVisible}
        place={selectedPlace}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmBooking}
      />
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
