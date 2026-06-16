import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import { Colors } from '../theme/colors';
import { Typography } from './Typography';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  loading,
  disabled,
  style,
  textStyle,
  icon,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.96);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: Colors.secondary };
      case 'outline':
        return { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.secondary };
      case 'glass':
        return { backgroundColor: Colors.glass, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' };
      default:
        return { backgroundColor: Colors.primary };
    }
  };

  const getTextColor = () => {
    if (variant === 'primary') return '#000';
    return Colors.text.primary;
  };

  return (
    <AnimatedTouchable
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || loading}
      style={[
        styles.base,
        getVariantStyles(),
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon}
          <Typography variant="label" style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Typography>
        </>
      )}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  text: {
    fontSize: 15,
  },
  disabled: {
    opacity: 0.5,
  },
});
