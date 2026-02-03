import { useAuth } from '@/context/AuthContext';
import { signIn } from '@/services/auth';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      const user = await getCurrentUser();
      setUser(user);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primary px-5 justify-center">
      <Text className="text-white text-3xl font-bold mb-8 text-center">
        Sign In
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#a8b5db"
        className="bg-dark-200 text-white px-5 py-4 rounded-lg mb-4"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#a8b5db"
        className="bg-dark-200 text-white px-5 py-4 rounded-lg mb-6"
      />

      <TouchableOpacity
        onPress={handleSignIn}
        disabled={loading}
        className="bg-accent py-4 rounded-lg mb-4"
      >
        <Text className="text-white text-center font-bold text-lg">
          {loading ? 'Signing In...' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
        <Text className="text-gray-400 text-center">
          Don't have an account? <Text className="text-accent">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
