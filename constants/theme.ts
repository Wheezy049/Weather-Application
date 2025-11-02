/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const AMBIENT_START_COLOR = '#E0F0FF';
const AMBIENT_END_COLOR = '#FFF8F0';

const WEATHER_ACCENT_BLUE = '#0A7EA4';

export const Colors = {
  light: {
    text: '#11181C',
    subtext: '#687076',
    activeText: '#000000',

    background: '#FFFFFF',
    ambientBackgroundStart: AMBIENT_START_COLOR,
    ambientBackgroundEnd: AMBIENT_END_COLOR,
    tint: WEATHER_ACCENT_BLUE,
    icon: '#11181C',
    tabIconDefault: '#687076',
    tabIconSelected: WEATHER_ACCENT_BLUE,
    highTemp: '#D90000',
    lowTemp: '#0066CC',
  },
  dark: {
    text: '#ECEDEE',
    activeText: '#FFFFFF',
    subtext: '#9BA1A6',
    background: '#151718',
    ambientBackgroundStart: '#0D1B2A',
    ambientBackgroundEnd: '#1B263B',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    highTemp: '#FF8A80',
    lowTemp: '#82B1FF',
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
