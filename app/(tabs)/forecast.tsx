import Spacer from '@/components/spacer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, ScrollView, StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient colors={[themeColors.ambientBackgroundStart, themeColors.ambientBackgroundEnd]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <Spacer />

          <ThemedView style={styles.headerBarText}>
            <ThemedText style={{ color: themeColors.text, fontSize: 24, fontWeight: 'bold' }}>7-Day Forecast</ThemedText>
          </ThemedView>

          <Spacer />

          <ThemedView style={styles.cardGrid}>
            <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]} >
              <ThemedView style={styles.cardItem}>
                <ThemedView style={[styles.cardItem, { gap: 8 }]}>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>Today</ThemedText>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>🌤️</ThemedText>
                </ThemedView>
                <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>32°C / 24°C</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]} >
              <ThemedView style={styles.cardItem}>
                <ThemedView style={[styles.cardItem, { gap: 8 }]}>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>Saturday</ThemedText>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>☀️</ThemedText>
                </ThemedView>
                <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>32°C / 24°C</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]} >
              <ThemedView style={styles.cardItem}>
                <ThemedView style={[styles.cardItem, { gap: 8 }]}>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>Sunday</ThemedText>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>🌤️</ThemedText>
                </ThemedView>
                <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>32°C / 24°C</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]} >
              <ThemedView style={styles.cardItem}>
                <ThemedView style={[styles.cardItem, { gap: 8 }]}>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>Monday</ThemedText>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>☁️</ThemedText>
                </ThemedView>
                <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>32°C / 24°C</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]} >
              <ThemedView style={styles.cardItem}>
                <ThemedView style={[styles.cardItem, { gap: 8 }]}>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>Tuesday</ThemedText>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>⛈️</ThemedText>
                </ThemedView>
                <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>32°C / 24°C</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]} >
              <ThemedView style={styles.cardItem}>
                <ThemedView style={[styles.cardItem, { gap: 8 }]}>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>Wednesday</ThemedText>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>☀️</ThemedText>
                </ThemedView>
                <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>32°C / 24°C</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]} >
              <ThemedView style={styles.cardItem}>
                <ThemedView style={[styles.cardItem, { gap: 8 }]}>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>Thursday</ThemedText>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>☁️</ThemedText>
                </ThemedView>
                <ThemedText style={{ fontWeight: 'semibold', fontSize: 20}}>32°C / 24°C</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <Spacer height={20} />

          <ThemedView style={styles.card}>
            <ThemedView style={styles.cardItem}>
              <ThemedView style={[styles.cardItem, { gap: 8 }]}>
                <ThemedText style={{ fontSize: 30, fontWeight: 'semibold' }} >☀️</ThemedText>
                <ThemedView style={{ flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20 }} >Sunrise 6:00 AM</ThemedText>
                  <ThemedText style={{ fontWeight: 'semibold', fontSize: 20 }}>Sunset 6:00 PM</ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedText style={{ fontSize: 30, fontWeight: 'semibold' }}>☀️</ThemedText>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  headerBarText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: 'transparent',
  },
  card: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,

  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  cardGrid: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
});
