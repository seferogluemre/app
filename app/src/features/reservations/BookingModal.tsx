import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Colors, Spacing } from '../../theme/colors';
import { Place } from './mockData';
import { X, Calendar, Clock } from 'lucide-react-native';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

interface BookingModalProps {
  isVisible: boolean;
  onClose: () => void;
  place: Place | null;
  onConfirm: (booking: { date: string, time: string }) => void;
}

const DATES = ['Jun 17', 'Jun 18', 'Jun 19', 'Jun 20', 'Jun 21'];
const TIMES = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

export const BookingModal: React.FC<BookingModalProps> = ({
  isVisible,
  onClose,
  place,
  onConfirm
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!place) return null;

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm({ date: selectedDate, time: selectedTime });
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View entering={FadeIn} style={styles.overlay}>
        <TouchableOpacity style={styles.flex} onPress={onClose} />
        <Animated.View entering={SlideInUp.springify().damping(15)} style={styles.content}>
          <View style={styles.header}>
            <Typography variant="h2">Reserve at {place.name}</Typography>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color={Colors.text.primary} size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Calendar size={18} color={Colors.primary} />
                <Typography variant="label" style={styles.sectionLabel}>Select Date</Typography>
              </View>
              <View style={styles.grid}>
                {DATES.map((date) => (
                  <TouchableOpacity
                    key={date}
                    onPress={() => setSelectedDate(date)}
                    style={[
                      styles.gridItem,
                      selectedDate === date && styles.selectedItem
                    ]}
                  >
                    <Typography
                      style={[selectedDate === date && styles.selectedItemText]}
                    >
                      {date}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={18} color={Colors.primary} />
                <Typography variant="label" style={styles.sectionLabel}>Select Time</Typography>
              </View>
              <View style={styles.grid}>
                {TIMES.map((time) => (
                  <TouchableOpacity
                    key={time}
                    onPress={() => setSelectedTime(time)}
                    style={[
                      styles.gridItem,
                      selectedTime === time && styles.selectedItem
                    ]}
                  >
                    <Typography
                      style={[selectedTime === time && styles.selectedItemText]}
                    >
                      {time}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title="Confirm Reservation"
              disabled={!selectedDate || !selectedTime}
              onPress={handleConfirm}
              style={styles.confirmButton}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  flex: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    maxHeight: height * 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    color: Colors.text.secondary,
    fontSize: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  selectedItem: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  selectedItemText: {
    color: '#000',
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: Spacing.lg,
  },
  confirmButton: {
    width: '100%',
  },
});
