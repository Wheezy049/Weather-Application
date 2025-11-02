import { Colors } from "@/constants/theme";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    useColorScheme,
    View
} from "react-native";

interface ForecastFilterProps {
  selectedDays: number;
  setSelectedDays: (days: number) => void;
}

const ForecastFilter = ({ selectedDays, setSelectedDays }: ForecastFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [3, 5, 7];
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const dropdownAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    Animated.timing(dropdownAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleSelect = (days: number) => {
    setSelectedDays(days);
    setIsOpen(false);
  };

  const translateY = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const opacity = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Text style={[styles.selectedText, { color: theme.text }]}>
            {selectedDays}-Day Forecast
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isOpen} transparent animationType="none">
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={[
                styles.dropdownContainer,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.subtext,
                  opacity,
                  transform: [{ translateY }],
                },
              ]}
            >
              {options.map((days) => (
                <TouchableOpacity
                  key={days}
                  onPress={() => handleSelect(days)}
                  style={styles.option}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          selectedDays === days ? theme.activeText : theme.text,
                      },
                    ]}
                  >
                    {days}-Day Forecast
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  selectedText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  dropdownContainer: {
    position: "absolute",
    top: 100, // Adjust this value to position the dropdown correctly below the header
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  option: {
    paddingVertical: 6,
    alignItems: "center",
  },
  optionText: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default ForecastFilter;
