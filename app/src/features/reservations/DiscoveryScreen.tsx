import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Typography } from '../../components/Typography';
import { Colors, Spacing } from '../../theme/colors';
import { PLACES, Place } from './mockData';
import { Star, MapPin, User, Moon, Bell, LogOut, Settings } from 'lucide-react-native';
import Animated, { FadeInDown, FadeIn, FadeOut } from 'react-native-reanimated';

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
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Typography variant="label" color={Colors.primary} style={styles.category}>
              {place.category}
            </Typography>
            <View style={styles.ratingContainer}>
              <Star size={10} color="#FFB800" fill="#FFB800" />
              <Typography variant="caption" style={styles.ratingText}>
                {place.rating}
              </Typography>
            </View>
          </View>
          <Typography variant="h2" color={Colors.text.primary}>{place.name}</Typography>
          <View style={styles.locationContainer}>
            <MapPin size={12} color={Colors.text.secondary} />
            <Typography variant="caption">{place.location}</Typography>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const DiscoveryScreen: React.FC<{ onSelectPlace: (place: Place) => void }> = ({ onSelectPlace }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Typography variant="caption">EXCLUSIVELY FOR YOU</Typography>
            <Typography variant="h1" color={Colors.text.primary}>Luxe Discovery</Typography>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Moon size={20} color={Colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => setShowProfileMenu(!showProfileMenu)}
            >
              <User size={20} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Section */}
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

        {/* All Locations */}
        <View style={styles.section}>
          <Typography variant="label" style={styles.sectionTitle}>All Locations</Typography>
          <View style={styles.verticalList}>
            {PLACES.map((place) => (
              <PlaceCard key={`v-${place.id}`} place={place} onPress={onSelectPlace} />
            ))}
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Profile Popover / Dropdown (Mock) */}
      {showProfileMenu && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={styles.popoverOverlay}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={() => setShowProfileMenu(false)}
          />
          <Animated.View
            entering={FadeInDown.springify().damping(20)}
            style={styles.popoverMenu}
          >
            <View style={styles.popoverItem}>
              <Bell size={18} color={Colors.text.primary} />
              <Typography>Notifications</Typography>
            </View>
            <View style={styles.popoverItem}>
              <Settings size={18} color={Colors.text.primary} />
              <Typography>Settings</Typography>
            </View>
            <View style={[styles.popoverItem, styles.logoutItem]}>
              <LogOut size={18} color={Colors.status.error} />
              <Typography color={Colors.status.error}>Logout</Typography>
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    color: Colors.text.muted,
    fontSize: 12,
  },
  horizontalScroll: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.sm,
  },
  cardContainer: {
    borderRadius: 22,
    backgroundColor: Colors.card,
    marginBottom: Spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  horizontalCard: {
    width: width * 0.78,
    marginRight: Spacing.md,
    marginBottom: 0,
  },
  cardImage: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  cardContent: {
    padding: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  category: {
    fontSize: 10,
    fontWeight: '700',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: Colors.text.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    opacity: 0.6,
  },
  verticalList: {
    paddingHorizontal: Spacing.lg,
  },
  popoverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popoverMenu: {
    position: 'absolute',
    top: 120,
    right: 20,
    width: 200,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
  },
  logoutItem: {
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  }
});
