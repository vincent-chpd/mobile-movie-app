import { icons } from '@/constants/icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { Image, TextInput, View } from 'react-native';

interface SearchBarProps {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
}

const SearchBar = ({
  onPress,
  placeholder,
  value,
  autoFocus = false,
  onChangeText,
}: SearchBarProps) => {
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      if (autoFocus) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
      return () => {
        inputRef.current?.blur();
      };
    }, [autoFocus]),
  );

  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        ref={inputRef}
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-3 text-white h-8"
      />
    </View>
  );
};

export default SearchBar;
