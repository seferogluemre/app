import React from 'react';
import { Text, TextStyle, StyleSheet, StyleProp } from 'react-native';
import { useTheme } from '../theme/colors';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'body' | 'caption' | 'label';
  style?: StyleProp<TextStyle>;
  color?: string;
  numberOfLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  style,
  color,
  numberOfLines
}) => {
  const { colors } = useTheme();

  const getStyle = () => {
    switch (variant) {
      case 'h1': return styles.h1;
      case 'h2': return styles.h2;
      case 'caption': return styles.caption;
      case 'label': return styles.label;
      default: return styles.body;
    }
  };

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        getStyle(),
        { color: color || colors.text.primary },
        style
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 28,
    letterSpacing: -1,
  },
  h2: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    letterSpacing: -0.5,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 22,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.text.secondary,
  },
});
