import Spacer from '@/components/spacer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface DailyForecast {
  date: string;
  dayOfWeek: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
  icon: string;
}

export default function ForecastScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const [city, setCity] = useState<string | null>(null);
  const [forecastData, setForecastData] = useState<DailyForecast[]>([]);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const weatherIcons: { [key: string]: string } = {
    '01d': '☀️', '01n': '🌙',
    '02d': '🌤️', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };

  // Effect for initial load: get location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied. Showing default forecast for Lagos.');
        setCity('Lagos');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      let address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address.length > 0 && address[0].city) {
        setCity(address[0].city);
      } else {
        setError("Could not determine city. Showing default forecast for Lagos.");
        setCity('Lagos');
      }
    })();
  }, []);

  useEffect(() => {
    if (city) {
      fetchForecastData(city);
    }
  }, [city]);

  const fetchForecastData = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const FORECAST_API_URL = `https://weather-api-7pzt.onrender.com/api/weather/forecast/${city}`;
      const response = await fetch(FORECAST_API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch forecast data.');
      }
      const data = await response.json();
      processForecastData(data.forecast);
    } catch (e: any) {
      setError(e.message);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  const processForecastData = (hourlyData: any[]) => {
    if (!hourlyData || hourlyData.length === 0) {
      setForecastData([]);
      return;
    }

    const dailyData: { [key: string]: any } = {};

    hourlyData.forEach(item => {
      const date = item.date.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = { temps: [], items: [] };
      }
      dailyData[date].temps.push(item.temperature);
      dailyData[date].items.push(item);
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const processed = Object.keys(dailyData).map(date => {
      const dayItems = dailyData[date].items;
      const dayTemps = dailyData[date].temps;

      // Find item around midday for representative condition/icon
      const middayItem = dayItems.find((i: any) => i.date.includes('12:00:00')) || dayItems[Math.floor(dayItems.length / 2)];

      const forecastDate = new Date(date);
      forecastDate.setHours(0, 0, 0, 0);

      let dayOfWeek = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
      if (forecastDate.getTime() === today.getTime()) {
        dayOfWeek = 'Today';
      }

      return {
        date: date,
        dayOfWeek: dayOfWeek,
        highTemp: Math.round(Math.max(...dayTemps)),
        lowTemp: Math.round(Math.min(...dayTemps)),
        condition: middayItem.description,
        icon: middayItem.icon || '01d',
      };
    });

    setNumberOfDays(processed.length);
    setForecastData(processed);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCity(searchQuery.trim());
      setIsSearchActive(false);
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient colors={[themeColors.ambientBackgroundStart, themeColors.ambientBackgroundEnd]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <Spacer height={20} />

          {isSearchActive ? (
            <ThemedView style={styles.headerBar}>
              <ThemedView style={[styles.searchInputContainer, { backgroundColor: themeColors.background }]}>
                <ThemedText style={styles.searchIconInInput}>🔍</ThemedText>
                <TextInput
                  placeholder="Search for a city"
                  placeholderTextColor={themeColors.subtext}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={[styles.searchInput, { color: themeColors.text }]}
                  autoFocus
                  onSubmitEditing={handleSearch}
                  returnKeyType="search"
                />
                <TouchableOpacity onPress={() => setIsSearchActive(false)}>
                  <ThemedText style={[styles.cancelSearchIcon, { color: themeColors.text }]}>✕</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          ) : (
            <ThemedView style={styles.headerBar}>
              <ThemedText style={[styles.locationText, { color: themeColors.text }]}>{city || 'Loading...'} 📍</ThemedText>
              <TouchableOpacity onPress={() => setIsSearchActive(true)}>
                <ThemedText style={{ color: themeColors.text, fontSize: 24 }}>🔍</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}

          <Spacer height={20} />

          <ThemedView style={styles.titleContainer}>
            <ThemedText style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text }}>
              {numberOfDays > 0 ? `${numberOfDays}-Day Forecast` : 'Forecast'}
            </ThemedText>
          </ThemedView>

          <Spacer />

          {loading ? (
            <ActivityIndicator size="large" color={themeColors.text} style={{ marginTop: 50 }} />
          ) : error ? (
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          ) : (
            <FlatList
              data={forecastData}
              scrollEnabled={false}
              keyExtractor={(item) => item.date}
              renderItem={({ item }) => (
                <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]}>
                  <ThemedView style={styles.cardItem}>
                    <ThemedView style={[styles.cardItem, { gap: 8 }]}>
                      <ThemedText style={{ fontWeight: 'semibold', fontSize: 20, width: 110 }}>{item.dayOfWeek}</ThemedText>
                      <ThemedText style={{ fontWeight: 'semibold', fontSize: 20 }}>{weatherIcons[item.icon] || '❓'}</ThemedText>
                    </ThemedView>
                    <ThemedText style={{ fontWeight: 'semibold', fontSize: 20 }}>{item.highTemp}°C / {item.lowTemp}°C</ThemedText>
                  </ThemedView>
                </ThemedView>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              style={styles.cardGrid}
            />
          )}

          <Spacer height={20} />

          {/* <ThemedView style={styles.card}>
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
          </ThemedView> */}
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
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    backgroundColor: 'transparent',
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
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
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  card: {
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,

  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardGrid: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
});
