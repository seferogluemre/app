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
import { X, Calendar, Clock, Check } from 'lucide-react-native';
import Animated,w { FadeIn, SlideInUp } from 'react-native-reanimated';

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
        {/* Damping'i 25 yaparak o sallanma (spring) etkisini oturaklı hale getirdik */}
        <Animated.View
          entering={SlideInUp.springify().damping(25).stiffness(120)}
          style={styles.content}
        >
          <View style={styles.handle} />

          <View style={styles.header}>
            <View>
              <Typography variant="h2">Reservation</Typography>
              <Typography variant="caption" color={Colors.primary}>{place.name}</Typography>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color={Colors.text.primary} size={18} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Calendar size={16} color={Colors.text.secondary} />
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
                      style={[styles.itemText, selectedDate === date ? styles.selectedItemText : null]}
                    >
                      {date}
                    </Typography>
                    {selectedDate === date && <Check size={14} color="#FFF" style={styles.checkIcon} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={16} color={Colors.text.secondary} />
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
                      style={[styles.itemText, selectedTime === time ? styles.selectedItemText : null]}
                    >
                      {time}
                    </Typography>
                    {selectedTime === time && <Check size={14} color="#FFF" style={styles.checkIcon} />}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  flex: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 45,
    maxHeight: height * 0.75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.secondary,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    color: Colors.text.muted,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    minWidth: '47%',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedItem: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  selectedItemText: {
    color: '#FFF',
  },
  checkIcon: {
    marginLeft: 4,
  },
  footer: {
    paddingTop: Spacing.md,
  },
  confirmButton: {
    width: '100%',
  },
});
