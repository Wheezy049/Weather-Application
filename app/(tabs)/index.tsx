import { Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from 'react-native';

import Spacer from '@/components/spacer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient
        colors={[themeColors.ambientBackgroundStart, themeColors.ambientBackgroundEnd]}
        style={styles.fullScreenBackground}
      >
          
          <Spacer height={10} />

        {isSearchActive ? (
          <ThemedView style={styles.headerBar}>
            <ThemedView style={[styles.searchInputContainer, { backgroundColor: themeColors.background }]}>
              <ThemedText style={styles.searchIconInInput}>🔍</ThemedText>
              <TextInput
                placeholder="Search for a city"
                placeholderTextColor={themeColors.subtext}
                style={[styles.searchInput, { color: themeColors.text }]}
                autoFocus
              />
              <TouchableOpacity onPress={() => setIsSearchActive(false)}>
                <ThemedText style={[styles.cancelSearchIcon, { color: themeColors.text }]}>✕</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        ) : (
          <ThemedView style={styles.headerBar}>
            <ThemedText style={[styles.locationText, { color: themeColors.text }]}>Lagos, Nigeria 📍</ThemedText>
            <TouchableOpacity onPress={() => setIsSearchActive(true)} style={styles.searchIcon}>
              <ThemedText style={{ color: themeColors.text, fontSize: 24 }}>🔍</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>

          <Spacer />

          <ThemedView style={styles.heroContainer}>
            <ThemedText style={[styles.heroTemp, { color: themeColors.text }]}>28°C</ThemedText>
            <ThemedText style={[styles.heroDescription, { color: themeColors.text }]}>Mostly Sunny</ThemedText>
            <ThemedText style={[styles.heroDetails, { color: themeColors.subtext }]}>
              Feels like 30°C | H: 32°C / L: 24°C
            </ThemedText>
          </ThemedView>

          <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]}>
            <ThemedText style={[styles.cardTitle, { color: themeColors.text }]}>Hourly Forecast</ThemedText>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                { time: 'Now', temp: '28°C', icon: '☀️' },
                { time: '5 PM', temp: '27°C', icon: '☀️' },
                { time: '6 PM', temp: '26°C', icon: '🌤️' },
                { time: '7 PM', temp: '25°C', icon: '☁️' },
                { time: '8 PM', temp: '24°C', icon: '☁️' },
                { time: '9 PM', temp: '23°C', icon: '🌙' },
              ].map((item, index) => (
                <ThemedView key={index} style={styles.hourlyItem}>
                  <ThemedText style={[styles.hourlyTime, { color: themeColors.subtext }]}>{item.time}</ThemedText>
                  <ThemedText style={styles.hourlyIcon}>{item.icon}</ThemedText>
                  <ThemedText style={[styles.hourlyTemp, { color: themeColors.text }]}>{item.temp}</ThemedText>
                </ThemedView>
              ))}
            </ScrollView>
          </ThemedView>

          <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]}>
            <ThemedView style={styles.metricsGrid}>
              <ThemedView style={styles.metricItem}><ThemedText>💨 **Wind Speed**</ThemedText><ThemedText>**15 km/h**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>💧 **Humidity**</ThemedText><ThemedText>**75%**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>🧴 **UV Index**</ThemedText><ThemedText>**8 (High)**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>☔ **Precipitation**</ThemedText><ThemedText>**0% chance**</ThemedText></ThemedView>
            </ThemedView>
          </ThemedView>
          <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]}>
            <ThemedView style={styles.metricsGrid}>
              <ThemedView style={styles.metricItem}><ThemedText>💨 **Wind Speed**</ThemedText><ThemedText>**15 km/h**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>💧 **Humidity**</ThemedText><ThemedText>**75%**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>🧴 **UV Index**</ThemedText><ThemedText>**8 (High)**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>☔ **Precipitation**</ThemedText><ThemedText>**0% chance**</ThemedText></ThemedView>
            </ThemedView>
          </ThemedView>
          <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]}>
            <ThemedView style={styles.metricsGrid}>
              <ThemedView style={styles.metricItem}><ThemedText>💨 **Wind Speed**</ThemedText><ThemedText>**15 km/h**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>💧 **Humidity**</ThemedText><ThemedText>**75%**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>🧴 **UV Index**</ThemedText><ThemedText>**8 (High)**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>☔ **Precipitation**</ThemedText><ThemedText>**0% chance**</ThemedText></ThemedView>
            </ThemedView>
          </ThemedView>
          <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]}>
            <ThemedView style={styles.metricsGrid}>
              <ThemedView style={styles.metricItem}><ThemedText>💨 **Wind Speed**</ThemedText><ThemedText>**15 km/h**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>💧 **Humidity**</ThemedText><ThemedText>**75%**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>🧴 **UV Index**</ThemedText><ThemedText>**8 (High)**</ThemedText></ThemedView>
              <ThemedView style={styles.metricItem}><ThemedText>☔ **Precipitation**</ThemedText><ThemedText>**0% chance**</ThemedText></ThemedView>
            </ThemedView>
          </ThemedView>

        </ScrollView>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    backgroundColor: 'transparent',
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchIcon: {
    // The icon itself is styled within the ThemedText in the component
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 44,
  },
  searchIconInInput: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  cancelSearchIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  heroTemp: {
    fontSize: 90,
    fontWeight: '300',
    lineHeight: 100,
  },
  heroDescription: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -10,
  },
  heroDetails: {
    fontSize: 16,
    marginTop: 5,
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
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hourlyItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  hourlyTime: {
    fontSize: 14,
  },
  hourlyIcon: {
    fontSize: 24,
    marginVertical: 5,
  },
  hourlyTemp: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    paddingVertical: 10,
    marginBottom: 5,
  }
});
