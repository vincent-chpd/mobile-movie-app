import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMoviesDetails } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedMovies = useCallback(async () => {
    try {
      setLoading(true);
      const saved = await AsyncStorage.getItem('savedMovies');
      const savedIds = saved ? JSON.parse(saved) : [];

      // Fetch details for each saved movie
      const moviesPromises = savedIds.map((id: number) =>
        fetchMoviesDetails(id.toString()),
      );
      const movies = await Promise.all(moviesPromises);

      setSavedMovies(movies);
    } catch (error) {
      console.error('Error loading saved movies:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSavedMovies();
    }, [loadSavedMovies]),
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={savedMovies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <View className="w-full flex-row mt-20 justify-center items-center mb-5">
            <Image source={icons.logo} className="w-12 h-10" />
            <Text className="text-white text-xl font-bold ml-3">
              Saved Movies
            </Text>
          </View>
        }
        ListEmptyComponent={
          !loading ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500 text-lg">
                No saved movies yet
              </Text>
              <Text className="text-center text-gray-400 text-sm mt-2">
                Browse movies and tap the bookmark icon to save them
              </Text>
            </View>
          ) : null
        }
      />

      {loading && (
        <View className="absolute inset-0 justify-center items-center">
          <ActivityIndicator size="large" color="#ab8bff" />
        </View>
      )}
    </View>
  );
};

export default Saved;
