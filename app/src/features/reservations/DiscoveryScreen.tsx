import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Typography } from '../../components/Typography';
import { Colors, Spacing } from '../../theme/colors';
import { PLACES, Place } from './mockData';
import { Star, MapPin } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface PlaceCardProps {
  place: Place;
  onPress: (place: Place) => void;
  horizontal?: boolean;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress, horizontal }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(horizontal ? 0 : 200)}
      style={[styles.cardContainer, horizontal && styles.horizontalCard]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress(place)}
      >
        <Image source={{ uri: place.image }} style={styles.cardImage} />
        <View style={styles.cardOverlay} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Typography variant="caption" color={Colors.primary} style={styles.category}>
              {place.category}
            </Typography>
            <View style={styles.ratingContainer}>
              <Star size={12} color={Colors.primary} fill={Colors.primary} />
              <Typography variant="caption" style={styles.ratingText}>
                {place.rating}
              </Typography>
            </View>
          </View>
          <Typography variant="h2">{place.name}</Typography>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={Colors.text.secondary} />
            <Typography variant="caption">{place.location}</Typography>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const DiscoveryScreen: React.FC<{ onSelectPlace: (place: Place) => void }> = ({ onSelectPlace }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Typography variant="caption">WELCOME BACK</Typography>
          <Typography variant="h1">Explore Luxe</Typography>
        </View>
        <View style={styles.avatar} />
      </View>

      <View style={styles.section}>
        <Typography variant="label" style={styles.sectionTitle}>Featured</Typography>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {PLACES.map((place) => (
            <PlaceCard key={place.id} place={place} onPress={onSelectPlace} horizontal />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Typography variant="label" style={styles.sectionTitle}>All Locations</Typography>
        <View style={styles.verticalList}>
          {PLACES.map((place) => (
            <PlaceCard key={`v-${place.id}`} place={place} onPress={onSelectPlace} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    color: Colors.text.muted,
  },
  horizontalScroll: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.sm,
  },
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    marginBottom: Spacing.lg,
  },
  horizontalCard: {
    width: width * 0.75,
    marginRight: Spacing.md,
    marginBottom: 0,
  },
  cardImage: {
    width: '100%',
    height: 240,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  category: {
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: '700',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    opacity: 0.8,
  },
  verticalList: {
    paddingHorizontal: Spacing.lg,
  },
});
