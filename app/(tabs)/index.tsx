import { ActivityIndicator, Button, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from 'react-native';

import Spacer from '@/components/spacer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feels_like: number;
  coordinates: {
    lat: number;
    lon: number;
  };
  humidity: number;
  wind_speed: number;
  description: string;
  // icon is not in your response, so we'll handle it
  icon?: string;
}

interface ForecastData {
  date: string;
  temperature: number;
  feels_like: number;
  description: string;
  humidity: number;
  wind_speed: number;
  icon?: string; // Add icon if your API provides it
}

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async ({ city }: { city: string }) => {

    const CURRENT_WEATHER_API_URL = 'https://weather-api-7pzt.onrender.com/api/weather/current';
    // --- IMPORTANT ---
    const FORECAST_API_URL = 'https://weather-api-7pzt.onrender.com/api/weather/forecast';
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${CURRENT_WEATHER_API_URL}/${city}`);
      
      // Get the raw text of the response first to avoid JSON parsing errors
      const textResponse = await response.text();

      if (!response.ok) {
        // If the response is not OK, try to parse the text as JSON for an error message,
        // but fall back to the raw text if that fails.
        try {
          const errorData = JSON.parse(textResponse);
          throw new Error(errorData.message || 'Weather data not found.');
        } catch (e) {
          // This will log the HTML error page content to your terminal
          console.error("Non-JSON error response from server:", textResponse);
          throw new Error('An error occurred while fetching weather data.');
        }
      }

      const data: WeatherData = JSON.parse(textResponse);
      console.log('weather data', data);
      setWeatherData(data);

      // Now, fetch the hourly forecast data
      const forecastResponse = await fetch(`${FORECAST_API_URL}/${city}`);
      if (!forecastResponse.ok) {
        console.error("Could not fetch forecast data.");
        setHourlyForecast([]); // Clear old forecast on error
      } else {
        const forecastResult = await forecastResponse.json();
        // Assuming the array is nested under a 'forecast' key
        setHourlyForecast(forecastResult.forecast || []);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect for initial load: get location and fetch weather
  useEffect(() => {
    (async () => {
      // First, check the existing permissions
      let { status: existingStatus } = await Location.getForegroundPermissionsAsync();
      let finalStatus = existingStatus;

      // If permissions are not determined, ask the user
      if (existingStatus !== 'granted') {
        let { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      // If permission is granted, get the location
      if (finalStatus === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        let address = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (address.length > 0 && address[0].city) {
          setCity(address[0].city);
        } else {
          setError("Could not determine city from your location. Please search.");
          setCity('Lagos'); // Set city state instead of calling fetchWeatherData directly
        }
      } else {
        // If permission is denied, set an error and fetch a default location
        setError('Permission to access location was denied. Please enable it in settings or search for a city.');
        setCity('Lagos'); // Set city state instead of calling fetchWeatherData directly
      }
    })();
  }, []);

  // Effect for handling search: fetch weather when city changes
  useEffect(() => {
    if (city) {
      fetchWeatherData({ city });
    }
  }, [city]);

  // A simple mapping from OpenWeatherMap icon codes to emojis
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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCity(searchQuery.trim());
      setIsSearchActive(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    }).replace(' ', '');
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient
        colors={[themeColors.ambientBackgroundStart, themeColors.ambientBackgroundEnd]}
        style={styles.fullScreenBackground}
      >

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
            <ThemedText style={[styles.locationText, { color: themeColors.text }]}>
              {weatherData ? `${weatherData.location}, ${weatherData.country}` : 'Loading...'} 📍
            </ThemedText>
            <TouchableOpacity onPress={() => setIsSearchActive(true)}>
              <ThemedText style={{ color: themeColors.text, fontSize: 24 }}>🔍</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>

          {loading ? (
            <ActivityIndicator size="large" color={themeColors.text} style={{ marginTop: 50 }} />
          ) : error ? (
            <ThemedView style={styles.errorContainer}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
              {error.includes('denied') && (
                <>
                  <Spacer height={20} />
                  <Button title="Open Settings" onPress={() => Linking.openSettings()} />
                </>
              )}
            </ThemedView>
          ) : weatherData && (
            <>
              <Spacer height={30} />

              <ThemedView style={styles.heroContainer}>
                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'transparent' }}>
                  <ThemedText style={[styles.heroTemp, { color: themeColors.text }]}>
                    {weatherIcons[weatherData.icon || ''] || '🌦️'}
                  </ThemedText>
                  <ThemedText style={[styles.heroTemp, { color: themeColors.text }]}>
                    {Math.round(weatherData.temperature)}°C
                  </ThemedText>
                </ThemedView>

                <Spacer height={20} />

                <ThemedText style={[styles.heroDescription, { color: themeColors.text }]}>{weatherData.description}</ThemedText>
                <ThemedText style={[styles.heroDetails, { color: themeColors.subtext, fontWeight: 'semibold' }]}>
                  Feels like {Math.round(weatherData.feels_like)}°C
                </ThemedText>

                <Spacer />

              </ThemedView>

          <ThemedView style={[styles.card, { backgroundColor: themeColors.background }]}>
            <ThemedText style={[styles.cardTitle, { color: themeColors.text }]}>Hourly Forecast</ThemedText>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {hourlyForecast.map((item, index) => (
                <ThemedView key={index} style={styles.hourlyItem}>
                  <ThemedText style={[styles.hourlyTime, { color: themeColors.subtext, fontWeight: 'semibold' }]}>{formatTime(item.date)}</ThemedText>
                  <ThemedText style={styles.hourlyIcon}>{weatherIcons[item.icon || ''] || '❓'}</ThemedText>
                  <ThemedText style={[styles.hourlyTemp, { color: themeColors.text }]}>{Math.round(item.temperature)}°C</ThemedText>
                </ThemedView>
              ))}
            </ScrollView>
          </ThemedView>

            <ThemedView style={styles.metricsGrid}>
              <ThemedView style={[styles.metricCard, { backgroundColor: themeColors.background }]}>
                <ThemedView style={styles.metricItem}>
                  <ThemedText style={{ fontWeight: 'semibold' }}>💨</ThemedText>
                  <ThemedView style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <ThemedText style={{ fontWeight: 'semibold' }}>Wind Speed</ThemedText>
                    <ThemedText style={{ fontWeight: 'bold' }}>
                      {/* Assuming wind_speed is m/s, convert to km/h */}
                      {Math.round(weatherData.wind_speed * 3.6)} km/h
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
              <ThemedView style={[styles.metricCard, { backgroundColor: themeColors.background }]}>
                <ThemedView style={styles.metricItem}>
                  <ThemedText style={{ fontWeight: 'semibold' }}>💧</ThemedText>
                  <ThemedView style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <ThemedText style={{ fontWeight: 'semibold' }}>Humidity</ThemedText>
                    <ThemedText style={{ fontWeight: 'bold' }}>{weatherData.humidity}%</ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
              <ThemedView style={[styles.metricCard, { backgroundColor: themeColors.background, justifyContent: 'center' }]}>
                <ThemedView style={styles.metricItem}>
                  <ThemedText style={{ fontWeight: 'semibold' }}>📍</ThemedText>
                  <ThemedView style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <ThemedText style={{ fontWeight: 'semibold' }}>Coordinates</ThemedText>
                    <ThemedText style={{ fontWeight: 'bold' }}>{weatherData.coordinates.lat.toFixed(2)}, {weatherData.coordinates.lon.toFixed(2)}</ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            </>
          )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
    backgroundColor: 'transparent',
  },
  errorText: {
    textAlign: 'center', color: 'red', fontSize: 16
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  heroTemp: {
    fontSize: 100,
    fontWeight: 'bold',
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
    backgroundColor: 'transparent',
    gap: 15,
  },
  metricCard: {
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    minWidth: '45%',
  },
  metricItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%',
  }
});
