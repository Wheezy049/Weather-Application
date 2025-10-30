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
     <ThemedView style={{ flex: 1}}>
      <LinearGradient colors={[themeColors.ambientBackgroundStart, themeColors.ambientBackgroundEnd]} style={{ flex: 1}}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
              
             <Spacer />

             <ThemedView style={styles.headerBarText}>
                <ThemedText style={{color: themeColors.text, fontSize: 24, fontWeight: 'bold'}}>7-Day Forecast</ThemedText>
             </ThemedView>

          </ScrollView>
      </LinearGradient>
     </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80
  },
  headerBarText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: 'transparent',
  }
});
