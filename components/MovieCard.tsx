import { icons } from '@/constants/icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const [isSaved, setIsSaved] = useState(false);

  const checkIfSaved = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem('savedMovies');
      const savedArray = saved ? JSON.parse(saved) : [];
      setIsSaved(savedArray.includes(id));
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      checkIfSaved();
    }, [checkIfSaved]),
  );

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm text-white font-bold mt-1" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-between gap-x-1 mt-1">
          <View className="flex-row gap-x-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs text-white font-bold uppercase">
              {Math.round(vote_average / 2)}
            </Text>
          </View>

          <MaterialIcons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={16}
            color="#ab8bff"
          />
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-xs text-white text-light-300 font-medium">
            {release_date.split('-')[0]}
          </Text>
          <Text className="text-xs text-accentText uppercase">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
