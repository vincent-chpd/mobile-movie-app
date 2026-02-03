import { useAuth } from '@/context/AuthContext';
import { signInWithGoogle, signOut } from '@/services/auth';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const { user, setUser } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    router.replace('/auth/sign-in');
  };

  if (!user) {
    return (
      <View className="flex flex-1 bg-primary justify-center items-center">
        <TouchableOpacity onPress={() => signInWithGoogle()}>
          <Text className="text-white font-bold">Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex flex-1 bg-primary">
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
