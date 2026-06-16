import React, { createContext, useContext, useState, useCallback } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { Typography } from './Typography';
import { Colors } from '../theme/colors';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');
  const translateY = useSharedValue(-100);

  const hideToast = useCallback(() => {
    translateY.value = withTiming(-100, { duration: 300 }, () => {
      runOnJS(setMessage)('');
    });
  }, []);

  const showToast = useCallback((msg: string, t: ToastType = 'info') => {
    setMessage(msg);
    setType(t);
    translateY.value = withSpring(60);

    setTimeout(() => {
      hideToast();
    }, 3000);
  }, [hideToast]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 color={Colors.status.success} size={20} />;
      case 'error': return <AlertCircle color={Colors.status.error} size={20} />;
      default: return <Info color={Colors.status.info} size={20} />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message ? (
        <Animated.View style={[styles.toastContainer, animatedStyle]}>
          <View style={styles.content}>
            {getIcon()}
            <Typography style={styles.text}>{message}</Typography>
          </View>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  content: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
});
