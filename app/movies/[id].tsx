import { icons } from '@/constants/icons';
import { fetchMoviesDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-ol items-start justify-center mt-5">
    <Text className="text-accentText font-normal text-sm">{label}</Text>
    <Text className="text-accentText font-bold text-sm mt-2">
      {value || 'N/A'}
    </Text>
  </View>
);

const MovieDetails = () => {
  const [isSaved, setIsSaved] = useState(false);

  const { id } = useLocalSearchParams();

  const { data: movie } = useFetch(() => fetchMoviesDetails(id as string));

  useEffect(() => {
    checkIfSaved();
  }, []);

  const checkIfSaved = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedMovies');
      const savedArray = saved ? JSON.parse(saved) : [];
      setIsSaved(savedArray.includes(Number(id))); // Convert to number
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const toggleSave = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedMovies');
      const savedArray = saved ? JSON.parse(saved) : [];
      const movieId = Number(id); // Convert to number

      if (savedArray.includes(movieId)) {
        // Remove from saved
        const updated = savedArray.filter(
          (savedId: number) => savedId !== movieId,
        );
        await AsyncStorage.setItem('savedMovies', JSON.stringify(updated));
        setIsSaved(false);
      } else {
        // Add to saved
        savedArray.push(movieId);
        await AsyncStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <View className="flex-row justify-between items-start w-full">
            <Text className="text-white font-bold text-xl max-w-[90%]">
              {movie?.title}
            </Text>
            <TouchableOpacity
              onPress={(e) => {
                e.preventDefault();
                toggleSave();
              }}
            >
              <MaterialIcons
                name={isSaved ? 'bookmark' : 'bookmark-outline'}
                size={32}
                color="#ab8bff"
              />
            </TouchableOpacity>
          </View>
          <View className=" flex-row items-center gap-x-1 mt-2">
            <Text className="text-accentText text-sm">
              {movie?.release_date.split('-')[0]}
            </Text>
            <Text className="text-accentText text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-ratingBox px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)} / 10
            </Text>
            <Text className="text-accentText text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((genre) => genre.name).join('-') || 'N/A'}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`£${movie && movie.budget / 1_000_000} million` || 'N/A'}
            />
            <MovieInfo
              label="Revenue"
              value={
                `£${movie && Math.round(movie.revenue / 1_000_000)} million` ||
                'N/A'
              }
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                .map((company) => company.name)
                .join('-') || 'N/A'
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={router.back}
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
