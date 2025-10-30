/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Ambient colors derived from the sunny, soft gradient background in the design
const AMBIENT_START_COLOR = '#E0F0FF'; // Light Sky Blue (Top)
const AMBIENT_END_COLOR = '#FFF8F0';   // Very Light Peach/Beige (Bottom)

// Primary accent color (used for active tabs, selected icons, and key data highlights)
const WEATHER_ACCENT_BLUE = '#0A7EA4'; 

export const Colors = {
  light: {
    // TEXT COLORS
    text: '#11181C', // Very dark gray/black for high contrast (used on large temperatures, titles)
    subtext: '#687076', // Lighter gray for secondary information (e.g., "Feels like", descriptions)
    
    // BACKGROUND COLORS
    background: '#FFFFFF', // Pure White for the *Cards* (Hourly, Detailed Metrics)
    ambientBackgroundStart: AMBIENT_START_COLOR, // For the screen background gradient start
    ambientBackgroundEnd: AMBIENT_END_COLOR,   // For the screen background gradient end
    
    // ACCENT / TINT COLORS
    tint: WEATHER_ACCENT_BLUE, // Used for the active bottom tab line and location dot
    icon: '#11181C', // Dark icons for metrics (Wind, Humidity)
    tabIconDefault: '#687076', // Grayed-out for inactive bottom tab icons
    tabIconSelected: WEATHER_ACCENT_BLUE, // Blue for the active tab icon
    
    // Other Specific Colors
    highTemp: '#D90000',
    lowTemp: '#0066CC', 
  },
    dark: {
    text: '#ECEDEE',
    subtext: '#9BA1A6',
    background: '#151718', // Dark card background
    ambientBackgroundStart: '#0D1B2A', // Deep Navy Blue
    ambientBackgroundEnd: '#1B263B',   // Dark Slate Blue
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    highTemp: '#FF8A80', // Lighter red for dark mode
    lowTemp: '#82B1FF',  // Lighter blue for dark mode
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
